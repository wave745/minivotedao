import { useWallet } from "../hooks/useWallet";
import { getNetworkName, shortenAddress } from "../lib/utils";

export default function Navbar() {
  const { connect, isConnected, isConnecting, address, chainId } = useWallet();
  const networkName = getNetworkName(chainId);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo and title */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-xl font-bold">MiniVoteDAO</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              {isConnected && chainId && (
                <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
                  {networkName}
                </span>
              )}
              
              {!isConnected ? (
                <button 
                  onClick={connect}
                  disabled={isConnecting}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-150 flex items-center"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              ) : (
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-150">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>{shortenAddress(address)}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
