import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import Portal from '@portal-hq/web'

import pyUsdThumb from '../public/pyusd.png'
import solanaThumb from '../public/solana.png'

export interface ITokenBalance {
  balance: string
  decimals: number
  name: string
  rawBalance: string
  symbol: string
  metadata: Record<string, any> & {
    tokenMintAddress: string
  }
}

interface IPortalContext {
  ready: Boolean;
  getSolanaAddress: () => Promise<string>;
  getSolanaTokenBalances: () => Promise<ITokenBalance[]>
  sendTokensOnSolana: (to: string, tokenMint: string, tokenAmount: number) => Promise<string>
}

const PortalContext = createContext<IPortalContext>({} as IPortalContext);
export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [portal, setPortal] = useState<Portal>();

  useEffect(() => {
    setPortal(new Portal({
      apiKey: process.env.portalClientApiKey,
      autoApprove: true,
      rpcConfig: {
        [process.env.solanaChainId!]: "https://api.devnet.solana.com",
      },
    }))
  }, [])

  return (
    <PortalContext.Provider
      value={{
        ready: Boolean(portal && portal.ready),
        async getSolanaAddress() {
          if (!portal || !portal?.ready) throw new Error('Portal has not initialised');

          const walletExists = await portal.doesWalletExist()

          if (!walletExists) {
            await portal.createWallet()
          }

          const solAddress = await portal.getSolanaAddress()

          return solAddress
        },
        async getSolanaTokenBalances() {
          const res = await fetch('/api/getSolanaAssets')
          const data = await res.json()

          const pyUsdBalance: ITokenBalance = data.tokenBalances.find((tb: ITokenBalance) => tb.metadata.tokenMintAddress === process.env.pyUsdMint) || {
            balance: '0',
            decimals: 6,
            name: 'PayPal USD',
            rawBalance: '0',
            symbol: 'PYUSD',
            metadata: {
              tokenMintAddress: process.env.pyUsdMint,
            },
          }

          return [
            {
              balance: data.nativeBalance.balance,
              decimals: data.nativeBalance.decimals,
              name: data.nativeBalance.name,
              rawBalance: data.nativeBalance.rawBalance,
              symbol: data.nativeBalance.symbol,
              metadata: {
                tokenMintAddress: process.env.solMint,
                thumbnail: solanaThumb.src,
                ...data.nativeBalance.metadata,
              },
            },
            {
              ...pyUsdBalance,
              metadata: {
                ...pyUsdBalance.metadata,
                thumbnail: pyUsdThumb.src
              }
            },
            ...data.tokenBalances.filter((tb: ITokenBalance) => tb.metadata.tokenMintAddress !== process.env.pyUsdMint)
          ]
        },
        async sendTokensOnSolana(to, tokenMint, tokenAmount) {
          if (!portal || !portal?.ready) throw new Error('Portal has not initialised');

          const res = await fetch('/api/buildSolanaTransaction', {
            method: 'POST',
            body: JSON.stringify({
              to,
              token: tokenMint,
              amount: String(tokenAmount)
            })
          })
          const data = await res.json()

          if (data.error) throw new Error(data.error)

          const txnHash = await portal.request({
            chainId: process.env.solanaChainId,
            method: "sol_signAndSendTransaction",
            params: data.transaction,
          })

          return txnHash
        },
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);
