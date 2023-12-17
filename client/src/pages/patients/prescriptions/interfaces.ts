export interface IMedicine {
   medicineId: string;
   name: string;
   price?: number;
   priceBefore?: number;
   priceAfter?: number;
   dosage: string;
   pictureUrl?: string;
   quantity: number;
}

export interface IPrescription {
   _id: string;
   patientName: string;
   doctorId: {
      _id: string;
      name: string;
      speciality: string;
   };
   patientId: {
      _id: string;
      name: string;
   };
   isPaid?:boolean
   status: string;
   medicines: [IMedicine] | [];
   updatedAt: Date;
   packageName: string;
}
export const PrescriptionNullifier: IPrescription = {
   _id: "",
   patientName: "",
   doctorId: {
      _id: "",
      name: "",
      speciality: "",
   },
   patientId: {
      _id: "",
      name: "",
   },
   status: "",
   medicines: [],
   updatedAt: new Date(""),
   packageName: "",
};

export interface ISearch {
   doctorName?: string;
   updatedAt?: string;
   status?: string;
}

export interface IOrder {
   patientId: string;
   paymentMethod: string;
   patientAddress: string;
   medicines: [];
}

export const OrderNullifier: IOrder = {
   patientId: "",
   paymentMethod: "card",
   patientAddress: "",
   medicines: [],
};

export interface createPharmacyOrderInput {
   order: IOrder;
   prescriptionId: string;
}
