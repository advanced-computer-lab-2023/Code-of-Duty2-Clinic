import React, { useState } from "react";
// import './removeForm.css'; // Import the CSS file
import { config } from "../configuration";
import axios from "axios";

const UserRemovalForm: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleRemoveUser = async () => {
    await axios.delete(`${config.serverUri}/admins/users/${username}`);
  };

  return (
    <div className="user-removal-container">
      {" "}
      {/* Apply a container class */}
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
