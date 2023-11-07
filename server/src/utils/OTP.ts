export const generateOTP = (): string => {
    return Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)).toString();
}
export const getOTPExpirationDate = (): Date => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    return date;
}