"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface DataItem {
  value: string;
  usdc: number;
  nit: number;
  isMixed: boolean;
  height: number;
}

const generateMockData = (): DataItem[] => {
  const data: DataItem[] = []
  const baseValues = [33.2134, 33.2133, 33.2122, 34.3678, 37.1094, 39.8888]
  let currentValue = 33.2134
  for (let i = 0; i < 40; i++) {
    const usdc = Math.max(0, Math.min(100, 100 - (i * 2.5)))
    if (i % 8 === 0 && baseValues.length > 0) {
      currentValue = baseValues.shift() || currentValue
    }
    const isMixed = i >= 18 && i < 22 // 4 bars in the middle are mixed
    const height = Math.random() * 60 + 40 // Random height between 40% and 100%
    data.push({ 
      value: currentValue.toFixed(4), 
      usdc: isMixed ? usdc : (i < 18 ? 100 : 0), 
      nit: isMixed ? (100 - usdc) : (i < 18 ? 0 : 100),
      isMixed,
      height
    })
  }
  return data
}

const mockData = generateMockData()

export default function ExactPoolDistributionGraph() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [scale, setScale] = useState<number>(1)
  const [graphHeight, setGraphHeight] = useState<number>(260) // Initial height of 40 * 4

  const adjustScale = (adjustment: number) => {
    const newScale = Math.max(0.5, Math.min(2, scale + adjustment))
    setScale(newScale)
    setGraphHeight(260 * newScale) // Adjust the graph height based on the scale
  }

  return (
    <div className="bg-black text-white p-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-sm font-bold">Pool Distribution</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-sm">USDC</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
            <span className="text-sm">KAN</span>
          </div>
        </div>
      </div>

      <div className="relative mb-10"style={{ height: `${graphHeight + 24}px` }}>
        <div className="absolute top-0 right-0 space-x-2">
          <button onClick={() => adjustScale(0.1)} className="bg-gray-800 rounded-full  text-white px-2 py-1 text-sm">+</button>
          <button onClick={() => adjustScale(-0.1)} className="bg-gray-800  rounded-full text-white px-2 py-1 text-sm">-</button>
        </div>
        {mockData.map((item, index) => (
          <motion.div
            key={index}
            className="absolute bottom-0 cursor-pointer"
            style={{ 
              left: `${index * 2.5 * scale}%`, 
              height: `${item.height * scale}%`,
              width: `${2 * scale}%`,
              maxHeight: '100%'
            }}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setHoveredBar(index)}
            onHoverEnd={() => setHoveredBar(null)}
          >
            <div
              className="absolute bg-gradient-to-b from-green-400 via-slate-600 to-black/50  bottom-0 w-full rounded-t-md"
              style={{
                height: `${item.usdc}%`,
               
              }}
            />
            <div
              className="absolute bottom-0 w-full bg-gradient-to-b from-purple-400 via-slate-600 to-black/50 rounded-t-md"
              style={{
                height: `${item.nit}%`,
              
                bottom: `${item.usdc}%`,
              }}
            />
            {hoveredBar === index && (
              <motion.div
                className="absolute bottom-full mb-2 z-50 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                USDC: {item.usdc.toFixed(2)}%<br />
                KAN: {item.nit.toFixed(2)}%
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-400">
        {[mockData[0], mockData[8], mockData[16], mockData[24], mockData[32], mockData[39]].map((item, index) => (
          <span key={index}>{item.value}</span>
        ))}
      </div>
    </div>
  )
}