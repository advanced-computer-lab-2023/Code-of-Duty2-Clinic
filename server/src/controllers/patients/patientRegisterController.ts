import Patient, { IPatientModel } from '../../models/patients/Patient';
const bcrypt = require('bcrypt');
const express = require('express');
import { Request, Response } from 'express';
import { Mongoose } from 'mongoose';

const registerAsPatient = async (req: Request, res: Response) => {

    const {username, password, email, name, dateOfBirth, gender, mobileNumber, emergencyContact, deliveryAddresses, healthRecords, subscribedPackage, dependentFamilyMembers, registeredFamilyMembers} = req.body;
    try{
        console.log("Inside registerAsPatient");
        
        // Check if the email & username already mwgoodeen
        const existingPatientByEmail = await Patient.findOne({ email });
        const existingPatientByUsername = await Patient.findOne({ username });

        if (existingPatientByEmail) {
            console.log('probhere');
            
            return res.status(400).send('Email already exists. Please use a different email.');
        }
        if (existingPatientByUsername) {
            console.log('probhere not');
            return res.status(400).send('Username already exists. Please choose a different username.');
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate the password against the regex
        if (!strongPasswordRegex.test(password)) {
            console.log('probhere not 2');
            return res.status(400).send('Password must be strong (min 8 characters, uppercase, lowercase, number, special character).');
        }

        const saltRounds = 10; // Complexity of a single bycrypt hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // const newPatient = new patient({username, hashedPassword, email, name, dateOfBirth, gender, mobileNumber, emergencyContact});

        const newPatient = new Patient({

            username: username,
            password: hashedPassword,
            email: email,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            mobileNumber: mobileNumber,
            emergencyContact: emergencyContact,
            deliveryAddresses: deliveryAddresses,
            healthRecords: healthRecords,
            subscribedPackage: subscribedPackage,
            dependentFamilyMembers: dependentFamilyMembers,
            registeredFamilyMembers: registeredFamilyMembers
        });
        await newPatient.save();
        res.status(201).send('Patient registered successfully! Welcome Aboard!' );

    }catch(err){
        console.log(err);
        console.log('probhere not 3');
        res.status(500).send('An error occurred during registration');
    }


};


export {registerAsPatient};
