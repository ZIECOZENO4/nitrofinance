export default function AnalyticsView() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pool Distribution</h2>
      <div className="mb-4">Active Bin: 28.999448 USDC per NIT</div>
      <div className="flex space-x-2 mb-4">
        {[33.2134, 33.2133, 33.2122, 34.3678, 37.1094, 39.8888].map((value, index) => (
          <div key={index} className="flex-1">
            <div className="h-32 flex items-end space-x-1">
              <div
                className="w-1/2 bg-teal-400"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
              <div
                className="w-1/2 bg-blue-400"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
            </div>
            <div className="text-center text-sm mt-2">{value.toFixed(4)}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">Pool reserve</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <span>671K USDC</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <span>112K NIT</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Debt reserve</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <span>82.6M USDC</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
              <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <span>26.4K NIT</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">TVL</h3>
        <div className="text-2xl font-bold text-teal-400">$19.92M</div>
        <div className="text-sm text-green-400">↑ 0.21%</div>
      </div>
    </div>
  )
}