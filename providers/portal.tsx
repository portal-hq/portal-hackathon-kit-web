import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import Portal from '@portal-hq/web'

interface IPortalContext {
  ready: Boolean
  getSolanaWallet: () => Promise<string>;
}

const portalContext = createContext<IPortalContext | null>(null);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [portal, setPortal] = useState<Portal>();
  const isPortalReady = Boolean(portal?.ready);

  useEffect(() => {
    setPortal(new Portal({
      apiKey: process.env.portalClientApiKey,
      autoApprove: true,
      rpcConfig: {
        "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "https://api.mainnet-beta.solana.com",
        "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1": "https://api.devnet.solana.com",
      },
    }))
  }, [])

  return (
    <portalContext.Provider
      value={{
        ready: isPortalReady,
        async getSolanaWallet() {
          if (!portal || !isPortalReady) throw new Error('Portal has not initialised');

          const walletExists = await portal.doesWalletExist()
          console.log('walletExists', walletExists)

          if (!walletExists) {
            await portal.createWallet()
          }

          const solAddress = await portal.getSolanaAddress()
          console.log('solAddress', solAddress)

          return solAddress
        }
      }}
    >
      {children}
    </portalContext.Provider>
  );
};

export const usePortal = () => useContext(portalContext);
