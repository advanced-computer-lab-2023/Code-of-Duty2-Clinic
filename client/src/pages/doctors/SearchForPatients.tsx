import { useState } from 'react';
import '../../css/PatientSearchStyle.css';
import { config } from '../../utils/config';
import { useLocation } from 'react-router-dom';

const PatientSearch = () => {
  const [name, setName] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const doctorId = useLocation().pathname.split('/')[2];

  const handleSearch = async () => {
    try {
      const response = await fetch(`${config.serverUri}/doctors/${doctorId}/patients?patientName=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
        setError(null); // Clear any previous error messages
      } else if (response.status === 404) {
        setPatientData(null);
        setError('Patient not found');
        console.log('Patient not found');
      } else {
        setError('An error occurred during the search');
        console.error('An error occurred during the search');
      }
    } catch (error) {
      setError('An error occurred during the search');
      console.error('An error occurred during the search:', error);
    }
  };

  return (
    <div>
      <h2>Patient Search</h2>
      <div>
        <input
          type="text"
          placeholder="Enter patient's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error !== null && <div className="error">{error}</div>}
      {patientData && (
        <div>
          <h3>Search Results</h3>
          <pre>{JSON.stringify(patientData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
