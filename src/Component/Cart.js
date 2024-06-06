import React, { useContext } from "react";
import Items from "./Items";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { CartContext } from "./CartContext";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";
import "/ShoppingCart/addTocart/src/App.css";

const Cart = () => {
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

  const products = [
    {
      id: 1,
      title: "iPhone 11",
      description: "Green in Colour",
      price: "799.99",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
      quantity: 0,
      specs: [
        "6.1-inch Liquid Retina HD display",
        "A13 Bionic chip",
        "Dual 12MP Ultra Wide and Wide cameras",
        "Up to 17 hours of talk time",
        "64GB, 128GB, 256GB",
      ],
    },
    {
      id: 2,
      title: "iPhone 12",
      description: "Blue in Colour",
      price: "899.99",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
      quantity: 0,
      specs: [
        "6.1-inch Super Retina XDR display",
        "A14 Bionic chip",
        "Dual 12MP Ultra Wide and Wide cameras",
        "Up to 17 hours of talk time",
        "64GB, 128GB, 256GB",
      ],
    },
    {
      id: 3,
      title: "iPhone 13",
      description: "Blue in Colour",
      price: "999.99",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
      quantity: 0,
      specs: [
        "6.1-inch Super Retina XDR display",
        "A15 Bionic chip",
        "Dual 12MP Ultra Wide and Wide cameras",
        "Up to 19 hours of talk time",
        "128GB, 256GB, 512GB",
      ],
    },
    {
      id: 4,
      title: "iPhone 14 Pro Max",
      description: "Black in Colour",
      price: "999.99",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg",
      quantity: 0,
      specs: [
        "6.7-inch Super Retina XDR display with ProMotion",
        "A16 Bionic chip",
        "Triple 12MP Ultra Wide, Wide, and Telephoto cameras",
        "Up to 25 hours of talk time",
        "128GB, 256GB, 512GB, 1TB",
      ],
    },
    {
      id: 5,
      title: "iPhone 15 Plus",
      description: "Green in Colour",
      price: "999.99",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg",
      quantity: 0,
      specs: [
        "6.7-inch Super Retina XDR display",
        "A17 Bionic chip",
        "Dual 12MP Ultra Wide and Wide cameras",
        "Up to 26 hours of talk time",
        "3200mah Battery",
        "128GB, 256GB, 512GB",
      ],
    },
    {
      id: 6,
      title: "iPhone 15 Pro Max",
      description: "Titanium Colour",
      price: "1100.00",
      img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
      quantity: 0,
      specs: [
        "6.7-inch Super Retina XDR display with ProMotion",
        "A17 Bionic chip",
        "Triple 12MP Ultra Wide, Wide, and Telephoto cameras",
        "Up to 28 hours of talk time",
        "128GB, 256GB, 512GB, 1TB",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <section>
        <div className="text-center my-8">
          <div
            className="mt-24 text-4xl font-bold pb-5 text-blue-500  "
            style={{
              width: "86vw",
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <motion.span
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{
                whiteSpace: "nowrap",
                display: "inline-block",
                right: "100%",
              }}
            >
              Welcome to Our e-Commerce Website
            </motion.span>
          </div>
          <div className="flex flex-col text-xl italic">
            <p>
              "Browse through or curated selection of Apple’s flagship
              smartphones.
            </p>
            <p>
              Each iPhone offers cutting-edge technology, exceptional
              performance,
            </p>
            <p>
              and stunning design. Find the perfect iPhone that meets your
              needs."
            </p>
          </div>
        </div>
        <hr />
        <section className="my-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-sky-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text">
              IPhone Specifications
            </h2>
            <p className="text-lg mb-6">
              Discover the features and specifications of the latest iPhones.
              Each model is designed to offer the best user experience with
              state-of-the-art technology.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 rounded-lg shadow-lg w-96 overflow-hidden hover:bg-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-44 h-56 rounded ml-24"
                  />
                  <div className="p-4">
                    <h2 className="text-center text-xl font-bold text-gray-800">
                      {product.title}
                    </h2>
                    <ul className="ml-20 mt-2 text-gray-600">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="mt-1">
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <p className="text-center mt-4 text-lg font-semibold text-gray-800">
                      Price: ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr />
        <div className="flex justify-center">
          <div className="flex flex-col gap-1 p-1">
            <h1 className="font-bold text-4xl bg-gradient-to-r from-sky-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text h-12 pl-14">
              Shopping Cart
            </h1>
            <div className="overflow-hidden w-[24vw]">
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              >
                <p className="text-lg italic">
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
        <div className="flex justify-end p-3">
          <button
            className="font-bold text-lg border border-blue-600 rounded-full w-40 bg-gradient-to-r from-green-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text"
            onClick={() => {
              if (isAuthenticated) {
                handleAddToCart();
              } else {
                toast.error(
                  "You must sign up before adding items to the cart."
                );
              }
            }}
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="font-bold border border-green-500 text-lg rounded-full w-40 bg-gradient-to-r from-red-600 via-pink-700 to-red-950 inline-block text-transparent bg-clip-text"
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
        <hr />
        <div className="flex justify-center font-bold text-4xl bg-gradient-to-r from-sky-600 via-blue-700 to-purple-950 inline-block text-transparent bg-clip-text">
          Contact Form
        </div>
        <Modal show={showModal} onClose={closeModal} cartItems={cartItems} />
        <ContactForm />
      </section>
      <footer className="flex gap-4 items-center justify-center text-xl bg-gray-200 py-4 w-full h-18">
        <div className="items-center h-10 w-10">
          <img src="logo.jpg" alt="logo" className="rounded-full" />
        </div>
        Prakash@copyright 2024Ⓒ
      </footer>
    </>
  );
};

export default Cart;