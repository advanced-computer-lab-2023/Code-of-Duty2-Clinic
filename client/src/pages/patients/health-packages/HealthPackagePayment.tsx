import axios from "axios";
import PaymentConfirmationComponent from "../../../features/checkout/PaymentConfirmationComponent";
import { config } from "../../../configuration";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

type FamilyMember = "r" | "d";
const getProperSubscriptionMethod =
  (
    paymentMethod: "wallet" | "credit-card",
    packageId: string,
    type: FamilyMember,
    id: string | null
  ) =>
  async () => {
    if (type === "r") {
      await axios.post<any>(
        `${config.serverUri}/patients/registered-members/${id}/subscribe/${packageId}?paymentMethod=${paymentMethod}`
      );
    } else if (type === "d") {
      await axios.post<any>(
        `${config.serverUri}/patients/dependent-members/${id}/subscribe/${packageId}?paymentMethod=${paymentMethod}`
      );
    } else {
      await axios.post<any>(
        `${config.serverUri}/patients/subscribe/${packageId}?paymentMethod=${paymentMethod}`
      );
    }
  };

const getHealthPackageDetails = async (packageId: string) => {
  const response = await axios.get(
    `${config.serverUri}/patients/health-packages/${packageId}`
  );
  return response.data;
};
const HealthPackagePayment = () => {
  const { packageId } = useParams();
  const query = useQueryParams();
  const type = query.get("type") as FamilyMember;
  const id = query.get("id");

  if (
    !packageId ||
    (!type && id) ||
    (type && !id) ||
    (type && id && type !== "r" && type !== "d")
  ) {
    return <div>Invalid request</div>;
  }

  const getHealthPackageDetailsQuery = useQuery(
    ["health-package-details"],
    () => getHealthPackageDetails(packageId)
  );

  if (getHealthPackageDetailsQuery.isLoading) return <div>Loading...</div>;
  if (getHealthPackageDetailsQuery.isError)
    return <div>Error loading health package details</div>;

  const priceToPay = getHealthPackageDetailsQuery.data?.amountToPay;

  const walletPaymentApiFunction = getProperSubscriptionMethod(
    "wallet",
    packageId,
    type,
    id
  );
  const creditCardPaymentApiFunction = getProperSubscriptionMethod(
    "credit-card",
    packageId,
    type,
    id
  );
  return (
    <PaymentConfirmationComponent
      priceToPay={priceToPay}
      walletPaymentApiFunction={walletPaymentApiFunction}
      creditCardPaymentApiFunction={creditCardPaymentApiFunction}
      paymentPageTitle="Health Package Payment"
    >
      <HealthPackageDetails />
    </PaymentConfirmationComponent>
  );
};

function HealthPackageDetails() {
  return (
    <div>
      <h3>Health Package Details</h3>
    </div>
  );
}

export default HealthPackagePayment;
