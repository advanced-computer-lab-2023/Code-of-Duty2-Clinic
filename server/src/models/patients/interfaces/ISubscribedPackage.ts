import { Schema } from "mongoose";

export interface ISubscribedPackage {
    packageId: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'subscribed' | 'unsubscribed' | 'cancelled';
}