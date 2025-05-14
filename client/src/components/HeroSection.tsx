import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import CreateProposalModal from "./CreateProposalModal";

export default function HeroSection() {
  const { isConnected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20">
            <div className="md:flex md:items-center md:space-x-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
                  <span className="block">Decentralized</span>
                  <span className="block text-primary-500">Governance</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create proposals, vote, and participate in decentralized decision-making with MiniVoteDAO. Powered by blockchain technology for transparent and secure voting.
                </p>
                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-150 flex items-center"
                    disabled={!isConnected}
                  >
                    <span>Create Proposal</span>
                  </button>
                  <a 
                    href="https://ethereum.org/en/dao/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-150 flex items-center"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
                  alt="Decentralized governance concept" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CreateProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
