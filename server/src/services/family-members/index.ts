import Patient, { IPatientModel } from "../../models/patients/Patient";
import { IDependentFamilyMember } from "../../models/patients/interfaces/IDependentFamilyMember";
import { IPatient } from "../../models/patients/interfaces/IPatient";
import { entityIdDoesNotExistError } from "../../utils/ErrorMessages";

export const addNewFamilyMember = async (patientId: string, dependentFamilyMember: IDependentFamilyMember) => {
    let patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error(entityIdDoesNotExistError('patient', patientId));
    }
  
    if (!patient.dependentFamilyMembers) {
      patient.dependentFamilyMembers = [];
    }

    if(familyMemberNationalIdAlreadyExists(patient, dependentFamilyMember)) {
        throw new Error('nationalId already exists');
    }

    await addNewDependentFamilyMember(patient, dependentFamilyMember);

    return patient.dependentFamilyMembers;
}

async function addNewDependentFamilyMember(patient: IPatientModel, dependentFamilyMember: IDependentFamilyMember) {
    patient.dependentFamilyMembers?.push(dependentFamilyMember);
    await patient.save();  
}

function familyMemberNationalIdAlreadyExists(patient: IPatient, dependentFamilyMember: IDependentFamilyMember) {
    return patient.dependentFamilyMembers?.some(familyMember => familyMember.nationalId === dependentFamilyMember.nationalId);
}
