export interface IAdmin {
  username: string;
  password: string;
  passwordReset?: {
    code: string;
    expiryDate: Date;
  };
}
