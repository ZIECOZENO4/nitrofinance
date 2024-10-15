"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LockIcon, TrendingUpIcon, SearchIcon, PlusIcon } from "lucide-react"

export default function PoolHero() {
  return (
    <div className="bg-black text-white w-full h-auto mb-4 mt-4 md:mt-10 overflow-hidden rounded-lg ">
      <div className=" mx-auto">
        <div className="flex justify-between gap-4 items-start mb-2">
          <div className="flex flex-col gap-4 w-1/3 h-64 ">
          <div className="flex items-center  rounded-lg h-1/2 bg-gradient-to-br from-black via-slate-900 to-violet-900   space-x-3 px-6">
            <div className="w-10 h-10 rounded-full bg-[#011e2b] border border-purple-600 bg-opacity-70 flex items-center justify-center">
              <LockIcon className="w-5 h-5 text-purple-600 " />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">$88.42K</div>
              <div className="text-sm md:text-xl text-gray-500">Total Value Locked</div>
            </div>
          </div>
          <div className="flex items-center rounded-lg h-1/2 bg-gradient-to-br from-gray-900 via-slate-900 to-violet-900 space-x-3 px-6">
            <div className="w-10 h-10 rounded-full bg-[#011e2b] border border-purple-600 bg-opacity-30 flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-purple-600 border-purple-600" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">$23.92K</div>
              <div className="text-sm md:text-xl text-gray-500">Total Volume</div>
            </div>
          </div>
          </div>
          <div className="flex items-center rounded-lg space-x-3 bg-opacity-70 w-1/3 bg-gradient-to-br from-gray-900 via-slate-900 to-violet-900 h-64">
            
            <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Liquidity Pool</h1>
            <p className="text-gray-500 text-xl md:text-2xl text-center">Trade meme coins and utility tokens with 0% slippage.</p>
            </div>
          </div>
      
          <div className="flex items-center rounded-lg bg-opacity-70 space-x-3 w-1/3 bg-gradient-to-br from-gray-900 via-slate-900 to-violet-900 h-64">
            
          </div>
        </div>
        <div className="flex justify-between h-40 rounded-lg items-center mb-2 ">
          <div className="relative flex-grow mr-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, address"
              className="w-1/3 bg-black border border-gray-800 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600"
            />
          </div>
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} className="bg-purple-600 mx-3 hover:bg-purple-400 text-white font-semibold py-2 px-8 rounded-md flex items-center">
            <PlusIcon className="w-5 h-5 mr-2 text-white" />
            Create pool
          </motion.button>
        </div>
      
      </div>
    </div>
  )
}