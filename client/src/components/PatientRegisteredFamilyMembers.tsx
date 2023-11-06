import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography} from "@mui/material";
import axios from "axios";
import { config } from "../configuration";

export default function PatientRegisteredFamilyMembers() {

    const [patientFamilyMembers, setPatientFamilyMembers] = useState([]);

    

    useEffect(() => {
        const fetchFamilyMembers = async () => {
              await axios.get(`${config.serverUri}/patients/family-members`)
            .then (response => {
               setPatientFamilyMembers(response.data.members);
            })
        };
        fetchFamilyMembers();
    });

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

 function CardGrid ({title, list, primary, secondary, buttonText}: {title: string, primary: string, secondary: string, list: never[], buttonText: string}) {
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
