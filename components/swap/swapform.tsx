
import { Settings, ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react"


export default function SwapForm() {
  return (
    <div className="flex items-center justify-center h-auto mt-[10vh] bg-black">
      <div className="w-full max-w-md p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Swap</h1>
          <button  className="text-gray-400">
            <Settings className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="p-4 bg-gray-900 rounded-lg space-y-2">
            <input
              type="number"
              placeholder="0.00"
              className="text-3xl font-bold bg-transparent border-none text-white placeholder-gray-600 p-0"
            />
            <div className="flex justify-between items-center">
              <div>
              MONAD
              </div>
              <span className="text-sm text-gray-400">Balance: 0.00012</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="rounded-full bg-gray-800">
              <RefreshCcw className="h-6 w-6 text-teal-500" />
            </button>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg space-y-2">
            <input
              type="number"
              placeholder="0.00"
              className="text-3xl font-bold bg-transparent border-none text-white placeholder-gray-600 p-0"
            />
            <div className="flex justify-between items-center">
            <div>
              MONAD
              </div>
              <span className="text-sm text-gray-400">Balance: 119.000</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 px-4 rounded">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Preview
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}