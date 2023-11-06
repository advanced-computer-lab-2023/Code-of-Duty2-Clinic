import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNewDoctorRegistrationRequest } from '../../services/doctors/registration_requests';

const registerAsDoctor = async (req: Request, res: Response) => {
    try {
        await createNewDoctorRegistrationRequest(req.body);
        res.status(StatusCodes.CREATED).send('Doctor Registration Request Sent Successfully!' );
    } catch(err: any){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
}

export {registerAsDoctor};