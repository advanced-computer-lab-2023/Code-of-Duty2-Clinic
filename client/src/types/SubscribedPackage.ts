import { Schema } from "mongoose";

export interface SubscribedPackage {
    packageId: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'subscribed' | 'unsubscribed' | 'cancelled';
}