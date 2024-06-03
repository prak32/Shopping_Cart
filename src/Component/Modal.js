import React from 'react';

const Modal = ({ show, onClose, cartItems }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-2/3">
        <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between mb-2">
                <div className="w-24 h-24">
                  <img src={item.img} alt={item.title} className="object-cover w-14 h-18 hover:border rounded" />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold mr-10">Price: ${item.price}</span>
                  <span className="font-semibold mr-16">Quantity: {item.quantity}</span>
                  <span className='font-semibold'>Total Price: ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
