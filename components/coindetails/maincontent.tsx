"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
export default function CoinDetailsComponent() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    onClose();
    router.push("/swap");
  };

  return (
    <div className="h-auto text-white mb-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-black border border-gray-800 rounded-md mb-4 overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-xl text-gray-400 font-normal py-3 px-4 border-r border-gray-700">
                      Amount In
                    </th>
                    <th className="text-left text-xl text-gray-400 font-normal py-3 px-4 border-r border-gray-700">
                      Amount Out
                    </th>
                    <th className="text-left text-xl text-gray-400 font-normal py-3 px-4">
                      Countdown
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="transition-all duration-300 ease-in-out hover:bg-gray-900">
                    <td className="py-4 px-4 border-r border-gray-700">
                      <div className="flex items-center space-x-2">
                        <span className="text-white">6000</span>
                        <img
                          src="/images/usdc.PNG"
                          className="h-5 w-5 object-contain"
                          alt="USDC logo"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 border-r border-gray-700">
                      <div className="flex items-center space-x-2">
                        <span className="text-white">40</span>
                        <img
                          src="/images/Capture.PNG"
                          className="h-8 w-8 object-contain"
                          alt="Token logo"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-red-600 font-medium">00:00:00</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-md border text-xl border-purple-600 text-white font-bold"
              style={{
                background:
                  "linear-gradient(to right, #c084fc 0%, #9333ea 100%)",
              }}
            >
              Claim
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#121212] rounded-lg p-6"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="0.00"
                className="w-full bg-[#121212] border border-gray-700 rounded p-6 focus:outline-none focus:border-purple-500"
              />
              <motion.div
                onClick={onOpen}
                whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
                className="absolute right-3 top-1/2 flex flex-row gap-2 transform -translate-y-1/2 text-[10px] bg-gray-800 px-2 py-1 rounded-full text-xl"
              >
                {selectedToken ? (
                 <div className="flex items-center align-middle gap-1">
                    <img
                      src={selectedToken.icon}
                      alt={selectedToken.name}
                      className="w-4 h-4 rounded-full"
                    />
                        <span className=" text-purple-500 font-bold">{selectedToken.name}</span>    
                  </div>
                ) : (
                  <div className="flex items-center align-middle gap-1">
                    <img
                      src="/images/circle.PNG"
                      className="h-4 w-4 rounded-full"
                      alt="logo"
                    />
                    <span className=" text-purple-500 font-bold"> MONAD</span>
                  </div>
                )}
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
            <div className="flex md:flex-row flex-col justify-between text-xl text-gray-400 mb-6">
              <div>
                Buy limit: 6000 <span className="text-blue-400">○</span>
              </div>
              <div>Wallet Balance: 0.00012</div>
            </div>
            <div className=" bg-[#121212] border border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mt-4 ">
                <div className="text-xl font-bold">10 - 100</div>

                <motion.div
                  onClick={onOpen}
                  whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
                  className="right-3 top-1/2 flex flex-row gap-2 transform -translate-y-1/2 text-[10px] bg-gray-800 px-2 py-1 rounded-full text-xl"
                >
                    {selectedToken ? (
                 <div className="flex items-center align-middle gap-1">
                    <img
                      src={selectedToken.icon}
                      alt={selectedToken.name}
                      className="w-4 h-4 rounded-full"
                    />
                        <span className=" text-purple-500 font-bold">{selectedToken.name}</span>    
                  </div>
                ) : (
                  <div className="flex items-center align-middle gap-1">
                    <img
                      src="/images/circle.PNG"
                      className="h-4 w-4 rounded-full"
                      alt="logo"
                    />
                    <span className=" text-purple-500 font-bold"> MONAD</span>
                  </div>
                )}
                </motion.div>
              </div>
              <hr className="mb-4 mt-1" />
              <div className="my-2">
                <div className="text-gray-400 text-xl flex justify-between">
                  <p>Current price:</p>
                  <p className="text-gray-100 text-xl">10 USDC per KAN</p>
                </div>
              </div>
              <div className="my-2">
                <div className="text-gray-400 text-xl flex justify-between">
                  <p>Available:</p>
              
                        <div className="flex items-center align-middle gap-1">
               
                    <span className=" text-gray-100  text-xl">   10M</span>
                    <img
                      src="/images/circle.PNG"
                      className="h-4 w-4 rounded-full"
                      alt="logo"
                    />
                  </div>
                               </div>
              </div>
              <div className="my-2">
                <div className="text-gray-400 text-xl flex justify-between">
                  <p>Allocation weight:</p>
                  <div className="bg-[#121212] border border-gray-700 rounded-md overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left text-xl text-gray-400 font-normal py-2 px-4 border-r border-gray-700">
                            Buying price
                          </th>
                          <th className="text-left text-xl text-gray-400 font-normal py-2 px-4">
                            End price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border-r border-gray-700">
                        10
                            %
                          </td>
                          <td className="py-2 px-4">
                         90
                            %
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-md text-xl text-white font-bold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800"
            >
              Buy
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
