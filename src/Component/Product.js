import React, { useContext } from "react";
import Items from "./Items";
import { motion } from "framer-motion";
import { CartContext } from "./CartContext";
import Modal from "./Modal";
import Navbar from "./Navbar";
import { useAuth } from './AuthContext';
import { toast } from "react-toastify";

const Product = () => {
  const {
    item,
    handleCheckout,
    handleAddToCart,
    totalItemsInCart,
    showModal,
    closeModal,
    cartItems,
  } = useContext(CartContext);

  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar />
      <section className="my-8">
        <div className="flex justify-center">
          <div className="flex flex-col gap-1 p-1">
            <h1 className="mt-6 md:mt-14 font-bold text-2xl md:text-4xl bg-gradient-to-r from-sky-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text h-12 pl-4 md:pl-14">
              Products for Shopping
            </h1>
            <div className="overflow-hidden w-[58vw] md:w-[24vw]">
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                <p className="text-md md:text-md italic">
                  You have{" "}
                  <span className="font-semibold">{totalItemsInCart}</span>{" "}
                  items in your shopping cart
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {item.map((curItem) => (
            <Items
              key={curItem.id}
              id={curItem.id}
              title={curItem.title}
              description={curItem.description}
              price={curItem.price}
              img={curItem.img}
              quantity={curItem.quantity}
            />
          ))}
        </div>
      </section>
      <hr />
      <footer>
        <div className="flex justify-end p-3">
          <button
            className="font-bold text-md md:text-lg border border-blue-600 rounded-full w-36 md:w-40 bg-gradient-to-r from-green-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text"
            onClick={() => {
              if (isAuthenticated) {
                handleAddToCart();
              } else {
                toast.error("You must sign up before adding items to the cart.");
              }
            }}
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="font-bold border border-green-500 text-md md:text-lg rounded-full w-36 md:w-40 bg-gradient-to-r from-red-600 via-pink-700 to-red-950 inline-block text-transparent bg-clip-text"
            onClick={() => {
              if (isAuthenticated) {
                handleCheckout();
              } else {
                toast.error("You must sign up before checking out.");
              }
            }}
          >
            CHECKOUT
          </button>
        </div>
      </footer>
      <Modal show={showModal} onClose={closeModal} cartItems={cartItems} />
    </div>
  );
};

export default Product;
