import { ReactNode, createContext, useState } from "react";
import UserRole from "../../../../types/enums/UserRole";
import User from "../../../../types/User";

interface contextType {
  step: number;
  setStep: (step: number) => void;
  userData: User;
  setUserData: (userData: User) => void;
  error: string;
  setError: (error: string) => void;
}

export const ForgetPasswordContext = createContext<contextType>({
  step: 1,
  setStep: () => {},
  userData: {
    id: "",
    role: UserRole.GUEST,
  },
  setUserData: () => {},
  error: "",
  setError: () => {},
});

const ForgetPasswordContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<User>({
    id: "",
    role: UserRole.GUEST,
  });
  const [error, setError] = useState("");

  const contextValue: contextType = {
    step,
    setStep,
    userData,
    setUserData,
    error,
    setError,
  };
  return (
    <ForgetPasswordContext.Provider value={contextValue}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export default ForgetPasswordContextProvider;
