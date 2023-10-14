import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/DoctorRegistrationRequestFormStyle.css';

interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: string;
  dateOfBirth: string;
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
}

const DoctorRegistrationRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    name: '',
    gender: '',
    mobileNumber: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
  });

  const [message, setMessage] = useState<string>(''); // Initialize the message state

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await fetch('http://localhost:4000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201 || response.status === 200) {
        console.log('Doctor registration request submitted successfully!');
        setMessage('Doctor registration request submitted successfully!');
        // setMessage(await response.json());
      } else {
        const data = await response.json();
        console.error('Doctor registration request submission failed');
        setMessage(data.error || 'Doctor registration request submission failed!');
        // setMessage(await response.json());
      }
    } catch (error) {
      console.error('An error occurred during submission', error);
      setMessage('An error occurred during submission:');
      // setMessage(await error.json());
    }

  };

  return (
    <div>
      <h2>Doctor Registration Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter Your Username"
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Your Password"
            required
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Your Full Name"
            required
          />
        </div>

        <div>
          <label>Gender: </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleInputChange(e)}
            required
            >
            <option value="choose your gender">choose your gender</option>  
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
        </div>

        <div>
          <label>Mobile Number: </label>
          <input
            type="number"
            name="mobileNumber"
            min = "0"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter Your Mobile Number"
            required
          />
        </div>

        <div>
          <label>Date of Birth: </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Hourly Rate: </label>
          <input
            type="number"
            name="hourlyRate"
            min = "0"
            value={formData.hourlyRate}
            onChange={handleInputChange}
            placeholder="Enter Your Hourly Rate"
            required
          />
        </div>

        <div>
          <label>Affiliation: </label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
            placeholder="Enter Your Affiliation"
            required
          />
        </div>

        <div>
          <label>Educational Background: </label>
          <input
            type="text"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleInputChange}
            placeholder="Enter Your Educational Background"
            required
          />
        </div>

        <div>
          <button type="submit">Submit Request</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default DoctorRegistrationRequestForm;
