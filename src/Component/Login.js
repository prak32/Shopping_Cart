// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setIsAuthenticated }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   // Predefined username and password
//   const savedUsername = 'Prakash';
//   const savedPassword = 'Pr@k1234';

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === savedUsername && password === savedPassword) {
//       setIsAuthenticated(true);
//       navigate('/cart');
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400">
//       <div className="max-w-md mx-auto p-6 bg-purple-400 shadow-md rounded-lg">
//         <h2 className="text-3xl font-bold mb-4 text-center h-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-600 to-blue-900">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md "
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:border">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, registeredUser,isAuthenticated } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
      setIsAuthenticated(true);
      navigate('/cart');

    }
    else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400">
      <div className="max-w-md mx-auto p-6 bg-purple-400 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center h-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-600 to-blue-900">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
