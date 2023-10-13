import DoctorRegistrationRequest, { IDoctorRegistrationRequestModel } from '../../models/doctors/DoctorRegistrationRequest';
const bcrypt = require('bcrypt');
const express = require('express');
import { Request, Response } from 'express';
import { Mongoose } from 'mongoose';

const registerAsDoctor = async (req: Request, res: Response) => {
    const {username, password, email, name, gender, mobileNumber, dateOfBirth, hourlyRate, affiliation, educationalBackground} = req.body;
    try{
        
        // Check if the email & username already mwgoodeen
        const existingDoctorRequestByEmail = await DoctorRegistrationRequest.findOne({ email });
        const existingDoctorRequestByUsername = await DoctorRegistrationRequest.findOne({ username });
        // console.log(existingDoctorRequestByEmail, existingDoctorRequestByUsername);
        
        if (existingDoctorRequestByEmail) {
            return res.status(400).send('Email already exists. Please use a different email.');
        }
        
        if (existingDoctorRequestByUsername) {
            return res.status(400).send('Username already exists. Please choose a different username.');
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate the password against the regex
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).send('Password must be strong (min 8 characters, uppercase, lowercase, number, special character).');
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

        res.status(201).send('Doctor Registration Request Sent Successfully!' );


    }catch(err){
        console.log(err);
        
        res.status(500).send('An error occurred during registration');
    }


}

// module.exports = {registerAsDoctor};
export {registerAsDoctor};