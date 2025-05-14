import { useEffect, useState, useCallback } from "react";
import { Proposal, loadProposals } from "../lib/contract";
import { useContract } from "./useContract";

type ProposalFilter = "all" | "active" | "passed" | "failed" | "finalized";

export function useProposals() {
  const { contract, isContractReady } = useContract();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [activeFilter, setActiveFilter] = useState<ProposalFilter>("all");
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchProposals = useCallback(async () => {
    if (!contract || !isContractReady) {
      setProposals([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const loadedProposals = await loadProposals(contract);
      setProposals(loadedProposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setIsLoading(false);
    }
  }, [contract, isContractReady]);
  
  useEffect(() => {
    if (isContractReady) {
      fetchProposals();
    }
  }, [fetchProposals, isContractReady]);
  
  // Filter proposals when they change or when the active filter changes
  useEffect(() => {
    if (!proposals.length) {
      setFilteredProposals([]);
      return;
    }
    
    const now = new Date();
    
    switch (activeFilter) {
      case "active":
        setFilteredProposals(
          proposals.filter(p => now < p.deadline && !p.executed)
        );
        break;
      case "passed":
        setFilteredProposals(
          proposals.filter(p => now >= p.deadline && p.passed && !p.executed)
        );
        break;
      case "failed":
        setFilteredProposals(
          proposals.filter(p => now >= p.deadline && !p.passed && !p.executed)
        );
        break;
      case "finalized":
        setFilteredProposals(proposals.filter(p => p.executed));
        break;
      case "all":
      default:
        setFilteredProposals(proposals);
        break;
    }
  }, [proposals, activeFilter]);
  
  return {
    proposals: filteredProposals,
    allProposals: proposals,
    isLoading,
    refresh: fetchProposals,
    activeFilter,
    setFilter: setActiveFilter,
  };
}
