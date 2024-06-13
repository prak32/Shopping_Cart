import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesComponent from './ParticlesComponent';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRegisteredUser } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

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
          position: "top-right",
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
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <ParticlesComponent />
      <div className="relative max-w-lg mx-auto p-8 bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center h-10 text-white">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-blue-400 rounded-md placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-blue-400 rounded-md placeholder-gray-700"
          />
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
