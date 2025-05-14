import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../lib/contract";
import { useWallet } from "./useWallet";

export function useContract() {
  const { connection, isConnected } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    const initContract = async () => {
      if (connection && connection.signer) {
        // Create contract instance
        const contractInstance = getContract(connection.signer);
        setContract(contractInstance);
        
        // Check if connected address is the owner
        try {
          const owner = await contractInstance.owner();
          setIsOwner(owner.toLowerCase() === connection.address.toLowerCase());
        } catch (error) {
          console.error("Failed to check contract owner:", error);
          setIsOwner(false);
        }
      } else {
        setContract(null);
        setIsOwner(false);
      }
    };
    
    initContract();
  }, [connection]);
  
  return {
    contract,
    isOwner,
    isContractReady: !!contract && isConnected,
  };
}
