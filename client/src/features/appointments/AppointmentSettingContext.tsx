import { createContext, useState } from "react";

export const AppointmentSettingContext = createContext({
  open: false,
  setOpen: (_open: boolean) => {},
  option: "follow-up" as "follow-up" | "follow-up-request" | "set-up-appointment",
  setOption: (_option: "follow-up" | "follow-up-request" | "set-up-appointment") => {},
  viewIndex: 0 as number | null,
  setViewIndex: (_index: number | null) => {},
  currentView: 1,
  setCurrentView: (_view: number) => {},
  registeredMemberId: null as string | null,
  setRegisteredMemberId: (_id: string | null) => {},
  doctorId: null as string | null,
  setDoctorId: (_id: string | null) => {},
  dependentMemberId: null as string | null,
  setDependentMemberId: (_id: string | null) => {}
});

type Props = {
  children: React.ReactNode;
};

const AppointmentSettingContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<"follow-up" | "follow-up-request" | "set-up-appointment">(
    "follow-up"
  );
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  const [currentView, setCurrentView] = useState(1);

  const [registeredMemberId, setRegisteredMemberId] = useState<string | null>(null);
  const [dependentMemberId, setDependentMemberId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  return (
    <AppointmentSettingContext.Provider
      value={{
        open,
        setOpen,
        option,
        setOption,
        viewIndex,
        setViewIndex,
        currentView,
        setCurrentView,
        registeredMemberId,
        setRegisteredMemberId,
        dependentMemberId,
        setDependentMemberId,
        doctorId,
        setDoctorId
      }}
    >
      {children}
    </AppointmentSettingContext.Provider>
  );
};

export default AppointmentSettingContextProvider;
