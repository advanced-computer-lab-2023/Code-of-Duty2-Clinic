export interface IPasswordResetInfo {
    otp: string;
    expiryDate: Date;
    verify?: (candidate: string) => Promise<boolean>;
}