import { Paper, Stack } from '@mui/material';
import '../css/PatientInfo.css';

export default function PatientInfo({name, dob, email, gender, mobile}: {name: string, dob: string, email: string, gender: string, mobile: string}) {
    return (
        <div className="patientInfo">
        <h1 className="patientInfoPageTitle">Patient Info</h1>
        <Stack spacing={2}>
          {/* <PatientInfoCard */}
           name="Omar"
           
           {/* /> */}
        </Stack>
        </div>
    );
}


function PatientInfoCard({name, dob, email, gender, mobile}: {name: string, dob: string, email: string, gender: string, mobile: string}) {
    return (
    <Paper elevation={2} className="patientInfoCard"> 

        <h1 className='patientInfoTitle'> Personal Information </h1>
       <h3>Name: {name}</h3>
       <h3>Date of Birth: </h3>
       <h3> Email: </h3>
       <h3>Gender: </h3>
       <h3>Mobile Number: </h3>
       


    </Paper>
    );
}
