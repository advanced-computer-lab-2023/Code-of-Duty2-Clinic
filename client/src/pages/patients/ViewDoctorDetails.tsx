import axios from "axios";
import { DoctorDetails } from "../../types";
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


const ViewDoctorDetails:React.FC = () => {
    const [doctor, setDoctor] = useState<DoctorDetails>({} as DoctorDetails);

    const patientId = useLocation().pathname.split("/")[2];
    const doctorId = useLocation().pathname.split("/")[4];
    const fetchDoctor = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/patients/${patientId}/doctors/${doctorId}}`);
          setDoctor(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    return (
        <div>
            <h1>View Doctor Details</h1>
            <ul>
                <li>
                    Name: {doctor.name}
                </li>
                <li>
                    Speciality: {doctor.speciality}
                </li>
                <li>
                    Session price: {doctor.sessionPrice}
                </li>
                <li>
                    Email: {doctor.email}
                </li>
                <li>
                    Mobile Number: {doctor.mobileNumber}
                </li>
                <li>
                    Affiliation: {doctor.affiliation}
                </li>
               <li>
                    Educational Background: {doctor.educationalBackground}
               </li>
               <li>
                    <ul>
                        Available time slots:
                        {
                            doctor.availableSlots.map((slot, index) => (
                                <li key={index}>{slot.toDateString()}</li>
                            ))
                        }
                    </ul>
               </li>
            </ul>
        </div>
    );
}

export default ViewDoctorDetails;