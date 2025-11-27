'use client'

import { useEffect } from 'react'

import { GasPrice } from '@cosmjs/stargate'
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation'
import { wallets as keplrWallets } from '@cosmos-kit/keplr'
import { wallets as leapWallets } from '@cosmos-kit/leap'
import { wallets as okxWallets } from '@cosmos-kit/okxwallet'
import { ChainProvider } from '@cosmos-kit/react'
import { wallets as vectisWallets } from '@cosmos-kit/vectis'
import { wallets as xdefiWallets } from '@cosmos-kit/xdefi'
import '@interchain-ui/react/styles'
import { assetLists } from 'chain-registry'

import chainConfig from 'config/chain'
import { getCosmosKitTheme } from 'theme/cosmosKitTheme'

// Extend the Window interface to include wallet properties
declare global {
  interface Window {
    keplr?: any
    leap?: any
    cosmostation?: any
    xfi?: any
    okxwallet?: any
    vectis?: any
  }
}

const chainNames = [chainConfig.name]
const chainAssets = assetLists.filter((asset) => asset.chainName === chainConfig.name)

const wallets = [
  ...keplrWallets,
  ...leapWallets,
  ...cosmostationWallets,
  ...xdefiWallets,
  ...okxWallets,
  ...vectisWallets,
]

export const CosmosKitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalTheme = getCosmosKitTheme()
  const availableWallets = wallets

  useEffect(() => {
    if (typeof window === 'undefined') return

    console.error = (...args) => {
      // Convert arguments to string for analysis
      const message = args
        .map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
        .join(' ')

      // Suppress specific wallet initialization errors
      if (
        message.includes('initClientError: Client Not Exist!') ||
        message.includes('initClientError: `projectId` is not provided') ||
        message.includes('walletconnectOptions') ||
        (message.includes('dummy-project-id') && message.includes('WalletConnect'))
      ) {
        return
      }

      // Log all other errors normally (including WalletConnect core logs)
      console.warn(...args)
    }

    // Cleanup function to restore original console methods
    return () => {
      console.error = console.warn
    }
  }, [])

  // Always provide walletConnectOptions but handle missing project ID gracefully
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  const walletConnectOptions = {
    signClient: {
      projectId: walletConnectProjectId || 'dummy-project-id',
      relayUrl: 'wss://relay.walletconnect.org',
      metadata: {
        name: 'Mars Leaderboard',
        description: 'Mars Protocol Leaderboard',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons: [],
      },
    },
  }

  return (
    <ChainProvider
      chains={chainNames}
      assetLists={chainAssets as any}
      wallets={availableWallets as any}
      throwErrors={false}
      walletConnectOptions={walletConnectOptions}
      signerOptions={{
        signingCosmwasm: () => {
          return {
            gasPrice: GasPrice.fromString('0.025untrn') as unknown as any,
          }
        },
        signingStargate: () => {
          return {
            gasPrice: GasPrice.fromString('0.025untrn') as unknown as any,
          }
        },
      }}
      modalTheme={modalTheme}
    >
      {children}
    </ChainProvider>
  )
}
