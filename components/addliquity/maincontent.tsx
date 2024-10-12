"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function MainContent() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("0.00");
  const [selectedDistribution, setSelectedDistribution] = useState("ascend");
  const [sliderValue, setSliderValue] = useState(50);
  const [maxPrice, setMaxPrice] = useState("6.23489");
  const [limitPerUser, setLimitPerUser] = useState("0.00")
  const [buyingPrice, setBuyingPrice] = useState("10")
  const [endPrice, setEndPrice] = useState("90")
  const [days, setDays] = useState("00")
  const [hours, setHours] = useState("00")
  const [minutes, setMinutes] = useState("00")

  const inputVariants = {
    focus: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 10 } },
    blur: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } }
  }

  const distributionOptions = [
    { id: "ascending", label: "Ascending", chart: [1, 2, 3, 4, 5, 6, 7, 8,9] },
    { id: "descending", label: "Descending", chart: [9,8, 7, 6, 5, 4, 3, 2, 1] },
    { id: "continuum", label: "Continuum", chart: [9, 9, 9, 9, 9, 9, 9, 9,9] },
  ];

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMaxPrice(value);
    }
  };
  const incrementMaxPrice = () => {
    setMaxPrice((prev) => (parseFloat(prev) + 0.00001).toFixed(5));
  };

  const decrementMaxPrice = () => {
    setMaxPrice((prev) => Math.max(0, parseFloat(prev) - 0.00001).toFixed(5));
  };
  const isFormComplete = () => {
    return (
      amount !== "0.00" &&
      selectedDistribution !== "" &&
      sliderValue !== 0 &&
      maxPrice !== ""
    );
  };
  return (
    <div className=" text-white p-6  max-w-3xl mt-10 mx-auto">
      <div className="flex justify-between items-center mb-12">
        <motion.button
          className="flex items-center text-xs text-slate-400"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={20} className="mr-2 bg-black" />
          Back
        </motion.button>
        <motion.button
          className="px-2 py-1 rounded-lg border border-[#353434] bg-black"
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className="px-4 py-2 font-bold rounded-lg border border-teal-400 text-teal-400"
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Launchpad Pool
          </motion.button>
        </motion.button>
      </div>

      <div className="space-y-6 bg-[#121212] bg-transparent-40 text-white p-6 rounded-lg">
        <div>
          <h2 className="text-xs font-medium mb-2">Amount to be added</h2>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#121212] border border-gray-700 rounded p-6 focus:outline-none focus:border-cyan-500"
            />
            <div className="absolute right-3 top-1/2 flex flex-row gap-2 transform -translate-y-1/2 text-[10px] ">
            <span className="mr-1 text-gray-500 mt-5">   Wallet balance: 100 NIT </span>
              <div className='flex flex-col '>
              <img src='/images/Capture.PNG' className='h-4 w-4 mb-1' alt='logo' />
              <span className=" text-cyan-500 font-bold">    MAX</span>
                </div> 
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-medium">
              Select distribution <br /> structure
            </h2>
            <motion.a
  href="#"
  className="group flex items-center text-xs font-medium"
  whileHover={{ scale: 1.05 }}
>
  <span className="text-teal-400 group-hover:text-teal-600 hover:underline transition-colors duration-200">
   Leran More
  </span>

  <svg className="inline ml-1 text-teal-400 group-hover:text-teal-600 transition-colors duration-200" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H18C18.4142 5.25 18.75 5.58579 18.75 6V15C18.75 15.4142 18.4142 15.75 18 15.75C17.5858 15.75 17.25 15.4142 17.25 15V7.81066L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L16.1893 6.75H9Z" fill="#2dd4bf"></path> </g></svg>
</motion.a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {distributionOptions.map((option) => (
              <motion.div
                key={option.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedDistribution === option.id
                    ? "border-2 border-cyan-500"
                    : "border border-gray-700"
                }`}
                onClick={() => setSelectedDistribution(option.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-20 flex items-end justify-between">
                  {option.chart.map((value, index) => (
                    <motion.div
                      key={index}
                      className="w-4 rounded bg-gradient-to-t  from-cyan-300 to-cyan-500"
                      initial={{ height: 0 }}
                      animate={{ height: `${value * 10}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
                    />
                  ))}
                </div>
                <p className="text-center mt-2 text-sm">{option.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold mb-2">Set distribution range</h2>
         
          <div className="flex justify-between w-full space-x-4">
          <div className="flex flex-col items-center ">
          <p className="text-xs text-white text-center mb-2">
            Starting price: 2.687 USDC per NIT
          </p>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700"
            />
               </div>
            <div className="bg-black rounded px-2 py-2 flex justify-between items-center space-x-2 gap-2">
              <button     onClick={incrementMaxPrice} className=" text-xl text-white bg-black rounded-full p-1">+</button>
            <div className="flex flex-col items-center ">
              <span className="text-gray-500 text-xs">Max Price</span>
              <input
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="w-24 bg-black focus:outline-none text-right"
              />
               </div>
               <button  onClick={decrementMaxPrice} className=" text-xl text-white bg-black rounded-full p-1">-</button>
            </div>
          </div>
        </div>


        <motion.button
         className={`relative w-full py-4 px-8 text-white font-medium text-lg rounded-lg overflow-hidden group ${
          !isFormComplete() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        whileHover={isFormComplete() ? { scale: 1.02 } : {}}
        whileTap={isFormComplete() ? { scale: 0.98 } : {}}
        disabled={!isFormComplete()}
        onClick={onOpen}
        >
          {/* Border */}
          <span className="absolute inset-0 w-full h-full border-2 border-[#00ffff] rounded-lg"></span>

          {/* Gradient backgrounds */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out transform group-hover:scale-105"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffff] to-[#0080ff] transition-all duration-300 ease-out transform scale-105 group-hover:scale-100"></span>

          {/* Button content */}
          <span className="relative flex items-center justify-center">
            <span className="mr-4">Add Liquidity</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 ease-out transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </motion.button>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-black p-3">
          {(onClose) => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-white text-sm font-semibold">LP</h2>
              <button onClick={onClose} className="text-gray-400  hover:text-white">
                <X size={20} />
              </button>
            </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="limitPerUser" className="block text-xs font-medium mt-4 mb-2">
            Limit per user
          </label>
          <motion.div variants={inputVariants} whileFocus="focus" initial="blur" animate="blur">
        <div className="relative w-full">
  <input
    id="limitPerUser"
    type="number"
    value={limitPerUser}
    onChange={(e) => setLimitPerUser(e.target.value)}
    className="bg-[#121212] border border-slate-800 p-6 pr-12 rounded w-full outline-none focus:outline-none focus:ring-2 focus:ring-[#00ffff] placeholder-gray-500"
  />
  <img
    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
    alt="Input icon"
    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
  />
</div>
          </motion.div>
        </div>

        <div>
          <h3 className="text-xs mb-2">Allocation weight</h3>
          <div className="bg-[#121212] border border-gray-700 rounded-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-xs text-gray-400 font-normal py-2 px-4 border-r border-gray-700">Buying price</th>
                  <th className="text-left text-xs text-gray-400 font-normal py-2 px-4">End price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-r border-gray-700">{buyingPrice}%</td>
                  <td className="py-2 px-4">{endPrice}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xs mb-2">Duration</h3>
          <div className="bg-[#121212] border border-gray-700 rounded-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-xs text-gray-400 font-normal py-2 px-4 border-r border-gray-700">Days</th>
                  <th className="text-left text-xs text-gray-400 font-normal py-2 px-4 border-r border-gray-700">Hours</th>
                  <th className="text-left text-xs text-gray-400 font-normal py-2 px-4">Minutes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-r border-gray-700">{days}</td>
                  <td className="py-2 px-4 border-r border-gray-700">{hours}</td>
                  <td className="py-2 px-4">{minutes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
     
          <motion.button
         className={`relative w-full py-4 px-8 text-white font-medium text-lg rounded-lg overflow-hidden group`}
  
        onClick={onOpen}
        >
          {/* Border */}
          <span className="absolute inset-0 w-full h-full border-2 border-[#00ffff] rounded-lg"></span>

          {/* Gradient backgrounds */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out transform group-hover:scale-105"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffff] to-[#0080ff] transition-all duration-300 ease-out transform scale-105 group-hover:scale-100"></span>

          {/* Button content */}
          <span className="relative flex items-center justify-center">
            <span className="mr-4">  Start LP</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 ease-out transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </motion.button>
        </motion.div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
          )}
        </ModalContent>
      </Modal>
        {!isFormComplete() && (
  <p className="text-red-500 text-sm mt-2 text-center">
    {amount === "0.00"
      ? "Please enter an amount to add"
      : selectedDistribution === ""
      ? "Please select a distribution structure"
      : sliderValue === 0
      ? "Please set a distribution range"
      : maxPrice === ""
      ? "Please enter a valid max price"
      : ""}
  </p>
)}
      </div>
    </div>
  );
}
