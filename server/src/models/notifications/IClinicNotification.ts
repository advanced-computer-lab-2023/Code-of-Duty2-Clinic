
export interface IClinicNotification {
    email: string;
    title: string;
    description: string;
    dateTime: Date;
    methods: [{ method: 'SMS' | 'email'; }];
}
