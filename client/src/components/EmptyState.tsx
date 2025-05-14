import { useWallet } from "../hooks/useWallet";

interface EmptyStateProps {
  onCreateProposal: () => void;
}

export default function EmptyState({ onCreateProposal }: EmptyStateProps) {
  const { isConnected } = useWallet();
  
  return (
    <div className="bg-gray-800 rounded-lg p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="text-xl font-medium mb-2">No proposals yet</h3>
      <p className="text-gray-400 mb-6">Be the first to create a proposal for the community to vote on</p>
      <button 
        onClick={onCreateProposal}
        disabled={!isConnected}
        className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-150 inline-flex items-center disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        {isConnected ? "Create First Proposal" : "Connect Wallet First"}
      </button>
    </div>
  );
}
