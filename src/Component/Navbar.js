import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoMdCart, IoMdSearch } from 'react-icons/io';
import { CartContext } from './CartContext';
import ProductPopup from './ProductPopup';
import { useAuth } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { totalItemsInCart, item } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

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
      } else {
        toast.error('Product not found.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
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
    toast.success('LogOut Successfully.', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/cart');
    }, 3000);
  };

  return (
    <header className="bg-gray-100 py-4 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center h-10 w-10">
          <img src="logo.jpg" alt="logo" className='rounded-full'/>
        </div>
        <div className="relative flex flex-col">
          <div className="relative">
            <div className="absolute ml-1 mt-3 text-lg">
              <IoMdSearch />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-60 pl-6 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
          <ul className="flex gap-8 space-x-5 items-center text-xl">
            <li>
              <Link
                to="/home"
                className={`${location.pathname === '/home' ? 'text-blue-600' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className={`${location.pathname === '/product' ? 'text-blue-600' : ''}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${location.pathname === '/contact' ? 'text-blue-600' : ''}`}
              >
                Contact
              </Link>
            </li>
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
                  className="ml-8 text-sm bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
                >
                  LogIn
                </button>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-4 text-sm bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="text-sm bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              Sign Up
            </button>
          )}
        </nav>
      </div>
      {showPopup && selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
      <ToastContainer />
    </header>
  );
};

export default Navbar;
