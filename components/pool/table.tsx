"use client";

import { motion, AnimatePresence } from "framer-motion";

const cryptoData = [
  {
    asset: "NIT/USDC",
    icon: "🔷",
    tvl: "$19.92M",
    volume: "$145.26K",
    debtRatio: "30%",
    fees: "$23.40K",
    apr: "11.98%",
    nitroPoints: "10,000",
  },
  {
    asset: "ETH/USDC",
    icon: "💠",
    tvl: "$19.92M",
    volume: "$145.26K",
    debtRatio: "30%",
    fees: "$23.40K",
    apr: "11.98%",
    nitroPoints: "10,000",
  },
  {
    asset: "MONAD/USDC",
    icon: "🔵",
    tvl: "$19.92M",
    volume: "$145.26K",
    debtRatio: "30%",
    fees: "$23.40K",
    apr: "11.98%",
    nitroPoints: "10,000",
  },
]

export default function PoolTable() {
  return (
    <div className="w-full p-4 bg-black text-white">
      <table className="w-full">
        <thead>
          <tr className="text-sm md:text-xl text-gray-500">
            <th className="text-left pb-4">Assets</th>
            <th className="text-right pb-4">TVL</th>
            <th className="text-right pb-4">Volume (24H)</th>
            <th className="text-right pb-4">Debt Ratio</th>
            <th className="text-right pb-4">Fees(24H)</th>
            <th className="text-right pb-4">APR(24H)</th>
            <th className="text-right pb-4">Kannon Points</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((item, index) => (
            <tr key={index} className="border-t border-gray-800">
              <td className="py-4 flex items-center">
              <div className=" bg-black flex flex-row rounded-full mr-2">
                <img src='/images/Capture.PNG' className='h-8 w-8 ' alt='logo' />          
                <img src='/images/usdc.PNG' className='h-6 w-6 -ml-3 mt-1' alt='logo' />      
                </div>
                <span>{item.asset}</span>
                <div className="ml-2 flex">
                  <span className="text-xs text-gray-500 mr-1">0.01%</span>
                  <span className="text-xs text-green-500">0.03%</span>
                </div>
              </td>
              <td className="text-right py-4">{item.tvl}</td>
              <td className="text-right py-4">{item.volume}</td>
              <td className="text-right py-4">{item.debtRatio}</td>
              <td className="text-right py-4">{item.fees}</td>
              <td className="text-right py-4">{item.apr}</td>
              <td className="text-right py-4">
                <div className="flex items-center justify-end">
                  {item.nitroPoints}
                  <img src='/images/Capture.PNG' className='h-6 w-6 mt-1 -ml-1' alt='logo' />    
                </div>
              </td>
              <td className="text-right py-4">
               <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} className="bg-purple-900 bg-opacity-60 rounded-lg p-2 text-white border-purple-700 hover:bg-purple-800 border border-900">
                  Get Tokens
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}