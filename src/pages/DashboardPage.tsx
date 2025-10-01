import Header from "../components/Header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Welcome back Alice</h2>
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Active Credit */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm">Active credit</h3>
              <span className="text-gray-400">→</span>
            </div>
            <div className="text-3xl font-bold mb-2">11,2 BTC</div>
            <div className="text-gray-400 text-sm">$ 28 477,50</div>
          </div>

          {/* Payment Goal */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm">Payment goal</h3>
              <span className="text-gray-400">→</span>
            </div>
            <div className="text-3xl font-bold mb-2">34%</div>
            <div className="text-gray-400 text-sm mb-4">$ 8 477,50 / $ 28 477,50</div>
            <div className="h-2 bg-gray-700 rounded-full mb-4">
              <div className="h-2 bg-purple-500 rounded-full" style={{width: '34%'}}></div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded text-sm">Send ↑</button>
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded text-sm">Receive ↓</button>
            </div>
          </div>

          {/* Price Analytics */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm">Price analytics</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  <option>BTC-ETH</option>
                </select>
                <select className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  <option>Monthly</option>
                </select>
                <span className="text-gray-400">→</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">$ 28,165</div>
            <div className="text-gray-400 text-sm mb-4">$ 25,216</div>
            <div className="h-20 bg-gray-700 rounded flex items-end justify-between px-2">
              <div className="w-4 bg-purple-400 h-8 rounded-t"></div>
              <div className="w-4 bg-purple-500 h-12 rounded-t"></div>
              <div className="w-4 bg-yellow-500 h-16 rounded-t"></div>
              <div className="w-4 bg-purple-500 h-10 rounded-t"></div>
              <div className="w-4 bg-purple-400 h-14 rounded-t"></div>
              <div className="w-4 bg-purple-500 h-8 rounded-t"></div>
            </div>
            <div className="text-green-500 text-sm mt-2">+8.25</div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Next Payment */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm mb-4">Next payment</h3>
            <div className="text-3xl font-bold mb-4">03 Nov</div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Days left</div>
              <div className="text-2xl font-bold">15</div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg md:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm">Payment history</h3>
              <span className="text-gray-400">→</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-xs font-bold">₿</div>
                  <div>
                    <div className="font-medium">Bitcoin</div>
                    <div className="text-gray-400 text-sm">15 Jan, 2023</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$28,165</div>
                  <div className="text-green-500 text-sm">• Successfully</div>
                </div>
                <div className="text-right font-medium">2,3 BTC</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">Ξ</div>
                  <div>
                    <div className="font-medium">Ethereum</div>
                    <div className="text-gray-400 text-sm">11 Feb, 2023</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$27,554</div>
                  <div className="text-green-500 text-sm">• Successfully</div>
                </div>
                <div className="text-right font-medium">1,2 ETH</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-xs font-bold">₿</div>
                  <div>
                    <div className="font-medium">Bitcoin</div>
                    <div className="text-gray-400 text-sm">18 Mar, 2023</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$26,165</div>
                  <div className="text-green-500 text-sm">• Successfully</div>
                </div>
                <div className="text-right font-medium">3,6 BTC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Amount of Credit */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm mb-2">Amount of credit</h3>
            <div className="text-gray-400 text-xs mb-4">Total refund amount with fee</div>
            <div className="text-3xl font-bold">15,9 BTC</div>
          </div>

          {/* Usage Plan */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm mb-4">Usage plan</h3>
            <div className="flex space-x-2 mb-4">
              <button className="px-3 py-1 bg-purple-500 text-white text-xs rounded">BTC</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded">ETH</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded">ETH</button>
            </div>
            <div className="h-16 bg-gray-700 rounded flex items-end justify-between px-2 mb-4">
              <div className="w-6 bg-yellow-500 h-12 rounded-t"></div>
              <div className="w-6 bg-yellow-500 h-10 rounded-t"></div>
              <div className="w-6 bg-yellow-500 h-8 rounded-t"></div>
            </div>
            <div className="text-2xl font-bold mb-2">72%</div>
            <div className="text-gray-400 text-sm">Mar 23 - Jul 12</div>
          </div>

          {/* Active Investors */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 text-sm">Active investors</h3>
              <span className="text-gray-400">→</span>
            </div>
            <div className="text-gray-400 text-xs mb-4">Mandatory payment</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs">+3</div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}