import { DoctorBaseInfo } from './DoctorBaseInfo';


export interface Doctor extends DoctorBaseInfo {
  speciality?: string;
  availableSlots: [
    {startTime: Date, endTime: Date}
  ],
  identification?: Buffer;
  medicalLicense?: Buffer;
  medicalDegree?: Buffer;
  wallet?: {
    amount: number;
  };
  contract?: Buffer;
  contractStatus?: 'pending' | 'accepted' | 'rejected';
}
