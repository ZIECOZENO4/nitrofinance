"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowLeft } from "lucide-react"
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { Search, X } from "lucide-react"
import { useRouter } from 'next/navigation'

interface Token {
    name: string;
    fullName: string;
    balance: string;
    icon: string;
  }

const tokens: Token[] = [
  { name: "ETH", fullName: "Ethereum", balance: "0.00012", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "MONAD", fullName: "Monad", balance: "0.0000", icon: "/images/circle.PNG" },
  { name: "KAN", fullName: "Kannon", balance: "0.0000", icon: "/images/Capture.PNG" },
  { name: "USDC", fullName: "USD Coin", balance: "119.000", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png" },
];

export default function MainContent() {
  const router = useRouter();
  const [activePrice, setActivePrice] = useState("0.0");
  const [selectedTab, setSelectedTab] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [baseToken, setBaseToken] = useState<Token | null>(null);
  const [quoteToken, setQuoteToken] = useState<Token | null>(null);
  const [isSelectingBase, setIsSelectingBase] = useState(true);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    if (isSelectingBase) {
      setBaseToken(token);
    } else {
      if (token.name !== baseToken?.name) {
        setQuoteToken(token);
      } else {
        // Show an error message or handle this case
        console.error("Quote token must be different from base token");
      }
    }
    onClose();
  };
  
  const openTokenModal = (isBase: boolean) => {
    setIsSelectingBase(isBase);
    onOpen();
  };

  const presets = [
    { percentage: "0.25%", fee: "0.3%" },
    { percentage: "0.5%", fee: "1%" },
    { percentage: "0.15%", fee: "0.5%" },
  ]

  const isFormComplete = () => {
    return baseToken && quoteToken && baseToken !== quoteToken && activePrice !== "0.0" && activePrice !== "";
  };
  return (
    <div className=" text-white p-6  max-w-3xl mt-10 mx-auto">
      <div className="flex justify-between items-center mb-12">
        <motion.button
          className="flex items-center text-xs text-slate-400"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
        >
          <ArrowLeft size={20} className="mr-2 bg-black" />
          Back
        </motion.button>
        <motion.button
          className="px-2 py-1 rounded-lg border border-[#353434] bg-black"
    
          whileTap={{ scale: 0.95 }}
        >
        <motion.button
          className="px-4 py-2 font-bold rounded-lg border border-purple-400 text-purple-400"
          whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          Launchpad Pool
        </motion.button>
        </motion.button>
      </div>

      <div className="space-y-6 bg-[#121212] bg-transparent-40 text-white p-6 rounded-lg">
   
        <div>
          <label className="block mb-2 text-xs font-medium">Select base asset</label>
          <motion.div
            className="bg-[#121212] border border-slate-800 py-4 px-6 rounded flex justify-between items-center cursor-pointer"
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpen}
          >
           <span className="flex text-xs items-center">
              {baseToken ? (
                <>
                  <img src={baseToken.icon} alt={baseToken.name} className="w-6 h-6 mr-2" />
                  {baseToken.name}
                </>
              ) : (
                'Select Token'
              )}
            </span>
            <ChevronDown size={20} />
          </motion.div>
        </div>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-black">
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
              <h2 className="text-white text-sm font-semibold">Select token</h2>
              <button onClick={onClose} className="text-gray-400  hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search token or paste address"
                  className="w-full   rounded-md py-2 pl-10 pr-4   text-gray-400 bg-[#121212] border border-slate-800 p-6  outline-none focus:outline-none focus:ring-2 focus:ring-[#00ffff] placeholder-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 " size={20} />
              </div>
              <div className="mt-4 space-y-2">
                <AnimatePresence>
                  {filteredTokens.map((token) => (
                    <motion.div
                      key={token.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-2 hover:bg-[#121212] rounded-md cursor-pointer"
                      onClick={() => handleTokenSelect(token)}
                    >
                      <div className="flex items-center">
                        <img src={token.icon} alt={token.name} className="w-8 h-8 mr-3" />
                        <div>
                          <div className="text-white font-medium text-xs">{token.name}</div>
                          <div className="text-gray-400 text-[8px]">{token.fullName}</div>
                        </div>
                      </div>
                      <div className="text-white text-xs">{token.balance}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
          )}
        </ModalContent>
      </Modal>
      <div>
  <label className="block mb-2 text-xs font-medium">Select quote asset</label>
  <motion.div
    className="bg-[#121212] border border-slate-800 py-4 px-6 rounded flex justify-between items-center cursor-pointer"
    whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => openTokenModal(false)}
  >
    <span className="flex text-xs items-center">
      {quoteToken ? (
        <>
          <img src={quoteToken.icon} alt={quoteToken.name} className="w-6 h-6 mr-2" />
          {quoteToken.name}
        </>
      ) : (
        'Select Token'
      )}
    </span>
    <ChevronDown size={20} />
  </motion.div>
</div>

<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
  <ModalContent className="bg-black">
    {(onClose) => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-white text-sm font-semibold">Select quote token</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search token or paste address"
                  className="w-full rounded-md py-2 pl-10 pr-4 text-gray-400 bg-[#121212] border border-slate-800 p-6 outline-none focus:outline-none focus:ring-2 focus:ring-[#00ffff] placeholder-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5" size={20} />
              </div>
              <div className="mt-4 space-y-2">
                <AnimatePresence>
                  {filteredTokens
                    .filter(token => token.name !== baseToken?.name)
                    .map((token) => (
                      <motion.div
                        key={token.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-2 hover:bg-[#121212] rounded-md cursor-pointer"
                        onClick={() => handleTokenSelect(token)}
                      >
                        <div className="flex items-center">
                          <img src={token.icon} alt={token.name} className="w-8 h-8 mr-3" />
                          <div>
                            <div className="text-white font-medium text-xs">{token.name}</div>
                            <div className="text-gray-400 text-[8px]">{token.fullName}</div>
                          </div>
                        </div>
                        <div className="text-white text-xs">{token.balance}</div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )}
  </ModalContent>
</Modal>
        <div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <label className="text-xs ">Preset</label>
     <motion.a
  href="#"
  className="group flex items-center text-xs font-medium"
  whileHover={{ scale: 1.05 }}
>
  <span className="text-purple-400 group-hover:text-purple-600 hover:underline transition-colors duration-200">
    Request for custom
  </span>

  <svg className="inline ml-1 text-purple-400 group-hover:text-purple-600 transition-colors duration-200" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H18C18.4142 5.25 18.75 5.58579 18.75 6V15C18.75 15.4142 18.4142 15.75 18 15.75C17.5858 15.75 17.25 15.4142 17.25 15V7.81066L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L16.1893 6.75H9Z" fill="#9333ea"></path> </g></svg>
</motion.a>
          </div>
          <div className="flex gap-2 justify-between bg-[#121212] border border-slate-800  p-2 rounded-lg shadow-md" role="tablist">
  {presets.map((preset, index) => (
    <motion.div
      key={index}
      role="tab"
      aria-selected={selectedTab === index}
      tabIndex={selectedTab === index ? 0 : -1}
      className={`cursor-pointer px-4 py-2 rounded-md text-center transition-colors duration-200 ${
        selectedTab === index
          ? 'bg-slate-800 w-1/3 text-white shadow-lg'
          : ' text-gray-300 '
      }`}
      onClick={() => setSelectedTab(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setSelectedTab(index);
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-lg font-semibold">{preset.percentage}</div>
        <div className="text-xs text-gray-500">Fee: {preset.fee}</div>
      </div>
    </motion.div>
  ))}
</div>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium">Enter active price</label>
          <input
  type="text"
  value={activePrice}
  onChange={(e) => setActivePrice(e.target.value)}
  className="bg-[#121212] border border-slate-800 p-6 rounded w-full outline-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
  placeholder="0.00"
/>
        </div>

        <motion.button
 className={`relative w-full py-4 px-8 text-white font-medium text-lg rounded-lg overflow-hidden group ${
    !isFormComplete() ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  whileHover={isFormComplete() ? { scale: 1.02 } : {}}
  whileTap={isFormComplete() ? { scale: 0.98 } : {}}
  disabled={!isFormComplete()}
  onClick={() => router.push('/addliquidity')}
>
  {/* Border */}
  <span className="absolute inset-0 w-full h-full border-2 border-purple-600 rounded-lg"></span>
  
  {/* Gradient backgrounds */}
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-300 to-purple-400 transition-all duration-300 ease-out transform group-hover:scale-105"></span>
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 ease-out transform scale-105 group-hover:scale-100"></span>
  
  {/* Button content */}
  <span className="relative flex items-center justify-center">
    <span className="mr-4">Initialize </span>
    <svg
      className="w-5 h-5 transition-transform duration-300 ease-out transform group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  </span>
</motion.button>
{!isFormComplete() && (
  <p className="text-red-500 text-sm mt-2 text-center">
    {!baseToken || !quoteToken
      ? "Please select both base and quote tokens"
      : baseToken === quoteToken
      ? "Base and quote tokens must be different"
      : activePrice === "0.0" || activePrice === ""
      ? "Please enter a valid active price"
      : ""}
  </p>
)}
      </div>
    </div>
  )
}