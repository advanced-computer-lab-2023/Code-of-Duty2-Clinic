
import { useState, useEffect } from "react";

const useGetPatientRegisteredFamilyMembers = () => {

    alert("Hooked!");
    const [familyMembers, setFamilyMembers] = useState([]);

    useEffect(() => {
        const getFamilyMembers = async () => {
            const familyMembersFromServer = await fetch("localhost:3000/patientRegisteredFamilyMembers/6522ecc0d7bb22bd72d51fef");
            const familyMembersFromServerJSON = await familyMembersFromServer.json();
            setFamilyMembers(familyMembersFromServerJSON);
        };

        getFamilyMembers();
    }, []);

   
    return familyMembers;
};

export default useGetPatientRegisteredFamilyMembers;