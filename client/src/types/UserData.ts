type UserData = {
  id: string;
  name: string;
  email: string | null;
  photoUrl?: string;
  role?: "DOCTOR" | "PATIENT";
  gender?: "male" | "female";
};

export default UserData;
