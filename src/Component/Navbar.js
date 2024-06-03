// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowCircleRight } from 'react-icons/fa';
// import { IoMdCart, IoMdSearch } from 'react-icons/io';
// import { CartContext } from './CartContext';
// import ProductPopup from './ProductPopup';

// const Navbar = () => {
//   const { totalItemsInCart, item } = useContext(CartContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setNotFound(false); // Reset the not found message when the search query changes
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       const foundProduct = item.find(product => product.title.toLowerCase() === searchQuery.toLowerCase());
//       if (foundProduct) {
//         setSelectedProduct(foundProduct);
//         setShowPopup(true);
//         setNotFound(false);
//       } else {
//         setNotFound(true);
//         setShowPopup(false);
//       }
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setSelectedProduct(null);
//   };

//   const handleAddToCart = () => {
//     // Logic to add the selected product to the cart
//     // For example, you could call a context function to update the cart
//     handleClosePopup();
//   };

//   return (
//     <header className="bg-gray-100 py-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center px-4">
//         <div className="flex items-center gap-4">
//           <button className="text-4xl">
//             <FaArrowCircleRight />
//           </button>
//           {/* <h1 className="text-3xl font-semibold">Continue Shopping</h1> */}
//         </div>
//         <div className="relative flex">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onKeyDown={handleSearchKeyDown}
//             placeholder="Search products..."
//             className="w-60 pl-6 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//           <IoMdSearch className="absolute right-5 mt-3 text-lg text-gray-500" />
//         </div>
//         <nav>
//           <ul className="flex items-center gap-6 text-xl">
//             <li><Link to="/home" className="hover:text-gray-700">Home</Link></li>
//             <li><Link to="/product" className="hover:text-gray-700">Products</Link></li>
//             <li><Link to="/contact" className="hover:text-gray-700">Contact</Link></li>
//             <li>
//               <button className="text-2xl flex items-center">
//                 <IoMdCart />
//                 <span className="ml-2">{totalItemsInCart}</span>
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       {notFound && <div className="text-red-500 text-center mt-4">Product not found</div>}
//       {showPopup && selectedProduct && (
//         <ProductPopup 
//           product={selectedProduct} 
//           onClose={handleClosePopup} 
//           onAddToCart={handleAddToCart} 
//         />
//       )}
//     </header>
//   );
// };

// export default Navbar;
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import { IoMdCart, IoMdSearch } from 'react-icons/io';
import { CartContext } from './CartContext';
import ProductPopup from './ProductPopup';

const Navbar = () => {
  const { totalItemsInCart, item, isLoggedIn, setIsLoggedIn } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setNotFound(false); // Reset the not found message when the search query changes
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const foundProduct = item.find(product => product.title.toLowerCase() === searchQuery.toLowerCase());
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setShowPopup(true);
        setNotFound(false);
      } else {
        setNotFound(true);
        setShowPopup(false);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    // Logic to add the selected product to the cart
    // For example, you could call a context function to update the cart
    handleClosePopup();
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('You have been logged out.');
  };

  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <button className="text-4xl">
            <FaArrowCircleRight />
          </button>
          <h1 className="text-3xl font-semibold">Continue Shopping</h1>
        </div>
        <div className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search products..."
            className="w-60 pl-6 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <IoMdSearch className="absolute right-5 mt-3 text-lg text-gray-500" />
        </div>
        <nav className="flex items-center gap-12">
          <ul className="flex items-center gap-6 text-xl">
            <li><Link to="/home" className="hover:text-gray-700">Home</Link></li>
            <li><Link to="/product" className="hover:text-gray-700">Products</Link></li>
            <li><Link to="/contact" className="hover:text-gray-700">Contact</Link></li>
            <li>
              <button className="text-2xl flex items-center">
                <IoMdCart />
                <span className="ml-2">{totalItemsInCart}</span>
              </button>
            </li>
          </ul>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 text-lg bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="ml-4 text-lg bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
            >
              Sign Up
            </button>
          )}
        </nav>
      </div>
      {notFound && <div className="text-red-500 text-center mt-4">Product not found</div>}
      {showPopup && selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
    </header>
  );
};

export default Navbar;
