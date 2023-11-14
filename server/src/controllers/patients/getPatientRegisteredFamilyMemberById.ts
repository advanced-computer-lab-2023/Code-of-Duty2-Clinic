import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import { Response } from 'express';
import Patient from '../../models/patients/Patient';

export const getPatientRegisteredFamilyMemberById = async (req: AuthorizedRequest, res: Response) => {
    const patientId = req.user?.id;
    const familyMemberId = req.params.familyMemberId;
    try {
        const patient = await Patient.findById(patientId).populate('registeredFamilyMembers');
        const registeredFamilyMembers = patient!.registeredFamilyMembers;

        if (!registeredFamilyMembers) {
            return res.status(StatusCodes.NOT_MODIFIED).send('This family member is not registered with the patient yet');
        }

        const familyMember = registeredFamilyMembers.find((familyMember) => familyMember.id.toString() === familyMemberId);
        if (!familyMember) {
            return res.status(StatusCodes.NOT_FOUND).send('Family member not found');
        }
        return res.status(StatusCodes.OK).send(familyMember);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};
