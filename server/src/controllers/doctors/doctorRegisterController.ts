import DoctorRegistrationRequest from '../../models/doctors/DoctorRegistrationRequest';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const registerAsDoctor = async (req: Request, res: Response) => {
    const {username, password, email, name, gender, mobileNumber, dateOfBirth, hourlyRate, affiliation, educationalBackground} = req.body;
    try{
        
        const existingDoctorRequestByEmail = await DoctorRegistrationRequest.findOne({ email });
        const existingDoctorRequestByUsername = await DoctorRegistrationRequest.findOne({ username });
        
        if (existingDoctorRequestByEmail) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: 'Email already exists. Please use a different email.'});
        }
        
        if (existingDoctorRequestByUsername) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: 'Username already exists. Please choose a different username.'});
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate the password against the regex
        if (!strongPasswordRegex.test(password)) {
            return res.status(StatusCodes.BAD_REQUEST).send({message: 'Password must be strong (min 8 characters, uppercase, lowercase, number, special character).'});
        }

        const saltRounds = 10; // Complexity of a single bycrypt hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newDoctorRegistrationRequest = new DoctorRegistrationRequest({
            username: username,
            password: hashedPassword,
            email: email,
            name: name,
            gender: gender,
            mobileNumber: mobileNumber,
            dateOfBirth: dateOfBirth,
            hourlyRate: hourlyRate,
            affiliation: affiliation,
            educationalBackground: educationalBackground,
        });
        
        await newDoctorRegistrationRequest.save();

        res.status(StatusCodes.CREATED).send('Doctor Registration Request Sent Successfully!' );
    } catch(err){
        console.log(err);
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred during registration');
    }
}

export {registerAsDoctor};