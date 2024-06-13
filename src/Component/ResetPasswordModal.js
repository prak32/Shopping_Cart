import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPasswordModal = ({ setShowResetModal }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match', {
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

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
      toast.error('User not found', {
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

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    toast.success('Password reset successful!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      setShowResetModal(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-80 p-3 border border-blue-400 rounded-md placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-80 p-3 border border-blue-400 rounded-md placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-80 p-3 border border-blue-400 rounded-md placeholder-gray-700"
          />
          <button type="submit" className="ml-20 w-44 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800">
            Reset Password
          </button>
          <button
            type="button"
            className="w-44 ml-20 bg-red-700 text-white py-2 rounded-md hover:bg-red-800 mt-2"
            onClick={() => setShowResetModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
