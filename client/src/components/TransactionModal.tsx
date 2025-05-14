import { XIcon } from "lucide-react";

interface TransactionModalProps {
  isOpen: boolean;
  txHash: string;
  status: "Pending" | "Confirmed" | "Failed";
  onClose?: () => void;
}

export default function TransactionModal({
  isOpen,
  txHash,
  status,
  onClose
}: TransactionModalProps) {
  if (!isOpen) return null;
  
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Confirmed":
        return "text-green-400";
      case "Failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  
  const statusColor = getStatusColor();
  const etherscanUrl = txHash ? `https://etherscan.io/tx/${txHash}` : "#";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="text-center">
          {status === "Pending" && (
            <div className="border-t-blue-500 w-12 h-12 border-4 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          )}
          
          {status === "Confirmed" && (
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {status === "Failed" && (
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2">
            {status === "Pending" ? "Processing Transaction" : `Transaction ${status}`}
          </h3>
          
          <p className="text-gray-300 mb-4">
            {status === "Pending" 
              ? "Please wait while your transaction is being processed..." 
              : status === "Confirmed"
                ? "Your transaction has been confirmed!"
                : "Your transaction failed to process."}
          </p>
          
          {txHash && (
            <div className="bg-gray-700 rounded-lg p-3 text-left mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Transaction Hash:</span>
                <a 
                  href={etherscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 font-mono truncate max-w-[200px]"
                >
                  {txHash.slice(0, 6)}...{txHash.slice(-4)}
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className={statusColor}>{status}</span>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-400 mb-5">
            {status === "Pending" 
              ? "Don't close this window. You'll be notified once the transaction is confirmed." 
              : "You can now continue using the application."}
          </p>
          
          {(status === "Confirmed" || status === "Failed") && onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-150"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
