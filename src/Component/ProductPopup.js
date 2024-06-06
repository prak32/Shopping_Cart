import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const ProductPopup = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const {isAuthenticated} = useAuth();


  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 h-auto max-w-md mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-4">{product.title}</h2>
        <img src={product.img} alt={product.title} className="w-36 h-40 mb-2 mx-auto"/>
        <p className="justify-center font-semibold pb-4 bg-gradient-to-r from-sky-600 via-red-700 to-purple-900 inline-block text-transparent bg-clip-text">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => {
              if (isAuthenticated) {
                handleAddToCart();
              } else {
                toast.error("You must sign up before adding items to the cart.");
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
