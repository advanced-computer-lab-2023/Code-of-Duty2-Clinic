import { IDoctorBaseInfo } from './IDoctorBaseInfo';


export interface IDoctor extends IDoctorBaseInfo {
  speciality?: string;
  availableSlots: [
    {startTime: Date, endTime: Date}
  ],
  identification?: string;
  medicalLicense?: Buffer;
  medicalDegree?: Buffer;
  wallet?: {
    amount: number;
  };
  contract?: Buffer;
  contractStatus?: 'pending' | 'accepted' | 'rejected';
}
