import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../configuration";

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
          // If it's an array, set it directly
          setRegisteredMembers(response.data);
        } else if (response.data && typeof response.data === "object") {
          // If it's an object, you might need to extract the necessary information
          // For example, if the dependent member details are in a property called 'members'
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

        // Check the structure of the response and process accordingly
        if (Array.isArray(response.data)) {
          // If it's an array, set it directly
          setDependentMembers(response.data);
        } else if (response.data && typeof response.data === "object") {
          // If it's an object, you might need to extract the necessary information
          // For example, if the dependent member details are in a property called 'members'
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
    }
    else{
      setShowRegisteredMembers(true);
      setShowDependentMembers(true);
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showRegisteredMembers}
          onChange={() => handleCheckboxChange("registered")}
        />
        Family Members
      </label>
      <label>
        <input
          type="checkbox"
          checked={showDependentMembers}
          onChange={() => handleCheckboxChange("dependent")}
        />
        Dependent Family Members
      </label>

      <div>
        <h3>Registered Family Members</h3>
        {showRegisteredMembers && (
          <ul>
            {registeredMembers.length > 0 ? (
              registeredMembers.map((member, index) => (
                <li key={index}><Link 
                to={{
                  pathname: "/health-package",
                  search: `?type=r&id=${member.id}`, 
                }}
              >
                {member.name}
              </Link></li>
              ))
            ) : (
              <li>No registered family members found.</li>
            )}
          </ul>
        )}
      </div>

      <div>
  <h3>Dependent Family Members</h3>
  {showDependentMembers && (
    <ul>
      {dependentMembers.length > 0 ? (
        dependentMembers.map((member: any, index: number) => (
          <li key={index}><Link 
          to={{
            pathname: "/health-package",
            search: `?type=d&id=${member.nationalId}`,
          }}
        >
          {member.name}
        </Link></li>
        ))
      ) : (
        <li>No dependent family members found.</li>
      )}
    </ul>
  )}
</div>
    </div>
  );
};

export default FamilyMembersComponent;
