// import React, { createContext, useState } from 'react';
// import { products } from './products';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [item, setItem] = useState(products);
//   const [showModal, setShowModal] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const incrementQuantity = (id) => {
//     const updatedItems = item.map((product) =>
//       product.id === id ? { ...product, quantity: product.quantity + 1 } : product
//     );
//     setItem(updatedItems);
//   };

//   const decrementQuantity = (id) => {
//     const updatedItems = item.map((product) =>
//       product.id === id && product.quantity > 0
//         ? { ...product, quantity: product.quantity - 1 }
//         : product
//     );
//     setItem(updatedItems);
//   };

//   const totalItemsInCart = item.reduce((total, product) => total + product.quantity, 0);

//   const handleCheckout = () => {
//     if (cartItems.length > 0) {
//       setShowModal(true);
//     } else {
//       alert('You have not added items in your cart');
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleAddToCart = () => {
//     const addedItems = item.filter((product) => product.quantity > 0);
//     setCartItems(addedItems);
//     if (addedItems.length > 0) {
//       alert(
//         `${addedItems.map((product) => product.title).join(', ')} ${
//           addedItems.length > 1 ? 'have' : 'has'
//         } been added to the cart`
//       );
//     } else {
//       alert('No items selected to add to the cart');
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         item,
//         showModal,
//         incrementQuantity,
//         decrementQuantity,
//         totalItemsInCart,
//         handleCheckout,
//         closeModal,
//         cartItems,
//         handleAddToCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useState } from 'react';
import { products } from './products';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [item, setItem] = useState(products);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { setIsAuthenticated } = useAuth(true);

  const incrementQuantity = (id) => {
    const updatedItems = item.map((product) =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setItem(updatedItems);
  };

  const decrementQuantity = (id) => {
    const updatedItems = item.map((product) =>
      product.id === id && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setItem(updatedItems);
  };

  const totalItemsInCart = item.reduce((total, product) => total + product.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowModal(true);
    } else {
      alert('You have not added items in your cart');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = () => {
    if (!setIsAuthenticated) {
      alert("You must sign up before adding items to the cart.");
      return;
    }

    const addedItems = item.filter((product) => product.quantity > 0);
    setCartItems(addedItems);
    if (addedItems.length > 0) {
      alert(
        `${addedItems.map((product) => product.title).join(', ')} ${
          addedItems.length > 1 ? 'have' : 'has'
        } been added to the cart`
      );
    } else {
      alert('No items selected to add to the cart');
    }
  };

  const addToCart = (product) => {
    const updatedItems = item.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setItem(updatedItems);

    const addedItems = updatedItems.filter((p) => p.quantity > 0);
    setCartItems(addedItems);

    alert(`${product.title} has been added to the cart`);
  };

  return (
    <CartContext.Provider
      value={{
        item,
        showModal,
        incrementQuantity,
        decrementQuantity,
        totalItemsInCart,
        handleCheckout,
        closeModal,
        cartItems,
        handleAddToCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};