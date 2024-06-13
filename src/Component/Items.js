// import React, { useContext, useState } from "react";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { FiMinusCircle } from "react-icons/fi";
// import { CartContext } from "./CartContext";
// import { motion } from "framer-motion";

// const Items = ({ id, title, description, price, img, quantity }) => {
//   const [flipped, setFlipped] = useState(false);
//   const [isRotating, setIsRotating] = useState(false);

//   const handleMouseEnter = () => {
//     setIsRotating(true);
//     setFlipped(true);
//   };

//   const handleMouseLeave = () => {
//     setIsRotating(false);
//     setFlipped(false);
//   };

//   const { incrementQuantity, decrementQuantity } = useContext(CartContext);

//   return (
//     <div>
//       <div className="pl-28">
//         <div className="ml-12">
//           <motion.div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             initial={{ rotateY: 0 }}
//             animate={{ rotateY: flipped ? 360 : 0 }}
//             transition={{
//               repeat: isRotating ? Infinity : 0,
//               duration: 3.5,
//             }}
//             style={{ perspective: "1000px" }}
//           >
//             <motion.img
//               className="h-52 w-40 rounded backface-hidden"
//               src={img}
//               alt={title}
//               style={{ display: flipped ? "none" : "block" }}
//             />
//             <motion.img
//               className="h-52 w-40 rounded backface-hidden"
//               src={img}
//               alt={title}
//               style={{
//                 display: flipped ? "block" : "none",
//                 backgroundColor: "lightcoral",
//               }}
//             />
//           </motion.div>
//         </div>
//         <div className="ml-20">
//           <h1 className="font-semibold w-24">{title}</h1>
//         </div>{" "}
//         <div className="pl-16">
//           <p className="text-lg font-semibold bg-gradient-to-r from-sky-500 via-red-600 to-purple-950 inline-block text-transparent bg-clip-text">
//             {description}
//           </p>
//         </div>
//         <div className="ml-12 p-3">
//           <p className="font-semibold italic border border-blue-400 rounded-full w-28 px-2 bg-red-300">
//             Price:${price}
//           </p>
//         </div>
//         <div className="flex gap-8 pl-14 text-xl items-center">
//           <button
//             onClick={() => decrementQuantity(id)}
//             className="bg-red-400 rounded-full text-white"
//           >
//             <FiMinusCircle />
//           </button>
//           <span>{quantity}</span>
//           <button
//             onClick={() => incrementQuantity(id)}
//             className="bg-green-400 rounded-full text-white"
//           >
//             <IoMdAddCircleOutline />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Items;
import React, { useContext, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";

const Items = ({ id, title, description, price, img, quantity }) => {
  const [flipped, setFlipped] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [decrementButtonColor, setDecrementButtonColor] = useState("");
  const [incrementButtonColor, setIncrementButtonColor] = useState("");

  const { incrementQuantity, decrementQuantity } = useContext(CartContext);

  const handleMouseEnter = () => {
    setIsRotating(true);
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsRotating(false);
    setFlipped(false);
  };

  const handleDecrement = () => {
    decrementQuantity(id);
    if (quantity > 1) {
      setDecrementButtonColor("bg-red-400 text-white");
      setIncrementButtonColor("");
    } else {
      setDecrementButtonColor("");
      setIncrementButtonColor("");
    }
  };

  const handleIncrement = () => {
    incrementQuantity(id);
    setIncrementButtonColor("bg-green-400 text-white");
    setDecrementButtonColor("");
  };

  return (
    <div>
      <div className="pl-28 md:pl-24" key={id}>
        <div className="ml-4 md:ml-12">
          <motion.div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: flipped ? 360 : 0 }}
            transition={{
              repeat: isRotating ? Infinity : 0,
              duration: 3.5,
            }}
            style={{ perspective: "1000px" }}
          >
            <motion.img
              className="h-48 w-40 md:h-52 md:w-44 rounded backface-hidden"
              src={img}
              alt={title}
              style={{ display: flipped ? "none" : "block" }}
            />
            <motion.img
              className="h-52 w-44 rounded backface-hidden"
              src={img}
              alt={title}
              style={{
                display: flipped ? "block" : "none",
                backgroundColor: "lightcoral",
              }}
            />
          </motion.div>
        </div>
        <div className="mt-2 pl-14 md:pl-24">
          <h1 className="font-semibold w-24 break-words text-center text-lg">
            {title}
          </h1>
        </div>
        <div className="overflow-hidden w-[40vw] md:w-[16vw]">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <div className="pl-12">
              <p className="text-sm md:text-lg font-semibold bg-gradient-to-r from-sky-500 via-red-600 to-purple-950 inline-block text-transparent bg-clip-text">
                {description}
              </p>
            </div>
          </motion.div>
        </div>
        <div className="ml-4 md:ml-14 p-3 pl-6">
          <p className="font-semibold italic border border-blue-400 rounded-full w-32 px-3 bg-gradient-to-r from-blue-300 via-pink-400 to-orange-600">
            Price:${price}
          </p>
        </div>
        <div className="flex gap-11 pl-10 md:pl-20 text-lg">
          <button
            onClick={handleDecrement}
            className={`${
              quantity === 0 ? "bg-white text-black" : decrementButtonColor
            } rounded-full h-6`}
          >
            <FiMinusCircle />
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrement}
            className={`${
              quantity === 0 ? "bg-white text-black" : incrementButtonColor
            } rounded-full h-6`}
          >
            <FiPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
