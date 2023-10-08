import CardGrid from "./CardGrid";


export default function PatientList({ patientList }: { patientList: any}) {
    return (
        <>
            <CardGrid title="Patients" primary="name" secondary="" list={patientList} buttonText="View Info" />
        </>
    );
}
