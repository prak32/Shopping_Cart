// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Cart from './Component/Cart';
// // import { CartProvider } from './Component/CartContext';
// // import Login from './Component/Login';

// // const App = () => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
// //         <Route 
// //           path="/cart" 
// //           element={isAuthenticated ? (
// //             <CartProvider>
// //               <Cart />
// //             </CartProvider>
// //           ) : (
// //             <Navigate to="/login" />
// //           )}
// //         />
// //         <Route path="/" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './Component/AuthContext';
// import Registration from './Component/Registration';
// import Login from './Component/Login';
// import Home from './Component/Home';
// import Cart from './Component/Cart';
// import { CartProvider } from './Component/CartContext';
// import Product from './Component/Product';

// const App = () => {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <Routes>
//             <Route path="/register" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/product" element={<Product/>}/>
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/" element={<Navigate to="/register" />} />
//           </Routes>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Component/AuthContext';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Home from './Component/Home';
import Cart from './Component/Cart';
import { CartProvider } from './Component/CartContext';
import Product from './Component/Product';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
