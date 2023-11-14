import express, { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import { StatusCodes } from 'http-status-codes';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';


const searchPatient = async (req: AuthorizedRequest , res: Response) => {
    const name = req.query.name;
    const mobile = req.query.mobile;
    const email = req.query.email;

   const query: any = {};
    if(name) {
         query.name = name;
    }
    if(mobile) {
         query.mobileNumber = mobile;
    }
    if(email) {
         query.email = email;
    }

    if (name || mobile || email) {
        try {
            const patient = await Patient.find(query);
            if (patient) {
                return res.status(StatusCodes.OK).json({patient});
            }
            return res.status(StatusCodes.NOT_FOUND).json({message: 'No patient with the entered details was found'});
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
        }
    }

    return res.status(StatusCodes.BAD_REQUEST).send('Invalid query parameters');

}

export {searchPatient};
