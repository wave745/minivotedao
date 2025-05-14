import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, isPast } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEther(wei: string): string {
  try {
    const weiValue = BigInt(wei);
    const etherString = (Number(weiValue) / 10**18).toFixed(2);
    return `${etherString} ETH`;
  } catch (error) {
    return "0 ETH";
  }
}

export function formatDeadline(deadline: Date): string {
  if (!deadline) return "";
  
  if (isPast(deadline)) {
    return `Voting ended on ${format(deadline, 'MMM d, yyyy')}`;
  }
  
  return `Ends in ${formatDistanceToNow(deadline)}`;
}

export function calculatePercentage(value: string, total: string): number {
  try {
    const valueNum = BigInt(value);
    const totalNum = BigInt(total);
    
    if (totalNum === BigInt(0)) return 0;
    
    // Multiply by 100 for percentage and by 100 again for 2 decimal places
    const percentage = (valueNum * BigInt(10000)) / totalNum;
    return Number(percentage) / 100;
  } catch (error) {
    return 0;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-primary-500';
    case 'Passed':
      return 'bg-success-500';
    case 'Failed':
      return 'bg-danger-500';
    case 'Finalized':
      return 'bg-secondary-500';
    default:
      return 'bg-gray-500';
  }
}

export function getProposalStatus(proposal: {
  deadline: Date;
  executed: boolean;
  passed: boolean;
}): string {
  const { deadline, executed, passed } = proposal;
  
  if (executed) {
    return 'Finalized';
  }
  
  if (new Date() < deadline) {
    return 'Active';
  }
  
  return passed ? 'Passed' : 'Failed';
}

export function getNetworkName(chainId: number): string {
  switch (chainId) {
    case 1:
      return "Ethereum Mainnet";
    case 5:
      return "Goerli Testnet";
    case 11155111:
      return "Sepolia Testnet";
    case 137:
      return "Polygon Mainnet";
    case 80001:
      return "Mumbai Testnet";
    case 42161:
      return "Arbitrum One";
    case 421613:
      return "Arbitrum Goerli";
    default:
      return "Unknown Network";
  }
}
