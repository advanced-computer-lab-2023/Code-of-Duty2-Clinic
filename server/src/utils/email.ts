import config from "../configurations";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const { user, clientId, clientSecret, redirectUri, refreshToken } = config.server.emailServiceCredentials;
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
}

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
            accessToken
        }
    } as nodemailer.TransportOptions);
    const mailRequiredOptions = {
        from: `El7a2ny <${user}>`,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html || `<h2>${mailOptions.text}</h2>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
}
