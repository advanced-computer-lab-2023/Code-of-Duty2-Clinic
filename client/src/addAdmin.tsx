import React, { useState } from 'react';

interface AdminFormProps {
  onAddAdmin: (username: string, password: string) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onAddAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAddAdmin = () => {
    // Call the onAddAdmin prop function to pass the username and password
    onAddAdmin(username, password);

    // Clear the form fields after adding admin (you can modify this behavior as needed)
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Add Admin</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <button onClick={handleAddAdmin}>Add Admin</button>
      </div>
    </div>
  );
};

export default AdminForm;
