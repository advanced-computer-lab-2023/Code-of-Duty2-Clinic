import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../models/appointments/Appointment';

export const getAppointments = async (req: Request, res: Response) => {
    try {
      const { patientId, doctorId, date , status } = req.query;
      const filter: any = {};
      let fieldsNotProvided = []
      if (patientId) {
        filter.patientId = new mongoose.Types.ObjectId(patientId as string);
      }
      else{
        fieldsNotProvided.push("patientId");
      }
      if (doctorId) {
        filter.doctorId = new mongoose.Types.ObjectId(doctorId as string);
      }
      else{
        fieldsNotProvided.push("doctorId")
      }
      if(fieldsNotProvided.length ===2){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "One of doctorId or patientId needs to be provided at least" });
      }
      else{
      if(date){
      filter.date = date as string;
      }
      if (status){
      filter.status = status as string;
      }
      const appointments = await Appointment.find(filter);
      res.status(StatusCodes.ACCEPTED).json(appointments);
    }
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching appointments.' });
    }
}

export const addAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentDetails = req.body;
        const appointment = new Appointment(appointmentDetails)
        await appointment.save()
        res.status(StatusCodes.ACCEPTED).json(appointment);
      } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching appointments.' });
      }
}