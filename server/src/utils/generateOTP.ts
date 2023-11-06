export const generateOTP = (): string => {
    return Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)).toString();
}
