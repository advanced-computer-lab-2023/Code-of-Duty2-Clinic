import UserRole from "./enums/UserRole";

export type LoginResponse = {
  accessToken: string;
  role: UserRole;
};
