import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../configuration";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getContract = async () => {
  const res = await axios.get(`${config.serverUri}/doctors/users/contract`);
  return res.data.contractUrl;
};
const handleAcceptContract = async () => {
  await axios.post(`${config.serverUri}/doctors/users/accept-contract`);
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

  return (
    <div>
      {getContractUrlQuery.isSuccess && (
        <div>
          <iframe
            width="400px"
            height="500px"
            src={getContractUrlQuery.data}
          ></iframe>
          <Button
            color="primary"
            onClick={() => acceptContractMutation.mutate()}
          >
            Accept Offer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Contract;
