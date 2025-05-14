import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import { getDaoStats } from "../lib/contract";

type Stats = {
  activeMembers: number;
  activeProposals: number;
  proposalsPassed: number;
};

export default function StatsOverview() {
  const { contract, isContractReady } = useContract();
  const [stats, setStats] = useState<Stats>({
    activeMembers: 0,
    activeProposals: 0,
    proposalsPassed: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!contract || !isContractReady) return;
      
      setIsLoading(true);
      try {
        const daoStats = await getDaoStats(contract);
        setStats(daoStats);
      } catch (error) {
        console.error("Failed to fetch DAO stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, [contract, isContractReady]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary-500/10 text-primary-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-400">Active Members</p>
            {isLoading ? (
              <div className="h-8 bg-gray-700 animate-pulse rounded w-16 mt-1"></div>
            ) : (
              <p className="text-2xl font-bold">{stats.activeMembers}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-secondary-500/10 text-secondary-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-400">Active Proposals</p>
            {isLoading ? (
              <div className="h-8 bg-gray-700 animate-pulse rounded w-16 mt-1"></div>
            ) : (
              <p className="text-2xl font-bold">{stats.activeProposals}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-success-500/10 text-success-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-400">Proposals Passed</p>
            {isLoading ? (
              <div className="h-8 bg-gray-700 animate-pulse rounded w-16 mt-1"></div>
            ) : (
              <p className="text-2xl font-bold">{stats.proposalsPassed}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
