import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../../configuration";
import { familyMemberPageRoute } from "../../../data/routes/patientRoutes";
import {
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const FamilyMembersComponent: React.FC = () => {
  const [registeredMembers, setRegisteredMembers] = useState<any[]>([]);
  const [dependentMembers, setDependentMembers] = useState<any>([]);
  const [showRegisteredMembers, setShowRegisteredMembers] = useState(true);
  const [showDependentMembers, setShowDependentMembers] = useState(true);

  useEffect(() => {
    const fetchRegisteredMembers = async () => {
      try {
        const response = await axios.get<{ members: string[] }>(
          `${config.serverUri}/patients/family-members`
        );
        if (Array.isArray(response.data)) {
          setRegisteredMembers(response.data);
        } else if (response.data && typeof response.data === "object") {
          setRegisteredMembers(response.data.members);
        }
      } catch (error) {
        console.error("Error fetching registered members:", error);
      }
    };

    const fetchDependentMembers = async () => {
      try {
        const response = await axios.get(
          `${config.serverUri}/patients/dependent-family-members`
        );

        if (Array.isArray(response.data)) {
          setDependentMembers(response.data);
        } else if (response.data && typeof response.data === "object") {
          setDependentMembers([response.data.members]);
        }
      } catch (error) {
        console.error("Error fetching dependent members:", error);
      }
    };

    if (showRegisteredMembers) {
      fetchRegisteredMembers();
    }

    if (showDependentMembers) {
      fetchDependentMembers();
    }
  }, [showRegisteredMembers, showDependentMembers]);

  const handleCheckboxChange = (type: "registered" | "dependent") => {
    if (type === "registered") {
      setShowRegisteredMembers(!showRegisteredMembers);
    } else if (type === "dependent") {
      setShowDependentMembers(!showDependentMembers);
    } else {
      setShowRegisteredMembers(true);
      setShowDependentMembers(true);
    }
  };

  const renderMemberCardsR = (members: any[], type: "r" | "d") => {
    return members.map((member, index) => (
      <Card key={index} style={{ margin: "8px" }}>
        <CardContent>
          <Typography variant="h6" style={{fontWeight:"normal"}}>Name:{" "}{member.name}</Typography>
          <Typography variant="h6" style={{fontWeight:"normal"}}>Relation:{" "}{member.relation}</Typography>
          <Link
            to={{
              pathname: familyMemberPageRoute.path,
              search: `?type=${type}&id=${member.id}`,
            }}
          >
            View Details
          </Link>
        </CardContent>
      </Card>
    ));
  };
  const renderMemberCardsD = (members: any[], type: "r" | "d") => {
    return members.map((member, index) => (
      <Card key={index} style={{ margin: "8px" }}>
        <CardContent>
          <Typography variant="h6" style={{fontWeight:"normal"}}>Name:{" "}{member.name}</Typography>
          <Typography variant="h6" style={{fontWeight:"normal"}}>Relation:{" "}{member.relation}</Typography>
          <Link
            to={{
              pathname: familyMemberPageRoute.path,
              search: `?type=${type}&id=${member.nationalId}`,
            }}
          >
            View Details
          </Link>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div style={{ margin: "16px" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={showRegisteredMembers}
            onChange={() => handleCheckboxChange("registered")}
          />
        }
        label="Family Members"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={showDependentMembers}
            onChange={() => handleCheckboxChange("dependent")}
          />
        }
        label="Dependent Family Members"
      />

      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6">Registered Family Members</Typography>
        {showRegisteredMembers && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {registeredMembers.length > 0 ? (
              renderMemberCardsR(registeredMembers, "r")
            ) : (
              <Typography>No registered family members found.</Typography>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography variant="h6">Dependent Family Members</Typography>
        {showDependentMembers && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {dependentMembers.length > 0 ? (
              renderMemberCardsD(dependentMembers, "d")
            ) : (
              <Typography>No dependent family members found.</Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMembersComponent;
