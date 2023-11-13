import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../configuration";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Grid } from "@mui/material";
import {healthPackagesOptionsRoute} from "../../data/routes/patientRoutes";
const FamilyMemberPage: React.FC = () => {
  const [familyMemberData, setFamilyMemberData] = useState<any | null>(null);
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const type = queryParams.get("type");
  const id = queryParams.get("id");
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
          console.log("No health package found for the selected family member.");
          return;
        }

        setFamilyMemberData(healthPackageResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      setFamilyMemberData((prevState: { subscribedHealthPackage: { subscribedPackage: any; }; }) => ({
        ...prevState,
        subscribedHealthPackage: {
          ...prevState.subscribedHealthPackage,
          subscribedPackage: {
            ...prevState.subscribedHealthPackage.subscribedPackage,
            status: "cancelled",
          },
        },
      }));
      console.log("Subscription cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  const handleSubscribe = async() => {

    navigate(`${healthPackagesOptionsRoute.path}?type=${type}&id=${id}`);

  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h2">Family Member Details</Typography>
          {(familyMemberData?.subscribedPackage || familyMemberData?.subscribedHealthPackage) ? (
            <div>
              <Typography variant="h3">Subscribed Health Package</Typography>
              <Typography>
                Package ID:{" "}
                {(type =='r')?(familyMemberData.subscribedHealthPackage?.subscribedPackage.packageId):(familyMemberData.subscribedPackage?.packageId)}
              </Typography>
              <Typography>
                Start Date:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.subscribedPackage.startDate):(familyMemberData.subscribedPackage?.startDate)}
              </Typography>
              <Typography>
                End Date:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.subscribedPackage.endDate):(familyMemberData.subscribedPackage?.endDate)}
              </Typography>
              <Typography>
                Status:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.subscribedPackage.status):(familyMemberData.subscribedPackage?.status)}
              </Typography>

              <Typography variant="h3">Health Package Details</Typography>
              <Typography>Name: {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.name):(familyMemberData.healthPackage.name)}</Typography>
              <Typography>
                Amount To Pay:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.amountToPay):(familyMemberData.healthPackage?.amountToPay)}
              </Typography>
              <Typography>
                Package Duration (Years):{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.packageDurationInYears):(familyMemberData.healthPackage.packageDurationInYears) }
              </Typography>
              <Typography>
                Gained Doctor Session Discount:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.discounts.gainedDoctorSessionDiscount):(familyMemberData.healthPackage?.discounts.gainedDoctorSessionDiscount) }
              </Typography>
              <Typography>
                Gained Pharmacy Medicines Discount:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.discounts.gainedPharamcyMedicinesDiscount):(familyMemberData.healthPackage.discounts.gainedPharamcyMedicinesDiscount) }
              </Typography>
              <Typography>
                Gained Family Members Discount:{" "}
                {(type ==='r')?(familyMemberData.subscribedHealthPackage?.healthPackage?.discounts.gainedFamilyMembersDiscount):(familyMemberData.healthPackage.discounts.gainedFamilyMembersDiscount) }
              </Typography>
            </div>
          ) : (
            <Typography>No family member details available.</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancelSubscription}
            disabled={((type==='r')?(familyMemberData?.subscribedHealthPackage?.subscribedPackage?.status === "subscribed"):((familyMemberData?.subscribedPackage?.status === "subscribed")))}
            style={{ marginRight: "16px" }}
          >
            Cancel Subscription
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubscribe}
            disabled={!((type==='r')?(familyMemberData?.subscribedHealthPackage?.subscribedPackage?.status === "subscribed"):((familyMemberData?.subscribedPackage?.status === "subscribed")))}
          >
            Subscribe
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FamilyMemberPage;
/*{
    "subscribedPackage": {
        "packageId": "65228d0d033c935b1c137f9c",
        "startDate": "2023-11-13T15:12:23.716Z",
        "endDate": "2024-11-12T15:12:23.716Z",
        "status": [
            "subscribed"
        ],
        "_id": "65523cd7c7c3984526987658"
    },
    "healthPackage": {
        "discounts": {
            "gainedDoctorSessionDiscount": 0.8,
            "gainedPharamcyMedicinesDiscount": 0.7,
            "gainedFamilyMembersDiscount": 0.2
        },
        "_id": "65228d0d033c935b1c137f9c",
        "name": "Platinum Package",
        "amountToPay": 19,
        "packageDurationInYears": 1,
        "__v": 0
    }
} dependent api respone*/ 

/*{
    "subscribedHealthPackage": {
        "subscribedPackage": {
            "packageId": "65228d0d033c935b1c137f9c",
            "startDate": "2023-11-13T15:49:11.237Z",
            "endDate": "2024-11-12T15:49:11.237Z",
            "status": "subscribed",
            "_id": "655245779bde46391869c4ec"
        },
        "healthPackage": {
            "discounts": {
                "gainedDoctorSessionDiscount": 0.8,
                "gainedPharamcyMedicinesDiscount": 0.7,
                "gainedFamilyMembersDiscount": 0.2
            },
            "_id": "65228d0d033c935b1c137f9c",
            "name": "Platinum Package",
            "amountToPay": 19,
            "packageDurationInYears": 1,
            "__v": 0
        }
    }
} registered api respone */