import { ethers } from "ethers";
import toast from "react-hot-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type WalletConnection = {
  provider: ethers.BrowserProvider;
  signer: ethers.Signer;
  address: string;
  chainId: number;
};

export async function connectWallet(): Promise<WalletConnection | null> {
  if (!window.ethereum) {
    toast.error("MetaMask not detected! Please install MetaMask extension.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Request accounts access
    await provider.send("eth_requestAccounts", []);
    
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const { chainId } = await provider.getNetwork();
    
    toast.success(`Connected to ${address.slice(0, 6)}...${address.slice(-4)}`);
    
    return { provider, signer, address, chainId: Number(chainId) };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    toast.error("Failed to connect wallet");
    return null;
  }
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

export function listenToAccountChanges(callback: (accounts: string[]) => void): () => void {
  if (!window.ethereum) return () => {};
  
  const handleAccountsChanged = (accounts: string[]) => {
    callback(accounts);
  };
  
  window.ethereum.on("accountsChanged", handleAccountsChanged);
  
  return () => {
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
  };
}

export function listenToChainChanges(callback: (chainId: string) => void): () => void {
  if (!window.ethereum) return () => {};
  
  const handleChainChanged = (chainId: string) => {
    callback(chainId);
  };
  
  window.ethereum.on("chainChanged", handleChainChanged);
  
  return () => {
    window.ethereum.removeListener("chainChanged", handleChainChanged);
  };
}
