import { useState } from "react";
import { useContract } from "../hooks/useContract";
import { createProposal } from "../lib/contract";
import TransactionModal from "./TransactionModal";
import { XIcon } from "lucide-react";

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProposalCreated?: () => void;
}

export default function CreateProposalModal({
  isOpen,
  onClose,
  onProposalCreated
}: CreateProposalModalProps) {
  const { contract, isContractReady } = useContract();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationInDays, setDurationInDays] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [showTxModal, setShowTxModal] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contract || !isContractReady || !title || !description) {
      return;
    }
    
    setIsSubmitting(true);
    setShowTxModal(true);
    
    try {
      const result = await createProposal(contract, title, description, durationInDays);
      if (result.success) {
        setTxHash(result.hash);
        
        // Reset form
        setTitle("");
        setDescription("");
        setDurationInDays(7);
        
        // Close modal after successful creation
        setTimeout(() => {
          onClose();
          if (onProposalCreated) {
            onProposalCreated();
          }
        }, 3000);
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowTxModal(false), 3000);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Create New Proposal</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="proposal-title" className="block text-sm font-medium text-gray-300 mb-2">
                Proposal Title
              </label>
              <input
                type="text"
                id="proposal-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter a clear, concise title"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="proposal-description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="proposal-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Explain your proposal in detail..."
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="proposal-deadline" className="block text-sm font-medium text-gray-300 mb-2">
                Voting Duration (days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="proposal-deadline"
                  min="1"
                  max="30"
                  value={durationInDays}
                  onChange={(e) => setDurationInDays(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400">days</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">Minimum 1 day, maximum 30 days</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isContractReady}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors duration-150 flex items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Proposal
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <TransactionModal
        isOpen={showTxModal}
        txHash={txHash}
        status={isSubmitting ? "Pending" : "Confirmed"}
      />
    </>
  );
}
