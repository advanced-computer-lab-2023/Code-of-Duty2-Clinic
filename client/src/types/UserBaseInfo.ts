
export interface UserBaseInfo {  
    _id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    mobileNumber: string;
}