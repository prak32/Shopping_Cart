import React, { useState } from 'react';

const Modal = ({ show, onClose, cartItems }) => {
  const [orderFormVisible, setOrderFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    const { name, address, phoneNumber } = formData;

    if (!name || !address || !phoneNumber) {
      setToast({ show: true, message: 'All fields are required!', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 1000);
      return;
    }
    setOrderFormVisible(true);
    setToast({ show: true, message: 'Payment Successful!', type: 'success' });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2000);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 md:w-2/3">
        <h2 className="text-lg md:text-2xl font-bold mb-4">Cart Details</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between mb-2">
                <div className="w-24 h-24">
                  <img src={item.img} alt={item.title} className="object-cover w-14 h-18 hover:border rounded" />
                </div>
                <div className="flex-1 flex-col gap-2 md:gap-2 md:flex-1 md:ml-4">
                  <h3 className="font-semibold text-sm md:text-lg">{item.title}</h3>
                  <p className='text-sm md:text-lg'>{item.description}</p>
                </div>
                <div className="flex flex-col ml-6 w-44 text-sm md:text-lg">
                  <h1 className="font-semibold">Price: ${item.price}</h1>
                  <h1 className="font-semibold">Quantity: {item.quantity}</h1>
                  <h1 className='font-semibold'>Total Price: ${(item.price * item.quantity).toFixed(2)}</h1>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className='flex justify-end mr-8'>
          <div className="flex gap-5 mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => setOrderFormVisible(true)}
            >
              Order
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {orderFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-2/3 relative">
            <h2 className="text-2xl font-bold mb-4">Order Form</h2>
            {toast.show && (
              <div className={`absolute top-0 mt-14 ml-16 w-40 px-4 py-2 rounded text-xs text-center md:text-lg md:ml-96 md:w-60 md:text-center md:mt-4 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                {toast.message}
              </div>
            )}
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleFormSubmit}
              >
                Pay with e-Wallet
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
                onClick={() => setOrderFormVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
