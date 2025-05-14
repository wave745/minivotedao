import { useState } from "react";
import { useProposals } from "../hooks/useProposals";
import { useWallet } from "../hooks/useWallet";
import ProposalCard from "./ProposalCard";
import ProposalFilters from "./ProposalFilters";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import CreateProposalModal from "./CreateProposalModal";

export default function ProposalList() {
  const { isConnected } = useWallet();
  const { proposals, isLoading, refresh, activeFilter, setFilter } = useProposals();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Proposal Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Proposals</h2>
          <p className="text-gray-400 mt-1">Vote on current proposals or create a new one</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={!isConnected}
          className="mt-4 sm:mt-0 bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-150 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Proposal
        </button>
      </div>
      
      {/* Proposal Filters */}
      <ProposalFilters
        activeFilter={activeFilter}
        onFilterChange={(filter) => setFilter(filter as any)}
      />
      
      {/* Loading State */}
      {isLoading && <LoadingState />}
      
      {/* Empty State */}
      {!isLoading && proposals.length === 0 && <EmptyState onCreateProposal={() => setIsModalOpen(true)} />}
      
      {/* Proposal Cards */}
      {!isLoading && proposals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <ProposalCard 
              key={proposal.id} 
              proposal={proposal} 
              refresh={refresh}
            />
          ))}
        </div>
      )}
      
      {/* Create Proposal Modal */}
      <CreateProposalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onProposalCreated={refresh}
      />
    </div>
  );
}
