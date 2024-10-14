"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { Search, X } from "lucide-react"
import { Settings,  RefreshCcw } from "lucide-react"
import { ChevronDown } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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


export default function SwapForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [baseToken, setBaseToken] = useState<Token | null>(null);
  const [quoteToken, setQuoteToken] = useState<Token | null>(null);
  const [isSelectingBase, setIsSelectingBase] = useState(true);
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      if (!baseToken || !quoteToken || !baseAmount || !quoteAmount) {
        setErrorMessage("Please complete all inputs");
        setIsValid(false);
      } else {
        setErrorMessage("");
        setIsValid(true);
      }
    };
    
    checkValidity();
  }, [baseToken, quoteToken, baseAmount, quoteAmount]);

  const handleSwap = () => {
    toast.success(
      <div>
        <h3 className="font-bold mb-2">Swap Successful!</h3>
        You are swapping {baseAmount} {baseToken?.name} for {quoteAmount} {quoteToken?.name}
      </div>,
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: 'linear-gradient(to top, #121212, #121212)',
          color: 'white',
        },
      }
    )
  }

  const isInputsValid = useCallback(() => {
    if (!baseToken || !quoteToken || !baseAmount || !quoteAmount) {
      setErrorMessage("Please complete all inputs");
      return false;
    }
    setErrorMessage("");
    return true;
  }, [baseToken, quoteToken, baseAmount, quoteAmount]);

  const handlePreviewSwap = useCallback(() => {
    if (isInputsValid()) {
      onPreviewOpen();
    }
  }, [isInputsValid, onPreviewOpen]);
  
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = useCallback((token: Token) => {
    if (isSelectingBase) {
      setBaseToken(token);
    } else {
      if (token.name !== baseToken?.name) {
        setQuoteToken(token);
      } else {
        console.error("Quote token must be different from base token");
      }
    }
    onClose();
  }, [isSelectingBase, baseToken, onClose]);
  
  const openTokenModal = useCallback((isBase: boolean) => {
    setIsSelectingBase(isBase);
    onOpen();
  }, [onOpen]);

  const inputVariants = {
    focus: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 10 } },
    blur: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } }
  }
  return (
    <div className="flex items-center justify-center h-auto mt-[10vh]  bg-black">
      <div className="w-full max-w-md p-4 space-y-4">
        <div className="flex justify-between mb-8 items-center">
          <h1 className="text-2xl font-bold text-white">Swap</h1>
          <button  className="text-gray-400">
            <Settings className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-2 bg-[#121212] border mb-8 mt-8 border-slate-800 rounded-lg p-4 relative">
  <motion.div variants={inputVariants} whileFocus="focus" initial="blur" animate="blur">
    <div className="relative w-full mb-8">
      <input
           id="limitPerUser1"
                type="number"
                placeholder="0.00"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
        className="bg-[#121212] border border-slate-800 p-6 pr-12 rounded w-full outline-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
      />
      <div className="absolute right-3 top-3 flex flex-col items-end">
        <motion.div 
          onClick={() => openTokenModal(true)} 
          whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
          className="flex flex-row gap-2 text-[10px] bg-gray-800 p-1 rounded-full text-sm mb-2"
        >
          {baseToken ? (
            <>
              <img src={baseToken.icon} alt={baseToken.name} className="w-4 h-4 rounded-full mr-1" />
           <span className='mr-1'> {baseToken.name}</span>  
            </>
          ) : (
            <div className="flex flex-row w-auto gap-2">
              <img src='/images/Capture.PNG' className='h-4 w-4 mt-1' alt='logo' />
              <span className="text-purple-500 text-sm gap-3">KAN</span>
              <ChevronDown size={20} className="text-purple-500" />
            </div>
          )}
        </motion.div>
        <p className="text-sm text-slate-600">
          Balance: 0.000340 {baseToken ? baseToken.name : 'KAN'}
        </p>
      </div>
    </div>
  </motion.div>
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
              <h2 className="text-white text-xl font-semibold">Select token</h2>
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
                          <div className="text-white font-medium text-xl">{token.name}</div>
                          <div className="text-gray-400 text-sm">{token.fullName}</div>
                        </div>
                      </div>
                      <div className="text-white text-xl">{token.balance}</div>
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
  <div className="absolute left-1/2 top-[40%] -mt-4 transform -translate-x-1/2 -translate-y-1/2 z-10">
  <button className="rounded-full bg-[#121212] border p-4 border-slate-800">
  <RefreshCcw className="h-10 w-10 text-purple-600 animate-spin [animation-duration:4s]" />
</button>
  </div>
  
  <motion.div variants={inputVariants} whileFocus="focus" initial="blur" animate="blur">
    <div className="relative w-full mb-8">
      <input
       id="limitPerUser2"
       type="number"
       placeholder="0.00"
       value={quoteAmount}
       onChange={(e) => setQuoteAmount(e.target.value)}
        className="bg-[#121212] border border-slate-800 p-6 pr-12 rounded w-full outline-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
      />
      <div className="absolute right-3 top-3 flex flex-col items-end">
        <motion.div 
         onClick={() => openTokenModal(false)} 
          whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
          className="flex flex-row gap-2 text-[10px] bg-gray-800 p-1 rounded-full text-sm mb-2"
        >
          {quoteToken ? (
            <>
              <img src={quoteToken.icon} alt={quoteToken.name} className="w-4 h-4 rounded-full mr-1" />
            <span className='mr-1'>   {quoteToken.name}</span>
            </>
          ) : (
            <div className="flex flex-row w-auto gap-2">
              <img src='/images/Capture.PNG' className='h-4 w-4 mt-1' alt='logo' />
              <span className="text-purple-500 text-sm gap-3">KAN</span>
              <ChevronDown size={20} className="text-purple-500" />
            </div>
          )}
        </motion.div>
        <p className="text-sm text-slate-600">
          Balance: 0.000340 {quoteToken ? quoteToken.name : 'KAN'}
        </p>
      </div>
    </div>
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
              <h2 className="text-white text-xl font-semibold">Select quote token</h2>
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
                            <div className="text-white font-medium text-xl">{token.name}</div>
                            <div className="text-gray-400 text-sm">{token.fullName}</div>
                          </div>
                        </div>
                        <div className="text-white text-xl">{token.balance}</div>
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
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`w-full py-3 text-xl rounded-md text-white font-bold ${
    isValid
      ? "bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800"
      : "bg-gray-600 cursor-not-allowed"
  }`}
  onClick={handlePreviewSwap}
  disabled={!isValid}
>
  Preview Swap
</motion.button>
            {errorMessage && (
          <div className="text-red-500 text-center text-sm my-2">{errorMessage}</div>
        )}
 <Modal backdrop="blur" isOpen={isPreviewOpen} onClose={onPreviewClose}>
          <ModalContent className="bg-black">
            {(onPreviewClose) => (
              <AnimatePresence>
                {isPreviewOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="p-4"
                  >
<div className="bg-black text-white p-6 rounded-lg">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Review Swap</h2>
        <button  onClick={onPreviewClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">You pay</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{baseAmount} {baseToken?.name}</span>
         
            <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
              <img alt="image" src={baseToken?.icon} className="h-4 w-4 rounded-full" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">You receive</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{quoteAmount} {quoteToken?.name}</span>
            <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
            <img alt="image" src={quoteToken?.icon} className="h-4 w-4 rounded-full" />
            </div>
         
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-8">
<hr />
        <div className="flex justify-between">
          <span className="text-gray-400">Exchange Rate</span>
          <span>  {baseAmount} {baseToken?.name} for {quoteAmount} {quoteToken?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Network Fee</span>
          <span>0.034%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Price Impact</span>
          <span>0.342%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Minimum Received</span>
          <span>0.5 {quoteToken?.name}</span>
        </div>
      </div>

      <button 
        onClick={handleSwap}
        className="w-full py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-300 to-purple-600 hover:from-purple-400 hover:to-purple-700 transition-colors"
      >
        Swap
      </button>
    </div>

                 
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}