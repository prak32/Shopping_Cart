import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesComponent from './ParticlesComponent';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setIsAuthenticated(true);
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/cart');
      }, 3000); // Delay navigation to show the toast
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <ParticlesComponent />
      <div className="relative max-w-lg mx-auto p-8 bg-gray-600 shadow-md rounded-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-center h-10 text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
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
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
