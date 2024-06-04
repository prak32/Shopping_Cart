import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRegisteredUser } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      // Save user to local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.username === username);

      if (userExists) {
        toast.error('User already exists', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        setRegisteredUser({ username, password });
        toast.success('Registered Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } else {
      toast.error('Please enter both username and password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
