import FamilyMemberList from "./FamilyMemberList";
import useGetPatientDependentFamilyMembers from "../../../hooks/useGetPatientDependentFamilyMembers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetPatientRegisteredFamilyMembers from "../../../hooks/useGetPatientRegisteredFamilyMembers";
import { getPatientNameById } from "../../../utils/getPatientNameById";
import { Box, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import PatientRegisteredFamilyMemberRequests from "./PatientRegisteredFamilyMemberRequests";

const FamilyMembers: React.FC = () => {

const [updatedFamilyMembers, setFamilyMembers] = useState<any[]>([]);
const registeredFamilyMembers = useGetPatientRegisteredFamilyMembers().data;
    useEffect(() => {
        const fetchFamilyMembers = async () => {
            const updatedFamilyMembers = await Promise.all(
                registeredFamilyMembers?.map(async (familyMember) => {
                    return {
                        ...familyMember,
                        name: await getPatientNameById(familyMember.id.toString())
                    };
                }) || []
            );

            setFamilyMembers(updatedFamilyMembers);
        };

        fetchFamilyMembers();
    }, [registeredFamilyMembers]);

  
const dependentFamilyMembers = useGetPatientDependentFamilyMembers().data;
const navigate = useNavigate();
  // ...

  const [showRegisteredMembers, setShowRegisteredMembers] = useState(true);
  const [showDependentMembers, setShowDependentMembers] = useState(true);

  // ...

  return (
    <div style={{ margin: "16px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2vw' }}>
        <Typography variant="h3">My Family Members</Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={showDependentMembers}
            onChange={() => setShowDependentMembers(!showDependentMembers)}
          />
        }
        label="Show Dependent Family Members"
      />

<FormControlLabel
        control={
          <Checkbox
            checked={showRegisteredMembers}
            onChange={() => setShowRegisteredMembers(!showRegisteredMembers)}
          />
        }
        label="Show Registered Family Members"
      />
<Paper elevation={2} sx={{padding: '1vw'}}>
      {showRegisteredMembers && (
        <div>
          <FamilyMemberList 
            members={updatedFamilyMembers || []}
            title = "Registered Family Members"
            onClick={(familyMemberId) => {
                navigate('/patient/family-member-info', { state: { id: familyMemberId } })
            }}
          />
          <PatientRegisteredFamilyMemberRequests />
        </div>
      )}
      {showDependentMembers && (
        <FamilyMemberList 
          members={dependentFamilyMembers || []}
          title = "Dependent Family Members"
          onClick={(familyMemberId) => {
            navigate('/patient/family-members/dependent/info', { state: { id: familyMemberId } })
          }}
        />
      )
      }
      </Paper>   
    </div>
    
  );
}

export default FamilyMembers;

  {/* // useEffect(() => { */}
  //   const fetchRegisteredMembers = async () => {
  //     try {
  //       const response = await axios.get<{ members: string[] }>(
  //         `${config.serverUri}/patients/family-members`
  //       );
  //       if (Array.isArray(response.data)) {
  //         setRegisteredMembers(response.data);
  //       } else if (response.data && typeof response.data === "object") {
  //         setRegisteredMembers(response.data.members);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching registered members:", error);
  //     }
  //   };

  //   const fetchDependentMembers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${config.serverUri}/patients/dependent-family-members`
  //       );

  //       if (Array.isArray(response.data)) {
  //         setDependentMembers(response.data);
  //       } else if (response.data && typeof response.data === "object") {
  //         setDependentMembers([response.data.members]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching dependent members:", error);
  //     }
  //   };

  //   if (showRegisteredMembers) {
  //     fetchRegisteredMembers();
  //   }

  //   if (showDependentMembers) {
  //     fetchDependentMembers();
  //   }
  // }, [showRegisteredMembers, showDependentMembers]);

  // const handleCheckboxChange = (type: "registered" | "dependent") => {
  //   if (type === "registered") {
  //     setShowRegisteredMembers(!showRegisteredMembers);
  //   } else if (type === "dependent") {
  //     setShowDependentMembers(!showDependentMembers);
  //   } else {
  //     setShowRegisteredMembers(true);
  //     setShowDependentMembers(true);
  //   }
  // };

  // const renderMemberCardsR = (members: any[], type: "r" | "d") => {
  //   return members.map((member, index) => (
  //     <Card key={index} style={{ margin: "8px" }}>
  //       <CardContent>
  //         <Typography variant="h6">{member.name}</Typography>
  //         <Link
  //           to={{
  //             pathname: familyMemberPageRoute.path,
  //             search: `?type=${type}&id=${member.id}`,
  //           }}
  //         >
  //           View Details
  //         </Link>
  //       </CardContent>
  //     </Card>
  //   ));
  // };
  // const renderMemberCardsD = (members: any[], type: "r" | "d") => {
  //   return members.map((member, index) => (
  //     <Card key={index} style={{ margin: "8px" }}>
  //       <CardContent>
  //         <Typography variant="h6">{member.name}</Typography>
  //         <Link
  //           to={{
  //             pathname: familyMemberPageRoute.path,
  //             search: `?type=${type}&id=${member.nationalId}`,
  //           }}
  //         >
  //           View Details
  //         </Link>
  //       </CardContent>
  //     </Card>
  //   ));
  // };

  // return (
  //   <div style={{ margin: "16px" }}>
  //     <FormControlLabel
  //       control={
  //         <Checkbox
  //           checked={showRegisteredMembers}
  //           onChange={() => handleCheckboxChange("registered")}
  //         />
  //       }
  //       label="Family Members"
  //     />
  //     <FormControlLabel
  //       control={
  //         <Checkbox
  //           checked={showDependentMembers}
  //           onChange={() => handleCheckboxChange("dependent")}
  //         />
  //       }
  //       label="Dependent Family Members"
  //     />

  //     <div style={{ marginTop: "16px" }}>
  //       <Typography variant="h6">Registered Family Members</Typography>
  //       {showRegisteredMembers && (
  //         <div style={{ display: "flex", flexWrap: "wrap" }}>
  //           {registeredMembers.length > 0 ? (
  //             renderMemberCardsR(registeredMembers, "r")
  //           ) : (
  //             <Typography>No registered family members found.</Typography>
  //           )}
  //         </div>
  //       )}
  //     </div>

  //     <div style={{ marginTop: "16px" }}>
  //       <Typography variant="h6">Dependent Family Members</Typography>
  //       {showDependentMembers && (
  //         <div style={{ display: "flex", flexWrap: "wrap" }}>
  //           {dependentMembers.length > 0 ? (
  //             renderMemberCardsD(dependentMembers, "d")
  //           ) : (
  //             <Typography>No dependent family members found.</Typography>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
