import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../configuration";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getContract = async () => {
  const res = await axios.get(`${config.serverUri}/doctors/users/contract`);
  console.log(res.data.contractUrl)
  return res.data.contractUrl;
};
const handleAcceptContract = async () => {
  await axios.post(`${config.serverUri}/doctors/users/accept-contract`);
};
const handleRejectContract = async () => {
  await axios.post(`${config.serverUri}/doctors/users/reject-contract`);
};
const Contract: React.FC = () => {
  const navigate = useNavigate();
  const getContractUrlQuery = useQuery(["contract"], getContract);
  
  const acceptContractMutation = useMutation(handleAcceptContract, {
    onSuccess: () => {

      navigate("/login/doctor");
    },
    onError: () => {
      navigate("/login/doctor");
    },
  });

  const rejectOfferMutation = useMutation(handleRejectContract, {
    onSuccess: () => {
    },
    onError: () => {
      navigate("/login/doctor");
    },
  });

  return (
    <div>
      {getContractUrlQuery.isSuccess && getContractUrlQuery.data? (
        
        <div>
          <iframe
            width="400px"
            height="500px"
            src={getContractUrlQuery.data}
          ></iframe>
          <Button
            href="/login/doctor"
            color="primary"
            onClick={() => acceptContractMutation.mutate()}
          >
            Accept Offer
          </Button>
          <Button
            href="/login/doctor"
            color="primary"
            onClick={() => rejectOfferMutation.mutate()}
          >
            Reject
          </Button>
        </div>
      ):
      <div>
        Application Sumbitted if your are accepted we will send you the contract
      </div>
    }
    </div>
  );
};

export default Contract;
