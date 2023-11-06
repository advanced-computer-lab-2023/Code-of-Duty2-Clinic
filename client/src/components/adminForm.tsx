// src/components/AdminForm.tsx

import React, { useState } from 'react';
// import './adminform.css';
import { config } from '../configuration';
import axios from 'axios';

interface FormData {
  username: string;
  password: string;
}

const AdminForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${config.serverUri}/admins/admin`, formData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
    <div className="admin-form-container">
      <h2 className="form-heading">Add Admin</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Admin</button>
      </form>
    </div>
  );
  
};

export default AdminForm;
