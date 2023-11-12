import React, { ReactNode, createContext, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
export enum status {
  notComplete,
  submitted,
  accepted,
  rejected,
}

interface contextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const ApplicationContext = createContext<contextType>({
  step: 1,
  setStep: () => {},
  error: "",
  setError: () => {},
});

const ApplicationContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [applicationStatus, setApplicationStatus] = useState<status>(
    status.notComplete
  );
  const [error, setError] = useState("");
  const cc = useContext(AuthContext).authState;

  const contextValue: contextType = {
    step,
    setStep,
    error,
    setError,
  };
  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
