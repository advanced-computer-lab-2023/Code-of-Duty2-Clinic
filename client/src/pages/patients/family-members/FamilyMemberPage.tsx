import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../configuration";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { healthPackagesOptionsRoute } from "../../../data/routes/patientRoutes";
import { getFormattedDateTime } from "../../../utils/formatter";

const FamilyMemberPage: React.FC = () => {
  const [familyMemberData, setFamilyMemberData] = useState<any | null>(null);
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  let today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let healthPackageResponse;

        if (type === "r") {
          healthPackageResponse = await axios.get<any>(
            `${config.serverUri}/patients/registered-family-members/${id}/health-package`
          );
        } else if (type === "d") {
          healthPackageResponse = await axios.get<any>(
            `${config.serverUri}/patients/dependent-family-members/${id}/health-package`
          );
        }

        if (!healthPackageResponse || !healthPackageResponse.data) {
          console.log(
            "No health package found for the selected family member."
          );
          return;
        }

        setFamilyMemberData(healthPackageResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type, id]);

  const handleCancelSubscription = async () => {
    try {
      // Make a PATCH request to cancel the subscription

      if (type === "r") {
        await axios.patch<any>(
          `${config.serverUri}/patients/cancel-subscription/${id}`
        );
      } else if (type === "d") {
        await axios.patch<any>(
          `${config.serverUri}/patients/cancel-subscription-dependent/${id}`
        );
      }
      setFamilyMemberData(
        type === "r"
          ? (prevState: {
              subscribedHealthPackage: { subscribedPackage: any };
            }) => ({
              ...prevState,
              subscribedHealthPackage: {
                ...prevState.subscribedHealthPackage,
                subscribedPackage: {
                  ...prevState.subscribedHealthPackage.subscribedPackage,
                  endDate: today.toString(),
                  status: "cancelled",
                },
              },
            })
          : (prevState: { subscribedPackage: any }) => ({
              ...prevState,
              subscribedPackage: {
                ...prevState.subscribedPackage,
                endDate: today.toString(),
                status: "cancelled",
              },
            })
      );
      console.log("Subscription cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };
  const handleSubscribe = async () => {
    navigate(`${healthPackagesOptionsRoute.path}?type=${type}&id=${id}`);
  };
  function formatPackageDurationInYears(years: number | undefined): string {
    if (years === undefined) {
      return "N/A";
    }

    return `${years} ${years === 1 ? "year" : "years"}`;
  }
  function formatAmountInUSD(amount: number | undefined): string {
    if (amount === undefined) {
      return "N/A";
    }
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

    return formattedAmount;
  }
  return (
    <Grid
      container
      justifyContent="center"
      style={{ padding: "16px", backgroundColor: "#f0f0f0" }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          style={{
            padding: "16px",
            marginTop: "16px",
            textAlign: "center",
            background: "#ffffff",
            color: "#333333",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Family Member Details
          </Typography>
          {familyMemberData?.subscribedPackage ||
          familyMemberData?.subscribedHealthPackage ? (
            <div style={{ marginBottom: "16px" }}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{ fontSize: "1.7rem", fontWeight: "bold" }}
                  >
                    Health Package Details
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Name:{" "}
                    {type === "r"
                      ? familyMemberData.subscribedHealthPackage?.healthPackage
                          ?.name
                      : familyMemberData.healthPackage.name}
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Amount To Pay:{" "}
                    {type === "r"
                      ? formatAmountInUSD(
                          familyMemberData.subscribedHealthPackage
                            ?.healthPackage?.amountToPay
                        )
                      : formatAmountInUSD(
                          familyMemberData.healthPackage.amountToPay
                        )}
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Package Duration:{" "}
                    {type === "r"
                      ? formatPackageDurationInYears(
                          familyMemberData.subscribedHealthPackage
                            ?.healthPackage?.packageDurationInYears
                        )
                      : formatPackageDurationInYears(
                          familyMemberData.healthPackage.packageDurationInYears
                        )}
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Gained Doctor Session Discount:{" "}
                    <LocalOfferIcon style={{ fontSize: 20, marginRight: 5 }} />
                    {type === "r"
                      ? familyMemberData.subscribedHealthPackage?.healthPackage
                          ?.discounts.gainedDoctorSessionDiscount *
                          100 +
                        "%"
                      : familyMemberData.healthPackage?.discounts
                          .gainedDoctorSessionDiscount *
                          100 +
                        "%"}
                  </Typography>

                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Gained Pharmacy Medicines Discount:{" "}
                    <LocalOfferIcon style={{ fontSize: 20, marginRight: 5 }} />
                    {type === "r"
                      ? familyMemberData.subscribedHealthPackage?.healthPackage
                          ?.discounts.gainedPharmacyMedicinesDiscount *
                          100 +
                        "%"
                      : familyMemberData.healthPackage.discounts
                          .gainedPharmacyMedicinesDiscount *
                          100 +
                        "%"}
                  </Typography>

                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Gained Family Members Discount:{" "}
                    <LocalOfferIcon style={{ fontSize: 20, marginRight: 5 }} />
                    {type === "r"
                      ? familyMemberData.subscribedHealthPackage?.healthPackage
                          ?.discounts.gainedFamilyMembersDiscount *
                          100 +
                        "%"
                      : familyMemberData.healthPackage.discounts
                          .gainedFamilyMembersDiscount *
                          100 +
                        "%"}
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ marginTop: "16px" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{ fontSize: "1.7rem", fontWeight: "bold" }}
                  >
                    Subscribed Health Package
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Start Date:{" "}
                    {type === "r"
                      ? getFormattedDateTime(
                          familyMemberData.subscribedHealthPackage
                            ?.subscribedPackage.startDate
                        )
                      : getFormattedDateTime(
                          familyMemberData.subscribedPackage?.startDate
                        )}
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    End Date:{" "}
                    {type === "r"
                      ? getFormattedDateTime(
                          familyMemberData.subscribedHealthPackage
                            ?.subscribedPackage.endDate
                        )
                      : getFormattedDateTime(
                          familyMemberData.subscribedPackage?.endDate
                        )}
                  </Typography>
                  <Typography
                    style={{
                      margin: "8px 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Status:{" "}
                    {type === "r"
                      ? familyMemberData.subscribedHealthPackage
                          ?.subscribedPackage.status
                      : familyMemberData.subscribedPackage?.status}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Typography style={{ fontSize: "18px", marginBottom: "16px" }}>
              No family member details available.
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelSubscription}
              disabled={
                !(type === "r"
                  ? familyMemberData?.subscribedHealthPackage?.subscribedPackage
                      ?.status === "subscribed"
                  : familyMemberData?.subscribedPackage?.status[0] ===
                    "subscribed")
              }
              style={{ marginRight: "16px" }}
            >
              Cancel Subscription
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubscribe}
              disabled={
                type === "r"
                  ? familyMemberData?.subscribedHealthPackage?.subscribedPackage
                      ?.status === "subscribed"
                  : familyMemberData?.subscribedPackage?.status[0] ===
                    "subscribed"
              }
            >
              Subscribe
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FamilyMemberPage;
