import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRegisteredUser } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      setRegisteredUser({ username, password });
      navigate('/login');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400">
      <div className="max-w-md mx-auto p-6 bg-purple-400 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center h-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-600 to-blue-900">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:border">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
