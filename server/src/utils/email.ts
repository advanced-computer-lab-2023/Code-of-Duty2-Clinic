import config from "../configurations";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { IAppointmentBaseInfo } from "../models/appointments/interfaces/IAppointmentBaseInfo";
import { getFormattedDate, getFormattedTime } from "./formatter";

const { user, clientId, clientSecret, redirectUri, refreshToken } =
  config.server.emailServiceCredentials;
const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export const sendEmail = async (mailOptions: MailOptions) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  } as nodemailer.TransportOptions);
  const mailRequiredOptions = {
    from: `El7a2ny <${user}>`,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html || `<h2>${mailOptions.text}</h2>`,
  };
  const result = await transport.sendMail(mailRequiredOptions);
  return result;
};

export function getAppointmentEmailText(
  appointment: IAppointmentBaseInfo,
  name: string
): string {
  return `Your appointment on ${getFormattedDate(
    appointment.timePeriod.startTime.toString()
  )} 
     from ${getFormattedTime(
       appointment.timePeriod.startTime.toString()
     )} to ${getFormattedTime(appointment.timePeriod.endTime.toString())}
    with ${name} has been ${appointment.status}.
    `;
}
