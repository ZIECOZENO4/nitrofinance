"use client"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Chip} from "@nextui-org/react";
import CustomChip from "./CustomChip";
import { useRouter } from 'next/navigation'

export default function CardContent() {
  const router = useRouter()
  const [selectedButton, setSelectedButton] = useState("All")
  const [backgroundPosition, setBackgroundPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const buttons = ["All", "Upcoming", "Ongoing", "Closed"]

  const cards = [
    { status: "Upcoming", locked: "40M", volume: "20M", time: "00h : 19m : 34s" },
    { status: "Ongoing", locked: "10M", volume: "20M", time: "00h : 19m : 34s" },
    { status: "Closed", locked: "46M", volume: "22M", time: "00h : 00m : 00s" },
    { status: "Ongoing", locked: "10M", volume: "20M", time: "00h : 19m : 34s" },
  ]

  const filteredCards = selectedButton === "All" 
    ? cards 
    : cards.filter(card => card.status === selectedButton)

  return (
    <div className="bg-black my-6 text-white ">
      <div className="mb-6 flex items-center space-x-4 gap-6 relative">
        {buttons.map((button) => (
          <motion.button
            key={button}
            className={`z-10 font-medium transition-colors duration-300 w-20 h-10 text-center relative overflow-hidden rounded-md`}
            onClick={() => setSelectedButton(button)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className={`absolute inset-0  ${
                selectedButton === button ? "text-white bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900 opacity-70" : "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 text-transparent bg-clip-text"
              }`}
              style={{
                backgroundPosition: `${backgroundPosition}% 0`,
              }}
            />
            <span className={`relative z-10 ${
              selectedButton === button ? "text-white" : "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 text-transparent bg-clip-text"
            }`}>
              {button}
            </span>
          </motion.button>
        ))}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name, address"
            className="w-full border border-white bg-black hover:bg-black focus:bg-black text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8a34cf]"
          />
          <motion.div
            className="absolute left-3 top-2.5 h-5 w-5 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search />
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCards.map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-black border cusor-pointer border-white rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => router.push('/coindetails')}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className=" bg-black flex flex-row rounded-full mr-2">
                <img src='/images/Capture.PNG' className='h-8 w-8 ' alt='logo' />          
                <img src='/images/usdc.PNG' className='h-6 w-6 -ml-3 mt-1' alt='logo' />      

                </div>
                <span className="">KAN/USDC</span>
              </div>
              <span className="status-indicator flex items-center">
              <span className="flex items-center">
  <span 
    className={`dot mr-2 ${
      item.status === "Ongoing" ? "dot-ongoing" :
      item.status === "Upcoming" ? "dot-upcoming" :
      "dot-closed"
    }`}
  ></span>
  <span 
    className={`text-sm ${
      item.status === "Ongoing" ? "text-[#ffa500]" :
      item.status === "Upcoming" ? "text-[#33e942]" :
      "text-[#ff0000]"
    }`}
  >
    {item.status}
  </span>
</span>
    </span>
            </div>
            <div className="flex justify-start gap-6 text-sm mb-8">
            <CustomChip text="0x23..34d" hoverText="Wallet Address" />
            <CustomChip text="0.03%" hoverText="Bin Step" />
</div>
            <div className="flex justify-between items-center text-sm mb-4">
              <span className='text-xs text-slate-600'>Total Locked</span>
              <div className="flex items-center ">
                <span>{item.locked}</span>
                <img src='/images/Capture.PNG' className='h-4 w-4 ' alt='logo' />    
                <div className="w-20 h-2 bg-purple-900 rounded-full ml-2">
                  <div className="w-3/4 h-full bg-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <span  className='text-xs text-slate-600'>Total Volume</span>
              <div className="flex items-center ">
              <span>{item.volume}</span>
              <img src='/images/usdc.PNG' className='h-4 w-4' alt='logo' />   
              </div>
            </div>
            <div className="rounded-lg bg-[#1d1f1f] bg-opacity-30 p-4 mt-8">
            <div className="text-sm mb-2">
            <div className="flex justify-between items-center text-sm mb-4">
            <div className="gap-4">
              <span className="text-gray-600">Starting price</span>
              <span className="float-right text-gray-600">Final price</span>
              </div>
              <div className="text-right text-xs text-[#ff0000]">{item.time}</div>
              </div>
            </div>
            <div className="w-full h-4 bg-purple-900 rounded-full mb-2">
              <div className="w-3/4 h-full bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
        
              <span className="text-gray-600">SP</span>
              <span className="float-right text-gray-600">FP</span>
              </div>
              </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}