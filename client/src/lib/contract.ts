import { ethers } from "ethers";
import toast from "react-hot-toast";
import MiniVoteDAOABI from "../abi/MiniVoteDAO.json";

// Replace with actual contract address
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export type Proposal = {
  id: number;
  title: string;
  description: string;
  yesVotes: string;
  noVotes: string;
  deadline: Date;
  executed: boolean;
  passed: boolean;
  proposer: string;
};

export function getContract(signer: ethers.Signer): ethers.Contract {
  return new ethers.Contract(CONTRACT_ADDRESS, MiniVoteDAOABI, signer);
}

export async function loadProposals(contract: ethers.Contract): Promise<Proposal[]> {
  try {
    const proposalCount = await contract.proposalCount();
    const proposals: Proposal[] = [];
    
    for (let i = 0; i < proposalCount; i++) {
      const proposal = await contract.proposals(i);
      proposals.push({
        id: i,
        title: proposal.title,
        description: proposal.description,
        yesVotes: proposal.yesVotes.toString(),
        noVotes: proposal.noVotes.toString(),
        deadline: new Date(Number(proposal.deadline) * 1000),
        executed: proposal.executed,
        passed: proposal.passed,
        proposer: proposal.proposer
      });
    }
    
    return proposals;
  } catch (error) {
    console.error("Failed to load proposals:", error);
    toast.error("Failed to load proposals");
    return [];
  }
}

export async function createProposal(
  contract: ethers.Contract,
  title: string,
  description: string,
  durationInDays: number
): Promise<{ hash: string, success: boolean }> {
  try {
    // Calculate deadline timestamp (current time + days in seconds)
    const deadlineTimestamp = Math.floor(Date.now() / 1000) + (durationInDays * 86400);
    
    const tx = await contract.createProposal(
      title,
      description,
      deadlineTimestamp
    );
    
    toast.loading(`Creating proposal... Transaction: ${tx.hash}`, { id: tx.hash });
    
    await tx.wait();
    
    toast.dismiss(tx.hash);
    toast.success("Proposal created successfully!");
    
    return { hash: tx.hash, success: true };
  } catch (error) {
    console.error("Failed to create proposal:", error);
    toast.error("Failed to create proposal");
    return { hash: "", success: false };
  }
}

export async function voteOnProposal(
  contract: ethers.Contract,
  proposalId: number,
  support: boolean
): Promise<{ hash: string, success: boolean }> {
  try {
    const tx = await contract.vote(proposalId, support);
    
    toast.loading(`Voting ${support ? "Yes" : "No"}... Transaction: ${tx.hash}`, { id: tx.hash });
    
    await tx.wait();
    
    toast.dismiss(tx.hash);
    toast.success(`Successfully voted ${support ? "Yes" : "No"} on proposal #${proposalId}`);
    
    return { hash: tx.hash, success: true };
  } catch (error) {
    console.error("Failed to vote on proposal:", error);
    toast.error("Failed to vote on proposal");
    return { hash: "", success: false };
  }
}

export async function finalizeProposal(
  contract: ethers.Contract,
  proposalId: number
): Promise<{ hash: string, success: boolean }> {
  try {
    const tx = await contract.finalizeProposal(proposalId);
    
    toast.loading(`Finalizing proposal... Transaction: ${tx.hash}`, { id: tx.hash });
    
    await tx.wait();
    
    toast.dismiss(tx.hash);
    toast.success(`Successfully finalized proposal #${proposalId}`);
    
    return { hash: tx.hash, success: true };
  } catch (error) {
    console.error("Failed to finalize proposal:", error);
    toast.error("Failed to finalize proposal");
    return { hash: "", success: false };
  }
}

export async function getDaoStats(contract: ethers.Contract): Promise<{
  activeMembers: number;
  activeProposals: number;
  proposalsPassed: number;
}> {
  try {
    // Get total proposals
    const proposalCount = await contract.proposalCount();
    const proposals: Proposal[] = [];
    
    // Load all proposals to calculate stats
    for (let i = 0; i < proposalCount; i++) {
      const proposal = await contract.proposals(i);
      proposals.push({
        id: i,
        title: proposal.title,
        description: proposal.description,
        yesVotes: proposal.yesVotes.toString(),
        noVotes: proposal.noVotes.toString(),
        deadline: new Date(Number(proposal.deadline) * 1000),
        executed: proposal.executed,
        passed: proposal.passed,
        proposer: proposal.proposer
      });
    }
    
    // Calculate stats
    const now = new Date();
    const activeProposals = proposals.filter(p => now < p.deadline && !p.executed).length;
    const proposalsPassed = proposals.filter(p => p.passed).length;
    
    // For active members, in a real implementation we'd need to query the contract
    // This is a placeholder until we have the actual method
    const activeMembers = 147; // Default fallback
    
    return {
      activeMembers,
      activeProposals,
      proposalsPassed,
    };
  } catch (error) {
    console.error("Failed to load DAO stats:", error);
    return {
      activeMembers: 0,
      activeProposals: 0,
      proposalsPassed: 0,
    };
  }
}
