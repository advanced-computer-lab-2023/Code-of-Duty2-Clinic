import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { PrescriptionCheckoutContext } from "../../../context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { config } from "../../../../../../../configuration";
const CheckoutForm = () => {
   const { setStripe, setStripeElements } = useContext(PrescriptionCheckoutContext);

   const stripe = useStripe();
   setStripe(stripe);

   const elements = useElements();
   setStripeElements(elements);

   useEffect(() => {}, []);

   const handleSubmit = async (event: any) => {
      event.preventDefault();
   };

   return (
      <form onSubmit={handleSubmit}>
         <div style={{ width: 500 }}>
            <PaymentElement />
         </div>
      </form>
   );
};

const stripePromise = loadStripe(
   "pk_test_51OMJOFEO4fH9y4YkZ0BE3gTx0VrHs93Ta1Oh7S6har82svljspdzBawPQ1OSIWiBz1gbAHL8O3k7QED56speKyGc003HOdumWh"
);

function StripePayment() {
   const [options, setOptions] = useState<{ clientSecret: string }>();
   async function getClientSecret() {
      const rprom = await axios.post(
         `${config.serverUri}/patients/payments/create-payment-intent`,
         { amount: 100 }
      );
      setOptions({ clientSecret: rprom.data.clientSecret });
   }
   useEffect(() => {
      getClientSecret();
   }, []);
   if (options?.clientSecret)
      return (
         <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
         </Elements>
      );
   else return <div>Loading</div>;
}

export default StripePayment;
