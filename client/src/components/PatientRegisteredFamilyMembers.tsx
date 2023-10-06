import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import '@fontsource/roboto';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import '../css/PatientRegisteredFamilyMembers.css';

interface PatientRegisteredFamilyMembersProps {
    patient: {
        familyMembers: {
            name: string;
            relationship: string;
        }[];
    };
}

export default function PatientRegisteredFamilyMembers({
    patient,
}: PatientRegisteredFamilyMembersProps) {
    let familyMembers = patient.familyMembers;
    return (
        <div className = "container">
        <h1 className = "registeredHeader">Registered Family Members</h1>
        <Grid container spacing={6}>
           {
            familyMembers.map((familyMember: { name: string; relationship: string; }) => (
                <Grid item xs={3}>
                    <PatientCard name={familyMember.name} relationship={familyMember.relationship} />
                </Grid>
            ))
           }
        </Grid>
        </div>
    );
}



interface PatientCardProps {
    name: string;
    relationship: string;
}

function PatientCard({ name, relationship }: PatientCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                   {name}
                </Typography> 
                <Typography sx={{ mb: 1.5}} color="text.secondary">
                    {relationship}
                </Typography>
                <Button variant = "contained">View Information</Button>
            </CardContent>
        </Card>
    );
}