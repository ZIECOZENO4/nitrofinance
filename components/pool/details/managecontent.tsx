"use client";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence  } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";

interface Token {
    name: string;
    fullName: string;
    balance: string;
    icon: string;
  }
  
  const tokens: Token[] = [
    {
      name: "ETH",
      fullName: "Ethereum",
      balance: "0.00012",
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      name: "MONAD",
      fullName: "Monad",
      balance: "0.0000",
      icon: "/images/circle.PNG",
    },
    {
      name: "KAN",
      fullName: "Kannon",
      balance: "0.0000",
      icon: "/images/Capture.PNG",
    },
    {
      name: "USDC",
      fullName: "USD Coin",
      balance: "119.000",
      icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
  ];

export default function ManageView() {
  const [activeTab, setActiveTab] = useState("add");
  const [selectedStructure, setSelectedStructure] = useState("spot-cont");
  const [priceRange, setPriceRange] = useState([0.000002, 0.000002]);
  const [minPrice, setMinPrice] = useState(0.000002);
  const [maxPrice, setMaxPrice] = useState(0.000004);
  const rangeRef = useRef(null);
  const minHandle = useMotionValue(0);
  const maxHandle = useMotionValue(100);
  const router = useRouter();
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose,
  } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [baseToken, setBaseToken] = useState<Token | null>(null);
  const [quoteToken, setQuoteToken] = useState<Token | null>(null);
  const [isSelectingBase, setIsSelectingBase] = useState(true);
  const [baseAmount, setBaseAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = useCallback(
    (token: Token) => {
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
    },
    [isSelectingBase, baseToken, onClose]
  );

  const openTokenModal = useCallback(
    (isBase: boolean) => {
      setIsSelectingBase(isBase);
      onOpen();
    },
    [onOpen]
  );

  return (
    <div className="min-h-screen gap-4 align-middle   text-slate-100 p-6 px-24">
      <div className="bg-[#121212] mb-4 rounded-lg">
        <h2 className="text-xl md:text-2xl px-6 pt-6 font-bold mb-2">
          Selected Position
        </h2>
        <hr className="mb-4 text-slate-400" />
        <div className="flex items-center mb-4 px-6 pb-6">
          <div className="w-full flex flex-row justify-between align-middle gap-4 ">
            <div className="w-1/2 flex flex-col gap-4">
            <div className="flex flex-row">
            <div className="flex flex-row  align-middle">
                <div className="flex flex-row rounded-full mr-2">
                  <img
                    src="/images/Capture.PNG"
                    className="h-8 w-8 "
                    alt="logo"
                  />
                  <img
                    src="/images/usdc.PNG"
                    className="h-6 w-6 -ml-3 mt-1"
                    alt="logo"
                  />
                </div>
                <span className="font-bold mr-2">KAN/USDC</span>
              </div>
              <div className="ml-4">
                <span className="text-slate-400">NIT:</span> 0.03245
              </div>
              <div className="ml-4">
                <span className="text-slate-400">USDC:</span> 50
              </div>
            </div>
             <div className="gap-2 my-2 flex ">
             <span  className="text-slate-400">Min: </span> 0 USDC per NIT
             <span>-</span>
             <span  className="text-slate-400">Max: </span> 0.0324 NIT per USDC
             </div>
             <div className="gap-2 mb-2 flex ">
             <span  className="text-slate-400">Debt Share: </span> 98%
             <span className="status-indicator flex items-center">
  <span className="flex items-center">
    <span className="dot mx-2 dot-upcoming"></span>

  </span>
</span>
             <span  className="text-slate-400">Amount of Liquidity Locked:</span>  60%
             </div>
            </div>
            <div className="w-1/2 flex justify-end items-center h-full" >
  <span className="text-center">In range</span>
  <span className="status-indicator flex items-center">
  <span className="flex items-center">
    <span className="dot mx-2 dot-ongoing"></span>

  </span>
</span>
</div>
          </div>

      
        </div>

      </div>
      <div className=" mx-auto bg-[#121212] rounded-lg">
        <div className="pt-6">
        <motion.div
            whileHover={{ scale: 1.05 }}
        
            whileTap={{ scale: 0.95 }}
        className="flex space-x-4 m-6 p-2 mt-6  rounded-lg border border-[#353434]">
          <motion.button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "add" ? "bg-purple-500 bg-opacity-70 border border-purple-700" : "border border-slate-700 bg-transparent"
            }`}
            whileHover={{ scale: 1.05 }}
        
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("add")}
          >
            Add Liquidity
          </motion.button>
          <motion.button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "remove" ? "bg-purple-500 bg-opacity-70 border border-purple-700" : "border border-slate-700 bg-transparent"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("remove")}
          >
            Remove Liquidity
          </motion.button>
        </motion.div>
        </div>
    
        <hr className="mb-4 text-slate-400" />
        <div className="flex flex-row gap-6 p-6 w-full align-middle items-center">
            <div className="w-1/2 gap-4 flex flex-col">
            <div>
          <label className="block mb-2 text-xl font-medium">Select Pair</label>
          <motion.div
            className="bg-[#121212] border border-slate-800 py-4 px-6 rounded flex justify-between items-center cursor-pointer"
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          
          >
         <div className="flex flex-row">
            <div className="flex flex-row  align-middle">
                <div className="flex flex-row rounded-full mr-2">
                  <img
                    src="/images/Capture.PNG"
                    className="h-8 w-8 "
                    alt="logo"
                  />
                  <img
                    src="/images/usdc.PNG"
                    className="h-6 w-6 -ml-3 mt-1"
                    alt="logo"
                  />
                </div>
                <span className="font-bold mr-2">KAN/USDC</span>
              </div>
              <div className="ml-3">
                <span className="text-slate-400">ox12..45r</span>
              </div>
              <div className="ml-3 text-purple-600">
                <span className="">0.01%</span>
              </div>
              <div className="ml-3 text-green-500">
                <span className="">0.05%</span>
              </div>
            </div>
            <ChevronDown size={20} />
          </motion.div>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-2">Add more liquidity</h2>
          <div className="relative mb-4">
            <input
              type="number"
              placeholder="0.00"
        
              className="w-full bg-[#121212] border border-gray-700 rounded p-6 focus:outline-none focus:border-purple-600"
            />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
  <motion.div
      onClick={() => openTokenModal(true)}
    whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
    className="flex flex-row gap-2 text-[10px] bg-gray-800 px-2 py-1 rounded-full text-xl mb-2"
  >
    {baseToken ? (
      <div className="flex items-center align-middle gap-1">
        <img
          src={baseToken.icon}
          alt={baseToken.name}
          className="w-4 h-4 rounded-full"
        />
        <span className="text-purple-500 text-sm font-bold">{baseToken.name}</span>    
      </div>
    ) : (
      <div className="flex items-center align-middle gap-1">
        <img
          src="/images/Capture.PNG"
          className="h-4 w-4 rounded-full"
          alt="logo"
        />
        <span className="text-purple-500 text-sm font-bold">KAN</span>
      </div>
    )}
  </motion.div>
  <div className='text-slate-400 text-sm flex'>
  <p className="text-sm text-slate-400">
                  Balance: 0.000340 {baseToken ? baseToken.name : "KAN"}
                </p>
    <span className="text-purple-600 font-bold ml-1">MAX</span>
  </div>
</div>
          </div>
          <div className="relative mb-4">
            <input
              type="number"
              placeholder="0.00"
        
              className="w-full bg-[#121212] border border-gray-700 rounded p-6 focus:outline-none focus:border-purple-600"
            />
           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
  <motion.div
    onClick={onOpen}
    whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
    className="flex flex-row gap-2 text-[10px] bg-gray-800 px-2 py-1 rounded-full text-xl mb-2"
  >
    {quoteToken ? (
      <div className="flex items-center align-middle gap-1">
        <img
          src={quoteToken.icon}
          alt={quoteToken.name}
          className="w-4 h-4 rounded-full"
        />
        <span className="text-purple-500 text-sm font-bold">{quoteToken.name}</span>    
      </div>
    ) : (
      <div className="flex items-center align-middle gap-1">
        <img
          src="/images/circle.PNG"
          className="h-4 w-4 rounded-full"
          alt="logo"
        />
        <span className="text-purple-500 text-sm font-bold">MONAD</span>
      </div>
    )}
  </motion.div>
  <div className='text-slate-400 text-sm flex'>
  <p className="text-sm text-slate-400">
                  Balance: 0.000340 {quoteToken ? quoteToken.name : "MONAD"}
                </p>
    <span className="text-purple-600 font-bold ml-1">MAX</span>
  </div>
</div>
          </div>
        </div>
            </div>
            <div className="w-1/2 gap-4 flex flex-col">
          
            </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Pair</h2>
          <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-500 text-slate-100 p-1 rounded mr-2">
                $
              </div>
              <span>NIT/USDC</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>0x12...87n</span>
              <span>0.1%</span>
              <span>0.4%</span>
              <ChevronDown />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add more liquidity</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <input
                type="number"
                placeholder="0.00"
                className="bg-transparent text-2xl w-full outline-none"
              />
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-500 text-slate-100 p-1 rounded">
                  NIT
                </div>
                <span className="text-gray-400">Balance: 0.00012</span>
                <span className="text-teal-400">MAX</span>
              </div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <input
                type="number"
                placeholder="0.00"
                className="bg-transparent text-2xl w-full outline-none"
              />
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-slate-100 p-1 rounded">
                  USDC
                </div>
                <span className="text-gray-400">Balance: 119.000</span>
                <span className="text-teal-400">MAX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">
              Select Liquidity Structure
            </h2>
            <button className="text-teal-400 flex items-center">
              Learn More <ChevronDown className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["spot-cont", "curved", "bid-ask"].map((structure) => (
              <motion.button
                key={structure}
                className={`p-3 rounded-md ${
                  selectedStructure === structure
                    ? "bg-teal-500"
                    : "bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStructure(structure)}
              >
                <div className="h-16 flex items-end space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1/5 bg-teal-400"
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                  ))}
                </div>
                <span className="capitalize">
                  {structure.replace("-", " ")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Price range</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400">Min Price</span>
                <div className="flex space-x-2">
                  <button
                    className="text-2xl"
                    onClick={() =>
                      setMinPrice(Math.max(minPrice - 0.000001, 0.000001))
                    }
                  >
                    -
                  </button>
                  <button
                    className="text-2xl"
                    onClick={() =>
                      setMinPrice(
                        Math.min(minPrice + 0.000001, maxPrice - 0.0000001)
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-2xl">{minPrice.toFixed(6)}</div>
              <div className="text-gray-400">USDC per NIT</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400">Max Price</span>
                <div className="flex space-x-2">
                  <button
                    className="text-2xl"
                    onClick={() =>
                      setMaxPrice(
                        Math.max(maxPrice - 0.000001, minPrice + 0.0000001)
                      )
                    }
                  >
                    -
                  </button>
                  <button
                    className="text-2xl"
                    onClick={() =>
                      setMaxPrice(Math.min(maxPrice + 0.000001, 0.000005))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-2xl">{maxPrice.toFixed(6)}</div>
              <div className="text-gray-400">NIT per USDC</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Set price range</h2>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="text-center mb-2">
              Active Price: 0.0113165 USDC per NIT
            </div>
            <div
              className="relative h-1 bg-gray-600 rounded-full mb-4"
              ref={rangeRef}
            >
              {/* <motion.div
                className="absolute top-0 left-0 right-0 h-full bg-teal-400 rounded-full"
                style={{
                  left: minHandle,
                  right: useTransform(maxHandle, (v) => `calc(100% - ${v}px)`),
                }}
              ></motion.div>
              <motion.div
                className="absolute top-0 w-4 h-4 bg-white rounded-full -mt-1.5 cursor-pointer"
                style={{ x: minHandle }}
                drag="x"
                dragConstraints={rangeRef}
                dragElastic={0}
                onDrag={(_, info) => {
                  const rangeWidth = rangeRef.current?.offsetWidth || 0;
                  const newMinPrice =
                    0.000001 +
                    (info.point.x / rangeWidth) * (0.000005 - 0.000001);
                  setMinPrice(Math.min(newMinPrice, maxPrice - 0.0000001));
                }}
              ></motion.div> */}
              {/* <motion.div
                className="absolute top-0 w-4 h-4 bg-white rounded-full -mt-1.5 cursor-pointer"
                style={{ x: maxHandle }}
                drag="x"
                dragConstraints={rangeRef}
                dragElastic={0}
                onDrag={(_, info) => {
                  const rangeWidth = rangeRef.current?.offsetWidth || 0;
                  const newMaxPrice =
                    0.000001 +
                    (info.point.x / rangeWidth) * (0.000005 - 0.000001);
                  setMaxPrice(Math.max(newMaxPrice, minPrice + 0.0000001));
                }}
              ></motion.div> */}
            </div>
            <div className="flex justify-between text-sm">
              <span>Min: {minPrice.toFixed(6)} USDC per NIT</span>
              <span>Max: {maxPrice.toFixed(6)} USDC per NIT</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button className="flex-1 py-2 bg-gray-700 rounded-md">
            Full Range
          </button>
          <motion.button
            className="flex-1 py-2 rounded-md bg-gradient-to-r from-teal-400 to-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Preview
          </motion.button>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <Info className="mr-2" size={16} />
          <span>
            Adding liquidity more than 200 bins you will sign multiple
            transactions.
          </span>
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
                            <h2 className="text-white text-xl font-semibold">
                              Select token
                            </h2>
                            <button
                              onClick={onClose}
                              className="text-gray-400  hover:text-white"
                            >
                              <X size={20} />
                            </button>
                          </div>
                          <div className="p-4">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search token or paste address"
                                className="w-full rounded-md py-2 pl-10 pr-4 text-gray-400 bg-[#121212] border border-slate-800 p-6 outline-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <Search
                                className="absolute left-3 top-2.5 "
                                size={20}
                              />
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
                                      <img
                                        src={token.icon}
                                        alt={token.name}
                                        className="w-8 h-8 mr-3"
                                      />
                                      <div>
                                        <div className="text-white font-medium text-xl">
                                          {token.name}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                          {token.fullName}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-white text-xl">
                                      {token.balance}
                                    </div>
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
      </div>
    </div>
  );
}
