import FamilyMemberList from "./FamilyMemberList";
import useGetPatientDependentFamilyMembers from "../../../hooks/useGetPatientDependentFamilyMembers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetPatientRegisteredFamilyMembers from "../../../hooks/useGetPatientRegisteredFamilyMembers";
import { getPatientNameById } from "../../../utils/getPatientNameById";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import PatientRegisteredFamilyMemberRequests from "./PatientRegisteredFamilyMemberRequests";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { RegisteredFamilyMember } from "../../../types";


const FamilyMembers: React.FC = () => {

const [updatedFamilyMembers, setFamilyMembers] = useState<RegisteredFamilyMember[]>([]);
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
               <Box>
               <Box sx={{alignContent: 'center'}}>
               <Typography variant="h4" gutterBottom sx={{marginBottom: '5%'}}>
                    Dependent Family Members
               </Typography>
               </Box>
               <Box sx={{ padding: 4 }}>
         <Box>
           <Grid container spacing={3}>
             {dependentFamilyMembers?.map((member) => (
               <Grid item xs={12} sm={6} md={3} key={member.nationalId}>
                   <Card>
                   <CardContent sx={{ textAlign: "center" }}>
                     <Typography variant="h5">{member.name}</Typography>
                     <Typography variant="h6">
                       {member.relation}
                     </Typography>
                     <Button
                       variant="contained"
                       color="primary"
                       sx={{ margin: 2}}

                     >
                       View More Details
                     </Button>

                     <Button
                       variant="contained"
                       color="primary"
                       onClick={() => 
                        navigate('/patient/family-members/dependent/prescriptions', { state: { nationalId: member.nationalId }}
                        )}
                     >
                       View Prescriptions
                     </Button>
                   </CardContent>
                 </Card>
               </Grid>
             ))}
           </Grid>
         </Box>
       </Box>
           </Box>
      )
      }
    </div>
    
  );
}

export default FamilyMembers;

 