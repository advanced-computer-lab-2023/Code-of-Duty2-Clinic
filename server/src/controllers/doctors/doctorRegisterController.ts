import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addDoctorRegistrationFiles, createNewDoctorRegistrationRequest, getDoctorRegistrationContract, rejectSentContract } from '../../services/doctors/registration_requests';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

const registerAsDoctor = async (req: Request, res: Response) => {
    try {
        await createNewDoctorRegistrationRequest(req.body);
        res.status(StatusCodes.CREATED).send('Doctor Registration Request Sent Successfully!' );
    } catch(err: any){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send({message: err.message});
    }
}


const addDoctorRegistrationRequestFiles = async (req: AuthorizedRequest, res: Response) => {
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});
    try {
        await addDoctorRegistrationFiles(req.user?.id!,req.body);
        res.status(StatusCodes.CREATED).send('Doctor Registration Request Files Sent Successfully!' );
    } catch(err: any){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send({message: err.message});
    }
}

const getDoctorContract = async (req: AuthorizedRequest, res: Response) => {
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});
    try {
        const doctorId = req.user?.id
      
        const contract = await getDoctorRegistrationContract(doctorId!);
       
        res.status(StatusCodes.CREATED).send(contract);
    } catch(err: any){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send({message: err.message});
    }
}

const rejectOffer = async (req: AuthorizedRequest, res: Response) => {
    if(!req.user?.id) return res.status(StatusCodes.BAD_REQUEST).json({message: 'doctorId is required'});
    try {
        const doctorId = req.user?.id
        
        const contract = await rejectSentContract(doctorId!);
       
        res.status(StatusCodes.CREATED).send("rejected successfully");
    } catch(err: any){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send({message: err.message});
    }
}
export {registerAsDoctor, addDoctorRegistrationRequestFiles,getDoctorContract,rejectOffer};