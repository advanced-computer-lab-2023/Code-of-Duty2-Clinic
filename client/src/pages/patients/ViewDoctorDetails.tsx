import axios from "axios";
import { DoctorDetails } from "../../types";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { config } from "../../utils/config";
import { getFormattedDate } from "../../utils/formatter";


const ViewDoctorDetails:React.FC = () => {
    const [doctor, setDoctor] = useState<DoctorDetails>({} as DoctorDetails);
    const { patientId,doctorId } = useParams();
    const fetchDoctor = async () => {
        try {
          const response = await axios.get(`${config.serverUri}/patients/${patientId}/doctors/${doctorId}`);
          console.log(response)
          setDoctor(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    if(!doctor) return (<p>Loading... </p>)

    return (
        
        <div>
            <h1>View Doctor Details</h1>
            <ul>
                <li>
                    Name: {doctor?.name}
                </li>
                <li>
                    Speciality: {doctor?.speciality}
                </li>
                <li>
                    Session price: {doctor?.sessionPrice}
                </li>
                <li>
                    Email: {doctor?.email}
                </li>
                <li>
                    Mobile Number: {doctor?.mobileNumber}
                </li>
                <li>
                    Affiliation: {doctor?.affiliation}
                </li>
               <li>
                    Educational Background: {doctor?.educationalBackground}
               </li>
               <li>
                    <ul>
                        Available time slots:
                        {
                            doctor?.availableSlots&&
                            doctor?.availableSlots.map((slot:{startTime:string,endTime:string}, index) => (
                                <li key={index}>{getFormattedDate(slot.startTime)} to {getFormattedDate(slot.endTime)}</li>
                            ))
                        }
                    </ul>
               </li>
            </ul>
        </div>
    );
}

export default ViewDoctorDetails;