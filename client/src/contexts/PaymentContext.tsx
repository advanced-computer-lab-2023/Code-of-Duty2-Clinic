import { createContext } from "react";

interface IPaymentContext {
  totalPriceToPay: number;
  handleWalletPayment: () => Promise<void>;
  handleCreditCardPayment: () => Promise<void>;
  handleNext: any;
}

const PaymentContext = createContext<IPaymentContext>({
  totalPriceToPay: 0,
  handleWalletPayment: () => Promise.resolve(),
  handleCreditCardPayment: () => Promise.resolve(),
  handleNext: () => {},
});

export default PaymentContext;
