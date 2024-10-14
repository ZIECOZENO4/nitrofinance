import { LockIcon, TrendingUpIcon, SearchIcon, PlusIcon } from "lucide-react"

export default function PoolHero() {
  return (
    <div className="bg-black text-white w-full h-[70vh] mb-4 mt-4 md:mt-10 overflow-hidden rounded-lg ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#011e2b] flex items-center justify-center">
              <LockIcon className="w-5 h-5 text-[#00ffff]" />
            </div>
            <div>
              <div className="text-2xl font-bold">$88.42K</div>
              <div className="text-sm text-gray-500">Total Value Locked</div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Liquidity Pool</h1>
            <p className="text-gray-500">Trade meme coins and utility tokens with 0% slippage.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#011e2b] flex items-center justify-center">
              <TrendingUpIcon className="w-5 h-5 text-[#00ffff]" />
            </div>
            <div>
              <div className="text-2xl font-bold">$23.92K</div>
              <div className="text-sm text-gray-500">Total Volume</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-16">
          <div className="relative flex-grow mr-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, address"
              className="w-full bg-[#011e2b] border border-gray-800 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffff]"
            />
          </div>
          <button className="bg-[#00ffff] text-black font-semibold py-2 px-4 rounded-md flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Create pool
          </button>
        </div>
        <div className="flex justify-end">
          <div className="relative w-40 h-40">
            <div className="absolute top-0 right-0 w-20 h-20 border-2 border-[#00ffff] rounded-md transform rotate-45 bg-[#011e2b]"></div>
            <div className="absolute top-8 right-8 w-20 h-20 border-2 border-[#00ffff] rounded-md transform rotate-45 bg-[#011e2b]"></div>
            <div className="absolute top-16 right-16 w-20 h-20 border-2 border-[#00ffff] rounded-md transform rotate-45 bg-[#011e2b]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}