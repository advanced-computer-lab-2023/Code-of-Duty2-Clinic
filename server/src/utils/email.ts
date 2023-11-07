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


export const sendEmail = async (to: string, subject: string, text: string) => {
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
    const mailOptions = {
        from: `El7a2ny <${user}>`,
        to,
        subject,
        text,
        html: `<h1>${text}</h1>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
}
