import { Box, Grid, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { getPatientNameById } from "../../../utils/getPatientNameById";
import { ObjectId } from "mongoose";
import axios from "axios";
import { config } from "../../../configuration";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { RegisteredFamilyMember } from "../../../types";
import { useEffect, useState } from "react";


export default function PatientRegisteredFamilyMemberRequests() {

    type RegisteredFamilyMemberWithName = RegisteredFamilyMember & { name: string };
    const [requestsData, setRequestsData] = useState<RegisteredFamilyMemberWithName[]>([]);
    const queryClient = useQueryClient();


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${config.serverUri}/patients/family-members/requests`, { withCredentials: true });
                const requests: RegisteredFamilyMember[] = response.data;
                await fetchPatientNames(requests);
            } catch (error) {
                console.error('Failed to fetch requests:', error);
            }
        };

        fetchRequests();
    }, []);



    const fetchPatientNames = async (requests: RegisteredFamilyMember[]): Promise<RegisteredFamilyMemberWithName[]> => {
        const updatedRequests = await Promise.all(requests.map(async (request) => {
            const name = await getPatientNameById(request.id.toString());
            return {
                ...request,
                name,
            };
        }));
        setRequestsData(updatedRequests);
        return updatedRequests;
    };
    
    const acceptMutation = useMutation(
        async ({ id, relation }: { id: ObjectId, relation: string }) => {
          const familyMemberResponse = await axios.get(`${config.serverUri}/patients/${id}`, { withCredentials: true });
          const familyMember = familyMemberResponse.data;
          const email = familyMember.email;
          const mobile = familyMember.mobile;
      
          await axios.post(`${config.serverUri}/patients/family-members/registered`, { email, mobile, relation }, { withCredentials: true });
        },
        {
          onSuccess: async (data, variables) => {
            // Invalidate and refetch
            // Fetch the updated list of requests
        const response = await axios.get(`${config.serverUri}/patients/family-members/requests`, { withCredentials: true });
        const requests: RegisteredFamilyMember[] = response.data;
        await fetchPatientNames(requests);
        setRequestsData(prev => prev.filter(request => request.id !== variables.id));

          },
        }
      );
      
      const rejectMutation = useMutation(
        async (id: ObjectId) => {
          await axios.post(`${config.serverUri}/patients/family-members/requests/${id}/reject`, { withCredentials: true });
        },
        {
          onSuccess: async (data, variables) => {
            // Invalidate and refetch
            const response = await axios.get(`${config.serverUri}/patients/family-members/requests`, { withCredentials: true });
            const requests: RegisteredFamilyMember[] = response.data;
            await fetchPatientNames(requests);
            setRequestsData(prev => prev.filter(request => request.id !== variables));

          },
        }
      );
    
    const handleAccept = (id: ObjectId, relation: string) => {
      acceptMutation.mutate({ id, relation });
    };
    
    const handleReject = (id: ObjectId) => {
      rejectMutation.mutate(id);
    };

return (
    <Box>
        <Typography variant="h4" component="div" sx={{textAlign: 'center'}}>
            Family Member Requests
        </Typography>
        <Grid container spacing={2}>
            {requestsData?.map((request: RegisteredFamilyMemberWithName) => (
                <Grid item xs={12} sm={6} md={4} key={request.id.toString()}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {request.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                 your {request.relation.toLowerCase()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleAccept(request.id, request.relation)}>Accept</Button>
                            <Button size="small" onClick={() => handleReject(request.id)}>Reject</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
        )
    }

   
