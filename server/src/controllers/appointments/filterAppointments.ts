import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppointmentsFilterQuery } from './interfaces/AppointmentsFilterQuery';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../../models/appointments/Appointment';

export const filterAppointments = async (req: Request, res: Response) => {
    try {
      const { patientId, doctorId, date , status } = req.query;
      console.log(patientId);
      const filter: any = {};
      let fieldsNotProvided = []
      if (patientId && !doctorId) {
        filter.patientId = new mongoose.Types.ObjectId(patientId as string);
      }
      else if(!doctorId){
        fieldsNotProvided.push("patientId");
      }
      else{
        fieldsNotProvided.push("doctorId")
        fieldsNotProvided.push("patientId");

      }
      if (!patientId && doctorId) {
        filter.doctorId = new mongoose.Types.ObjectId(doctorId as string);
      }
      else if(!patientId){
        fieldsNotProvided.push("doctorId");
      }
      else{
        fieldsNotProvided.push("patientId")
        fieldsNotProvided.push("doctorId");
      }
      if(fieldsNotProvided.length ===2){
        res.status(StatusCodes.BAD_REQUEST).json({ error: "One of doctorId or patientId needs to be provided at least" });
      }
      else{
      if(date){
      filter.date = date as string;
      }
      if (status){
      filter.status = status as string;
      }
      const query = [
        {
            path:'doctorId', 
            select:'name'
        }, 
        {
            path:'patientId', 
            select:'name gender dateOfBirth'
        }
    ];
      let appointments = await Appointment.find(filter).populate(query).lean();
      res.status(StatusCodes.ACCEPTED).json(appointments);
    }
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching appointments.' });
    }
}

