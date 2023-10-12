import React from 'react';
import CardGrid from './CardGrid';
interface Prescription {
    name: string;
    dosage: string;
}

interface PrescriptionListProps {
    prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
    return (
        <CardGrid title="Prescriptions" primary="name" secondary="dosage" buttonText="View More Info" list={prescriptions} />
    );
};

export default PrescriptionList;
