import axios from "axios";
import PaymentConfirmationComponent from "../../../features/checkout/PaymentConfirmationComponent";
import { config } from "../../../configuration";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

type FamilyMember = "r" | "d";
const getProperAppointmentBookingMethod =
  (
    paymentMethod: "wallet" | "credit-card",
    doctorId: string,
    type: FamilyMember,
    id: string | null,
    startTime: Date,
    endTime: Date
  ) =>
  async () => {
    if (type === "r") {
      await axios.post(
        `${config.serverUri}/patients/registered-family-members/${id}/appointments/${doctorId}?paymentMethod=${paymentMethod}`,
        { startTime: startTime.toISOString(), endTime: endTime.toISOString() }
      );
    } else if (type === "d") {
      await axios.post(
        `${config.serverUri}/patients/dependent-family-members/${id}/appointments/${doctorId}?paymentMethod=${paymentMethod}`,
        { startTime: startTime.toISOString(), endTime: endTime.toISOString() }
      );
    } else {
      await axios.post(
        `${config.serverUri}/patients/appointments/${doctorId}?paymentMethod=${paymentMethod}`,
        {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }
      );
    }
  };

const getAppointmentFees = async (doctorId: string) => {
  const response = await axios.get(
    `${config.serverUri}/patients/appointments/${doctorId}`
  );
  return response.data;
};

const AppointmentPayment = () => {
  const { doctorId } = useParams();
  const query = useQueryParams();
  const type = query.get("type") as FamilyMember;
  const id = query.get("id");
  const startTime = new Date(query.get("st")!);
  const endTime = new Date(query.get("et")!);

  if (
    !doctorId ||
    !startTime ||
    !endTime ||
    (!type && id) ||
    (type && !id) ||
    (type && id && type !== "r" && type !== "d")
  ) {
    return <div>Invalid request</div>;
  }

  const appointmentFeesQuery = useQuery(["appointmentFees", doctorId], () =>
    getAppointmentFees(doctorId)
  );

  if (appointmentFeesQuery.isLoading) return <div>Loading...</div>;
  if (appointmentFeesQuery.isError)
    return <div>Error loading appointment details</div>;

  const priceToPay = appointmentFeesQuery.data?.fees;
  if (priceToPay === undefined || priceToPay === null)
    return <div>Error loading appointment details</div>;

  const walletPaymentApiFunction = getProperAppointmentBookingMethod(
    "wallet",
    doctorId,
    type,
    id,
    startTime,
    endTime
  );
  const creditCardPaymentApiFunction = getProperAppointmentBookingMethod(
    "credit-card",
    doctorId,
    type,
    id,
    startTime,
    endTime
  );
  return (
    <PaymentConfirmationComponent
      priceToPay={priceToPay}
      walletPaymentApiFunction={walletPaymentApiFunction}
      creditCardPaymentApiFunction={creditCardPaymentApiFunction}
      paymentPageTitle="Doctor Appointment Payment"
    >
      <AppointmentDetails />
    </PaymentConfirmationComponent>
  );
};

function AppointmentDetails() {
  return (
    <div>
      <h3>Appointment Details</h3>
    </div>
  );
}

export default AppointmentPayment;
