import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function PatientRegisteredFamilyMembers() {

    const patientId = useLocation().pathname.split('/')[2];    
    const [patientFamilyMembers, setPatientFamilyMembers] = useState([]);

    

    useEffect(() => {
        const fetchFamilyMembers = async () => {
              await axios.get(`${import.meta.env.VITE_SERVER_URI}/patients/${patientId}/family-members`)
            // await axios.get(`http://localhost:3000/api/patients/${patientId}/family-members`)
            .then (response => {
               setPatientFamilyMembers(response.data.members);
            })
        };
        fetchFamilyMembers();
    }, []);

    return (
        <>
            <CardGrid
                title="Registered Family Members"
                list={patientFamilyMembers}
                primary="name"
                secondary="relation"
                buttonText="View"
            />
        </>
    );
}

 function CardGrid ({title, list, primary, secondary, buttonText}: {title: string, primary: string, secondary: string, list: any, buttonText: string}) {
    return (
        <>
        <div className='gridTitle'>
        <h1 className='gridTitleText'>{title}</h1>
        </div>
        <div className="container">
            <Grid container spacing={3}>
                {list.map((listItem: { [key: string]: string }) => (
                    <Grid item xs={3}>
                        <CardGridCard primary={listItem[primary]} secondary={listItem[secondary]} buttonText={buttonText}  buttonLink={`/patient-info/${listItem._id}`} />
                    </Grid>
                ))}
            </Grid>
        </div>
        </>
    );
}


function CardGridCard ({primary, secondary}: { primary: string, secondary: string, buttonText: string, buttonLink: string}) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                   {primary}
                </Typography> 
                <Typography sx={{ mb: 1.5}} color="text.secondary">
                    {secondary}
                </Typography>
            </CardContent>
        </Card>
    );
}
