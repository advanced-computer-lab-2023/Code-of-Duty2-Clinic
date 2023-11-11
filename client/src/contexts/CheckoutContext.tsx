import { createContext } from "react";

interface ICheckoutContext {
  total: any;
  handleCreateOrder: any;
  handleNext: any;
}

const CheckoutContext = createContext<ICheckoutContext>({
  total: 0,
  handleCreateOrder: () => {},
  handleNext: () => {},
});

export default CheckoutContext;
