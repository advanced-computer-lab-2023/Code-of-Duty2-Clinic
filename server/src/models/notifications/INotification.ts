
export interface INotification {
    email: string;
    title: string;
    description: string;
    dateTime: Date;
    methods: { method: 'SMS' | 'email'; }[];
}
