import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoMdCart, IoMdSearch, IoMdMenu, IoMdClose } from 'react-icons/io';
import { CartContext } from './CartContext';
import ProductPopup from './ProductPopup';
import { useAuth } from './AuthContext';
import { toast, ToastContainer} from 'react-toastify';
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

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className="fixed top-0 w-full z-10 bg-gray-100 py-2 shadow-md md:py-4 md:fixed md:top-0 md:w-full md:z-50">
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
              className="w-52 md:w-60 ml-4 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 md:ml-0 md:pl-10 md:py-2"
            />
            {searchQuery && (
              <button
                className="absolute top-1 left-48 text-gray-500 md:top-3 md:right-3"
                onClick={clearSearch}
              >
                <IoMdClose />
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-48 ml-6 mt-2 bg-white border border-gray-300 rounded-lg md:ml-1 md:z-10 md:w-60 md:mt-80">
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
        <nav className="hidden md:flex md:items-center">
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
              <button className="md:text-2xl md:ml-4 flex items-center">
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
              className="ml-4 text-xs bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 md:hover:shadow-xl md:text-sm"
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
      <nav className={`fixed top-0 right-0 w-44 h-80 bg-gray-100 shadow-md transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out md:hidden`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl">
          <IoMdClose />
        </button>
        <ul className="flex flex-col text-sm gap-4 p-4 mt-8">
          <li>
            <Link
              to="/home"
              onClick={toggleMenu}
              className={`${location.pathname === '/home' ? 'text-blue-600' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              onClick={toggleMenu}
              className={`${location.pathname === '/product' ? 'text-blue-600' : ''}`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className={`${location.pathname === '/contact' ? 'text-blue-600' : ''}`}
            >
              Contact
            </Link>
          </li>
          <li>
            <button className="text-lg md:text-2xl flex items-center">
              <IoMdCart />
              <span className="ml-2">{totalItemsInCart}</span>
            </button>
          </li>
          {!isAuthenticated && (
            <li>
              <button
                onClick={handleSignIn}
                className="text-xs bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-red-700 md:text-sm"
              >
                LogIn
              </button>
            </li>
          )}
        </ul>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-xs bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 md:text-sm"
          >
            LogOut
          </button>
        ) : (
          <button
            onClick={handleSignUp}
            className="text-xs bg-blue-600 text-white py-2 px-4 ml-4 rounded-full hover:bg-red-700 mt-4 md:mt-0 md:text-sm"
          >
            Sign Up
          </button>
        )}
      </nav>
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
