import Prescription from "../../models/prescriptions/Prescription";

export const getPrescriptionsByPatientId = async (patientId: string) => {
    try {
        const prescriptions = await Prescription.find({ patientId });
        return prescriptions;
    } catch (error) {
        console.error(error);
        throw error;
    }
};