import { useState, useEffect, useCallback } from "react";
import { connectWallet, listenToAccountChanges, listenToChainChanges, WalletConnection } from "../lib/wallet";

export function useWallet() {
  const [connection, setConnection] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = useCallback(async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      const walletConnection = await connectWallet();
      if (walletConnection) {
        setConnection(walletConnection);
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);
  
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        handleConnect();
      }
    };
    
    checkExistingConnection();
  }, [handleConnect]);
  
  useEffect(() => {
    const accountsChangedCleanup = listenToAccountChanges((accounts) => {
      if (accounts.length === 0) {
        // User disconnected
        setConnection(null);
      } else if (connection && accounts[0] !== connection.address) {
        // Account changed, reconnect
        handleConnect();
      }
    });
    
    const chainChangedCleanup = listenToChainChanges(() => {
      // Chain changed, reconnect
      handleConnect();
    });
    
    return () => {
      accountsChangedCleanup();
      chainChangedCleanup();
    };
  }, [connection, handleConnect]);
  
  return {
    connection,
    isConnecting,
    connect: handleConnect,
    isConnected: !!connection,
    address: connection?.address || "",
    chainId: connection?.chainId || 0,
  };
}
