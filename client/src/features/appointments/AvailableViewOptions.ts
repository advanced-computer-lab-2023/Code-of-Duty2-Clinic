type AvailableViewOption =
  | { leftView: null; rightView: "doctors" }
  | { leftView: null; rightView: "patients" }
  | { leftView: "registered"; rightView: null }
  | { leftView: "dependent"; rightView: null }
  | { leftView: "registered"; rightView: "doctors" }
  | { leftView: "dependent"; rightView: "doctors" };

export const availableViewOptions: AvailableViewOption[] = [
  {
    leftView: null,
    rightView: "doctors"
  },
  {
    leftView: null,
    rightView: "patients"
  },
  {
    leftView: "registered",
    rightView: null
  },
  {
    leftView: "dependent",
    rightView: null
  },
  {
    leftView: "registered",
    rightView: "doctors"
  },
  {
    leftView: "dependent",
    rightView: "doctors"
  }
];

export const getViewsTitles = (
  view: number | null,
  option: "follow-up" | "follow-up-request" | "set-up-appointment"
) => {
  switch (view) {
    case 0:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the doctor whom you want to request a follow up appointment"
            : "Choose the doctor whom you want to set up an appointment with"
      };
    case 1:
      return {
        firstViewTitle: "Choose a patient with whom you want to conduct a follow up appointment"
      };
    case 2:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the registered patient whom you want to request a follow up appointment with this doctor"
            : "Choose the registered patient whom you want to conduct an appointment with this doctor"
      };
    case 3:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the dependent patient whom you want to request a follow up appointment with this doctor"
            : "Choose the dependent patient whom you want to conduct an appointment with this doctor"
      };
    case 4:
      return {
        secondViewTitle: {
          leftPart: "Choose the registered patient",
          rightPart: "Choose the doctor"
        }
      };
    case 5:
      return {
        secondViewTitle: {
          leftPart: "Choose the dependent patient",
          rightPart: "Choose the doctor"
        }
      };
    default:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "To whom do you want to request a follow up appointment for"
            : "To whom do you want to conduct an appointment for ?"
      };
  }
};
