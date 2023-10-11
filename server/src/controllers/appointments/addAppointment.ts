import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Appointment from '../../models/appointments/Appointment';
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