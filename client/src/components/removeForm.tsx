import React, { useState } from 'react';
import './removeForm.css'; // Import the CSS file
import { config } from '../utils/config';

const UserRemovalForm: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleRemoveUser = () => {
    // Send a DELETE request to the backend to remove the user
    fetch(`${config.serverUri}/admins/users/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`User with username ${username} removed successfully.`);
          // Add any additional handling or feedback here
        } else {
          console.error('User removal failed.');
          // Handle removal failure or show an error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network errors
      });
  };

    return (
        <div className="user-removal-container"> {/* Apply a container class */}
          <h2>Remove User</h2>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="form-input"
              required
            />
          </div>
          <button onClick={handleRemoveUser} className="submit-button">
            Remove User
          </button>
        </div>
      ); 
};

export default UserRemovalForm;