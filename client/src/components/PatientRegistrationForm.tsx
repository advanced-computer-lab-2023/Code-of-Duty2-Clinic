import React, { useState } from 'react';
import { config } from '../utils/config';

const PatientRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    dateOfBirth: '',
    gender: 'male', // You can set the default gender as needed
    mobileNumber: '',
    emergencyContact: {
      fullname: '',
      mobileNumber: '',
      relationToPatient: '',
    },
    deliveryAddresses: [''], // You can initialize it with an empty string if needed
    healthRecords: [], // Initialize with an empty array
    subscribedPackage: {
      packageId: '',
      startDate: '',
      endDate: '',
      status: '', // You can set the default status as needed
    },
  });


  // Define separate state and handlers for the package fields
const [packageId, setPackageId] = useState('5f8a2b5c5f4c3d2a1b0e4f5d');
const [packageStartDate, setPackageStartDate] = useState('2002-05-12');
const [packageEndDate, setPackageEndDate] = useState('2002-04-12');
const [packageStatus, setPackageStatus] = useState('subscribed');

// Handling changes for the package fields
const handlePackageIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPackageId(e.target.value);
};

const handlePackageStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPackageStartDate(e.target.value);
};

const handlePackageEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPackageEndDate(e.target.value);
};

const handlePackageStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setPackageStatus(e.target.value);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      emergencyContact: {
        ...prevData.emergencyContact,
        [field]: value,
      },
    }));
  };

  const handleAddAddress = () => {
    setFormData({
      ...formData,
      deliveryAddresses: [...formData.deliveryAddresses, ''],
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAddresses = [...formData.deliveryAddresses];
    updatedAddresses[index] = e.target.value;
    setFormData({
      ...formData,
      deliveryAddresses: updatedAddresses,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send the patient registration data to the backend API
      const response = await fetch(`${config.serverUri}/patients/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Patient registered successfully');
        // You can redirect to another page or show a success message here
      } else {
        // Handle patient registration failure, show an error message, etc.
        console.error('Patient registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h1>Emergency Contact</h1>
  <label htmlFor="emergencyContact.fullname">Full Name:</label>
  <input
    type="text"
    id="emergencyContact.fullname"
    name="emergencyContact.fullname"
    value={formData.emergencyContact.fullname}
    onChange={(e) => handleEmergencyContactChange('fullname', e.target.value)}
    required
  />
</div>
<div>
  <label htmlFor="emergencyContact.mobileNumber">Mobile Number:</label>
  <input
    type="text"
    id="emergencyContact.mobileNumber"
    name="emergencyContact.mobileNumber"
    value={formData.emergencyContact.mobileNumber}
    onChange={(e) => handleEmergencyContactChange('mobileNumber', e.target.value)}
    required
  />
</div>
<div>
    <label htmlFor="emergencyContact.relationToPatient">Relation to Patient:</label>
    <input
      type="text"
      id="emergencyContact.relationToPatient"
      name="emergencyContact.relationToPatient"
      value={formData.emergencyContact.relationToPatient}
      onChange={(e) => handleEmergencyContactChange('relationToPatient', e.target.value)}
      required
    />
  </div>



        <div>
          <h3>Delivery Addresses</h3>
          {formData.deliveryAddresses.map((address, index) => (
            <div key={index}>
              <label htmlFor={`deliveryAddresses[${index}]`}>Address {index + 1}:</label>
              <input
                type="text"
                name={`deliveryAddresses[${index}]`}
                value={address}
                onChange={(e) => handleAddressChange(e, index)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAddress}>
            Add Address
          </button>
        </div>
        <div>
  <label htmlFor="subscribedPackage.packageId">Package ID:</label>
  <input
    type="text"
    id="subscribedPackage.packageId"
    name="subscribedPackage.packageId"
    value={packageId}
    onChange={handlePackageIdChange}
    required
  />
</div>
<div>
  <label htmlFor="subscribedPackage.startDate">Start Date:</label>
  <input
    type="date"
    id="subscribedPackage.startDate"
    name="subscribedPackage.startDate"
    value={packageStartDate}
    onChange={handlePackageStartDateChange}
    required
  />
</div>
<div>
  <label htmlFor="subscribedPackage.endDate">End Date:</label>
  <input
    type="date"
    id="subscribedPackage.endDate"
    name="subscribedPackage.endDate"
    value={packageEndDate}
    onChange={handlePackageEndDateChange}
    required
  />
</div>
<div>
  <label htmlFor="subscribedPackage.status">Status:</label>
  <select
    id="subscribedPackage.status"
    name="subscribedPackage.status"
    value={packageStatus}
    onChange={handlePackageStatusChange}
  >
    <option value="subscribed">Subscribed</option>
    <option value="unsubscribed">Unsubscribed</option>
    <option value="cancelled">Cancelled</option>
  </select>
</div>

        <button type="submit">Register Patient</button>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
