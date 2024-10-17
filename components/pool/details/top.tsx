"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function CryptoHeader() {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0xD446...f7d1")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className=" text-white p-4">
      <div className="w-auto mx-auto">
        <div className="flex flex-col gap-4">
          <Link href="/pool" className="flex flex-row gap-3 items-center text-gray-300 hover:text-white transition-colors">
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-row gap-3"
            >
              <ArrowLeft className="mr-2 text-xl" />
              <span>Back to pool</span>
            </motion.div>
          </Link>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
  
            <div className=" bg-black flex flex-row rounded-full mr-2">
                <img src='/images/Capture.PNG' className='h-8 w-8 ' alt='logo' />          
                <img src='/images/usdc.PNG' className='h-6 w-6 -ml-3 mt-1' alt='logo' />      

                </div>
   
            <span className="font-bold mr-2">KAN/USDC</span>
            <div className="relative">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full w-full left-1/2 text-center transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded"
                  >
                    Wallet Address
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded flex items-center text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Copy wallet address"
              >
                <span className="mr-1">0xD446...f7d1</span>
                {copied ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <Copy size={14} />
                )}
              </motion.button>
            </div>
            <motion.a
              href="https://etherscan.io/address/0xD446...f7d1"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View on Etherscan"
            >
              <ExternalLink size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </header>
  )
}