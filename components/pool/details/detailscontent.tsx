"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ManageView from "./managecontent"
import AnalyticsView from "./activitycontent"

export default function DetailsContent() {
  const [view, setView] = useState<"manage" | "analytics">("manage")

  const toggleView = () => {
    setView(view === "manage" ? "analytics" : "manage")
  }

  return (
    <div className=" text-white p-4">
      <div className=" mx-auto">
        <div className="flex mb-6 ">
          <button
            className={`mr-4 pb-2 text-xl ${
              view === "manage" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"
            }`}
            onClick={() => setView("manage")}
          >
            Manage
          </button>
          <button
            className={`pb-2 text-xl ${
              view === "analytics" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"
            }`}
            onClick={() => setView("analytics")}
          >
            Analytics
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='align-middle'
          >
            {view === "manage" ? <ManageView /> : <AnalyticsView />}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}


