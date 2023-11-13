import Patient from "../../models/patients/Patient";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const registerAsPatient = async (req: Request, res: Response) => {
  const {
    username,
    password,
    email,
    name,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact,
  } = req.body;
  try {
    // Check if the email & username already mwgoodeen
    const existingSimilarEmails = await Patient.countDocuments({ email });
    const existingSimilarUsernames = await Patient.countDocuments({ username });

    if (existingSimilarEmails > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Email already exists. Please use a different email.");
    }
    if (existingSimilarUsernames > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Username already exists. Please choose a different username.");
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate the password against the regex
    if (!strongPasswordRegex.test(password)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(
          "Password must be strong (min 8 characters, uppercase, lowercase, number, special character)."
        );
    }

    const newPatient = new Patient({
      username,
      password,
      email,
      name,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    });
    await newPatient.save();
    res
      .status(StatusCodes.CREATED)
      .send("Patient registered successfully! Welcome Aboard!");
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("An error occurred during registration");
  }
};

export { registerAsPatient };
