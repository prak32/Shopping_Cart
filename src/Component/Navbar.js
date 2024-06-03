import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import { IoMdCart, IoMdSearch } from 'react-icons/io';
import { CartContext } from './CartContext';
import ProductPopup from './ProductPopup';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { totalItemsInCart, item } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setNotFound(false); // Reset the not found message when the search query changes

    if (query.toLowerCase().includes('iphone')) {
      const filteredSuggestions = item.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
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
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSelectedProduct(suggestion);
    setShowPopup(true);
    setSuggestions([]);
    setNotFound(false);
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

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    alert('You have been logged out.');
  };

  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <button className="text-4xl">
            <FaArrowCircleRight />
          </button>
        </div>
        <div className="relative flex flex-col">
          <div className="relative">
          <div className="absolute ml-1 mt-3 text-lg">
            <IoMdSearch/>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-60 pl-6 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* <IoMdSearch className="absolute right-5 mt-3 text-lg text-gray-500" /> */}
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-60 bg-white border border-gray-300 rounded-lg mt-1">
              {suggestions.map(suggestion => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
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
            {!isAuthenticated && (
              <li>
                <button
                  onClick={handleSignIn}
                  className="ml-8 text-lg bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
                >
                  LogIn
                </button>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-4 text-lg bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="ml-4 text-lg bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
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
