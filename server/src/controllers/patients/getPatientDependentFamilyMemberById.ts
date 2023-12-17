import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { Response } from 'express';
import Patient from '../../models/patients/Patient';

export const getPatientDependentFamilyMemberById = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id;
    const familyMemberId = req.params.id;
    try {
        const patient = await Patient.findById(patientId).populate('dependentFamilyMembers');
        const dependentFamilyMembers = patient!.dependentFamilyMembers;

        if (!dependentFamilyMembers) {
            return res.status(StatusCodes.NOT_MODIFIED).send('This family member is not dependent on the requesting patient');
        }

        const dependentFamilyMember = dependentFamilyMembers.find((dependentFamilyMember) => dependentFamilyMember.nationalId === familyMemberId);
        if (!dependentFamilyMember) {
            return res.status(StatusCodes.NOT_FOUND).send('FDependent amily member not found');
        }
        return res.status(StatusCodes.OK).send(dependentFamilyMember);
    } catch (error: any) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
};
