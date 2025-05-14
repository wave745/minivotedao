import { useState } from "react";
import { Proposal, finalizeProposal, voteOnProposal } from "../lib/contract";
import { useContract } from "../hooks/useContract";
import { formatDeadline, formatEther, calculatePercentage, getProposalStatus, getStatusColor } from "../lib/utils";
import { CheckIcon, Bookmark, CircleArrowLeft, EyeIcon } from "lucide-react";
import TransactionModal from "./TransactionModal";

interface ProposalCardProps {
  proposal: Proposal;
  refresh: () => void;
}

export default function ProposalCard({ proposal, refresh }: ProposalCardProps) {
  const { contract, isOwner, isContractReady } = useContract();
  const [isVoting, setIsVoting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [showTxModal, setShowTxModal] = useState(false);

  const status = getProposalStatus(proposal);
  const statusColor = getStatusColor(status);
  const isActive = status === "Active";
  
  // Calculate percentages for the progress bars
  const totalVotes = BigInt(proposal.yesVotes) + BigInt(proposal.noVotes);
  const yesPercentage = calculatePercentage(proposal.yesVotes, totalVotes.toString());
  const noPercentage = calculatePercentage(proposal.noVotes, totalVotes.toString());
  
  const handleVote = async (support: boolean) => {
    if (!contract || !isContractReady) return;
    
    setIsVoting(true);
    setShowTxModal(true);
    
    try {
      const result = await voteOnProposal(contract, proposal.id, support);
      if (result.success) {
        setTxHash(result.hash);
        refresh();
      }
    } finally {
      setIsVoting(false);
      setTimeout(() => setShowTxModal(false), 3000);
    }
  };
  
  const handleFinalize = async () => {
    if (!contract || !isContractReady) return;
    
    setIsFinalizing(true);
    setShowTxModal(true);
    
    try {
      const result = await finalizeProposal(contract, proposal.id);
      if (result.success) {
        setTxHash(result.hash);
        refresh();
      }
    } finally {
      setIsFinalizing(false);
      setTimeout(() => setShowTxModal(false), 3000);
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold line-clamp-1">{proposal.title}</h3>
            <span className={`${statusColor} text-white text-xs px-2 py-1 rounded-full`}>
              {status}
            </span>
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-3">{proposal.description}</p>
          
          {/* Progress Bars */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-success-500 font-medium">Yes</span>
              <span className="text-sm text-success-500">{formatEther(proposal.yesVotes)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-success-500 h-2 rounded-full" 
                style={{ width: `${yesPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-danger-500 font-medium">No</span>
              <span className="text-sm text-danger-500">{formatEther(proposal.noVotes)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-danger-500 h-2 rounded-full" 
                style={{ width: `${noPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Deadline */}
          <div className="text-gray-400 text-sm mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDeadline(proposal.deadline)}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          {isActive && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleVote(true)}
                disabled={isVoting || !isContractReady}
                className="bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center disabled:opacity-50"
              >
                <CheckIcon className="h-5 w-5 mr-1" />
                Vote Yes
              </button>
              <button
                onClick={() => handleVote(false)}
                disabled={isVoting || !isContractReady}
                className="bg-danger-600 hover:bg-danger-700 text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center disabled:opacity-50"
              >
                <Bookmark className="h-5 w-5 mr-1" />
                Vote No
              </button>
            </div>
          )}
          
          {!proposal.executed && !isActive && isOwner && (
            <button
              onClick={handleFinalize}
              disabled={isFinalizing || !isContractReady}
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center disabled:opacity-50"
            >
              <CircleArrowLeft className="h-5 w-5 mr-1" />
              Finalize Proposal
            </button>
          )}
          
          {(proposal.executed || (!isActive && !isOwner)) && (
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
            >
              <EyeIcon className="h-5 w-5 mr-1" />
              View Results
            </button>
          )}
        </div>
      </div>
      
      <TransactionModal 
        isOpen={showTxModal} 
        txHash={txHash}
        status={isVoting || isFinalizing ? "Pending" : "Confirmed"}
      />
    </>
  );
}
