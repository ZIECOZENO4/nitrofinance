"use client"

import { motion } from "framer-motion"


export default function CoinDetailsComponent() {
  return (
    <div className="h-auto text-white mb-6 font-sans">
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
        <th className="text-left text-xs text-gray-400 font-normal py-3 px-4 border-r border-gray-700">Amount In</th>
        <th className="text-left text-xs text-gray-400 font-normal py-3 px-4 border-r border-gray-700">Amount Out</th>
        <th className="text-left text-xs text-gray-400 font-normal py-3 px-4">Countdown</th>
      </tr>
    </thead>
    <tbody>
      <tr className="transition-all duration-300 ease-in-out hover:bg-gray-900">
        <td className="py-4 px-4 border-r border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-white">6000</span>
            <img src='/images/usdc.PNG' className='h-5 w-5 object-contain' alt='USDC logo' />
          </div>
        </td>
        <td className="py-4 px-4 border-r border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-white">40</span>
            <img src='/images/Capture.PNG' className='h-5 w-5 object-contain' alt='Token logo' />
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
              className="w-full py-3 rounded-md border border-cyan-600 text-white font-bold"
              style={{
                background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
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
              className="w-full bg-[#121212] border border-gray-700 rounded p-6 focus:outline-none focus:border-cyan-500"
            />
            <div className="absolute right-3 top-1/2 flex flex-row gap-2 transform -translate-y-1/2 text-[10px] bg-gray-800 px-2 py-1 rounded-full text-sm">
            <img src='/images/Capture.PNG' className='h-4 w-4 mb-1' alt='logo' />
              <span className=" text-cyan-500 font-bold">   NIT</span>
            </div>
          </div>
            <div className="flex justify-between text-xs text-gray-400 mb-6">
              <div>Buy limit: 6000 <span className="text-blue-400">○</span></div>
              <div>Wallet Balance: 0.00012</div>
            </div>
            <div className=" bg-[#121212] border border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mt-4 ">
              <div className="text-sm font-bold">10 - 100</div>

              <div className="bg-gray-800 px-2 gap-4 py-1 rounded-full text-sm">
                <span className="text-blue-400 mr-1">◈</span> NIT
              </div>
            </div>
            <hr className="mb-4 mt-1"/>
            <div className="my-2">
                <div className="text-gray-400 text-xs flex justify-between"><p>Current price:</p>
                <p className="text-gray-100 text-sm">10 USDC per NIT</p></div>
              </div>
              <div className="my-2">
                <div className="text-gray-400 text-xs flex justify-between"><p>Available:</p>
                <p className="text-gray-100 text-sm">10M <span className="text-blue-400">◈</span></p></div>
              </div>
              <div className="my-2">
                <div className="text-gray-400 text-xs flex justify-between"><p>Allocation weight:</p>
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
                  <td className="py-2 px-4 border-r border-gray-700">0%</td>
                  <td className="py-2 px-4">100%</td>
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
              className="w-full py-3 rounded-md text-white font-bold bg-teal-500"
            >
              Buy
            </motion.button>
          </motion.div>
        </div>

   
      </motion.div>
   
    </div>
  )
}