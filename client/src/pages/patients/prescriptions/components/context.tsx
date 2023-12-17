import React, { ReactNode, createContext, useState } from "react";
import { IPrescription, IOrder, PrescriptionNullifier, OrderNullifier } from "../interfaces";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useCreateOrderMutation } from "./checkoutStepperService";
import axios from "axios";
import { config } from "../../../../configuration";

interface contextType {
   step: number;
   setStep: React.Dispatch<React.SetStateAction<number>>;
   prescription: IPrescription | null;
   setPrescription: (prescription: IPrescription) => void;
   updatePrescription: (Prescription: IPrescription) => void;
   updateOrder: (order: Partial<IOrder>) => void;
   order: IOrder;
   payPrescription: () => Promise<string>;
   stripe: Stripe | null;
   setStripe: React.Dispatch<React.SetStateAction<Stripe | null>>;
   stripeElements: StripeElements | null;
   setStripeElements: React.Dispatch<React.SetStateAction<StripeElements | null>>;
   error: string;
   setError: React.Dispatch<React.SetStateAction<string>>;
}

export const PrescriptionCheckoutContext = createContext<contextType>({
   step: 0,
   setStep: () => {},
   setPrescription: () => {},
   prescription: null,
   updateOrder: () => {},
   updatePrescription: () => {},
   order: OrderNullifier,
   stripe: null,
   setStripe: () => {},
   stripeElements: null,
   setStripeElements: () => {},
   payPrescription: async (): Promise<string> => {
      return Promise.resolve("");
   },
   error: "",
   setError: () => {},
});

const PrescriptionPaymentContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [step, setStep] = useState(0);
   const [error, setError] = useState("");
   const [prescription, setPrescription] = useState<IPrescription>(PrescriptionNullifier);
   const [order, setOrder] = useState<IOrder>(OrderNullifier);
   const [stripe, setStripe] = useState<Stripe | null>(null);
   const [stripeElements, setStripeElements] = useState<StripeElements | null>(null);
   const createOrdermutation = useCreateOrderMutation();

   const updateOrder = (newOrder: Partial<IOrder>) => {
      setOrder(prevOrder => ({ ...prevOrder, ...newOrder }));
   };

   const updatePrescription = (prescription: IPrescription) => {
      console.log(prescription);
      setOrder(prevOrder => ({ ...prevOrder, medicines: prescription.medicines as [] }));
      setPrescription(prescription);
   };

   async function payPrescription() {
      if (order.paymentMethod == "card") {
         const result = await payPrescriptionUsingCards();
         if (result?.error) {
            setError("Card doesnt exist")
            return "Card doesnt exist";
         }
      }
      //createOrdermutation.mutate({ order, prescriptionId: prescription?._id! });
      const res = await axios.post(`${config.serverUri}/patients/prescription/${prescription?._id}/pay`, {
         ...order,
      });
      console.log(res.status)
      if (res.status!==201) {
         setError("cannot issue order please try again later")
         return "cannot issue order please try again later";
      }
      return "success";
   }

   async function payPrescriptionUsingCards() {
      if (!stripe || !stripeElements) {
         return;
      }
      const result = await stripe.confirmPayment({
         elements: stripeElements,
         confirmParams: { return_url: `${window.location.origin}/` },
         redirect: "if_required",
      });
      return result;
   }

   const contextValue: contextType = {
      step,
      setStep,
      error,
      setError,
      prescription,
      setPrescription,
      updatePrescription,
      updateOrder,
      order,
      stripe,
      setStripe,
      stripeElements,
      setStripeElements,
      payPrescription,
   };

   return (
      <PrescriptionCheckoutContext.Provider value={contextValue}>
         {children}
      </PrescriptionCheckoutContext.Provider>
   );
};

export default PrescriptionPaymentContextProvider;
