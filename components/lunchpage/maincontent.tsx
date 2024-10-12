"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { Tabs, Tab } from "@nextui-org/react";
export default function MainContent() {
  const [baseAsset, setBaseAsset] = useState("NIT Nitro finance")
  const [quoteAsset, setQuoteAsset] = useState("USDC USD Coin")
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [activePrice, setActivePrice] = useState("0.0")
  const [selectedTab, setSelectedTab] = useState(0);
  const presets = [
    { percentage: "0.25%", fee: "0.3%" },
    { percentage: "0.5%", fee: "1%" },
    { percentage: "0.15%", fee: "0.5%" },
  ]

  return (
    <div className=" text-white p-6  max-w-3xl mt-10 mx-auto">
      <div className="flex justify-between items-center mb-12">
        <motion.button
          className="flex items-center text-xs text-slate-400"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </motion.button>
        <motion.button
          className="px-2 py-1 rounded-lg border border-[#c4bebe] bg-black"
    
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
          <label className="block mb-2 text-xs font-medium">Select base asset</label>
          <motion.div
            className="bg-[#121212] border border-slate-800 py-4 px-6 rounded flex justify-between items-center cursor-pointer"
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex text-xs items-center">
           Select Token
            </span>
            <ChevronDown size={20} />
          </motion.div>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium">Select quote asset</label>
          <motion.div
            className="bg-[#121212] border border-slate-800 py-4 px-6  rounded flex justify-between items-center cursor-pointer"
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex text-xs items-center">
           Select Token
            </span>
            <ChevronDown size={20} />
          </motion.div>
        </div>

        <div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <label className="text-xs ">Preset</label>
     <motion.a
  href="#"
  className="group flex items-center text-xs font-medium"
  whileHover={{ scale: 1.05 }}
>
  <span className="text-teal-400 group-hover:text-teal-600 hover:underline transition-colors duration-200">
    Request for custom
  </span>

  <svg className="inline ml-1 text-teal-400 group-hover:text-teal-600 transition-colors duration-200" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H18C18.4142 5.25 18.75 5.58579 18.75 6V15C18.75 15.4142 18.4142 15.75 18 15.75C17.5858 15.75 17.25 15.4142 17.25 15V7.81066L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L16.1893 6.75H9Z" fill="#2dd4bf"></path> </g></svg>
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
  className="bg-[#121212] border border-slate-800 p-6 rounded w-full outline-none focus:outline-none focus:ring-2 focus:ring-[#00ffff] placeholder-gray-500"
  placeholder="0.00"
/>
        </div>

        <motion.button
          className="w-full py-3 rounded text-center text-white font-medium"
          style={{
            background: "linear-gradient(90deg, #4fd1c5 0%, #63b3ed 100%)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Initialize
        </motion.button>
      </div>
    </div>
  )
}