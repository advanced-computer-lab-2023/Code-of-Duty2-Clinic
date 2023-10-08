import { IUserBaseInfo } from '../IUserBaseInfo';
import { Schema } from 'mongoose';


export interface IPatient extends IUserBaseInfo {
  emergencyContact: {
    fullname: string;
    mobileNumber: string;
    relationToPatient: string;
  };
  deliveryAddresses: string[];
  healthRecords?: Buffer[];
  subscribedPackage?: 
  {
    packageId: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'subscribed' | 'unsubscribed' | 'cancelled';
  }
  ;
  dependentFamilyMembers?: [
    {
      name: string;
      nationalId: string;
      age: number;
      gender: string;
      relation: 'wife' | 'husband' | 'children';
      subscribedPackage?: 
      {
        packageId: Schema.Types.ObjectId;
        startDate: Date;
        endDate: Date;
        status: 'subscribed' | 'unsubscribed' | 'cancelled';
      }
      ;
    }
  ];
  registeredFamilyMembers?: [
    {
      id: Schema.Types.ObjectId;
      relation: 'wife' | 'husband' | 'children';
    }
  ];
}
