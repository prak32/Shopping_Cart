import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoMdCart, IoMdSearch, IoMdMenu } from 'react-icons/io';
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-100 py-2 shadow-md md:py-4 md:fixed md:top-0 md:w-full md:z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center h-7 w-7 md:h-10 md:w-10">
          <img src="logo.jpg" alt="logo" className='rounded-full'/>
        </div>
        <div className="relative flex-1 md:flex md:items-center md:justify-center">
          <div className="relative w-full md:w-60">
            <div className="absolute ml-5 mt-2 md:ml-1 md:mt-3 md:text-lg">
              <IoMdSearch />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-60 ml-4 h-8 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 md:w-full md:ml-0 md:pl-10"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full md:w-60 bg-white border border-gray-300 rounded-lg mt-1">
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
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            <IoMdMenu />
          </button>
        </div>
        <nav className={`md:flex md:items-center ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col text-sm md:flex-row gap-1 md:gap-8 space-y-4 md:space-y-0 items-center md:text-xl mt-4 md:mt-0">
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
              <button className="md:text-2xl flex items-center">
                <IoMdCart />
                <span className="ml-2">{totalItemsInCart}</span>
              </button>
            </li>
            {!isAuthenticated && (
              <li>
                <button
                  onClick={handleSignIn}
                  className="ml-4 text-xs bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700 md:text-sm"
                >
                  LogIn
                </button>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-4 text-xs bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 md:text-sm"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="ml-5 text-xs bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700 mt-4 md:mt-0 md:ml-3 md:text-sm"
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
