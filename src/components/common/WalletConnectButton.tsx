'use client'

import { useState } from 'react'

import { useChain } from '@cosmos-kit/react'

import Overlay from 'components/common/Overlay'
import { Copy, Cross, ExternalLink, Wallet } from 'components/common/Icons'
import chainConfig from 'config/chain'

export default function WalletConnectButton() {
  const [showModal, setShowModal] = useState(false)

  const chainName = chainConfig.name

  const { connect, isWalletConnecting, isWalletConnected, address, disconnect } =
    useChain(chainName)

  const handleConnect = () => {
    connect()
  }

  const handleDisconnect = () => {
    disconnect()
    setShowModal(false)
  }

  const handleCopyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
      } catch (err) {
        console.error('Failed to copy address:', err)
      }
    }
  }

  const handleViewOnExplorer = () => {
    if (address) {
      window.open(`https://mintscan.io/neutron/account/${address}`, '_blank')
    }
  }

  const truncatedAddress = address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : ''

  if (isWalletConnected && address) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className='flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer'
        >
          <Wallet className='w-4 h-4' />
          <span>{truncatedAddress}</span>
        </button>
        <Overlay
          show={showModal}
          setShow={setShowModal}
          className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-md mx-4'
        >
          <div className='relative w-full min-w-80 bg-surface p-6 border border-white/10 rounded-sm'>
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer'
              aria-label='Close'
            >
              <Cross className='w-4 h-4' />
            </button>

            {/* Avatar */}
            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 rounded-full bg-linear-to-r from-green-400 to-blue-500' />
            </div>

            {/* Address */}
            <div className='text-center mb-6'>
              <p className='text-white text-sm font-mono break-all'>{address}</p>
            </div>

            {/* Action buttons */}
            <div className='flex gap-3 mb-4'>
              <button
                onClick={handleCopyAddress}
                className='flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors cursor-pointer'
              >
                <Copy className='w-4 h-4' />
                Copy Address
              </button>
              <button
                onClick={handleViewOnExplorer}
                className='flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors cursor-pointer'
              >
                <ExternalLink className='w-4 h-4' />
                View on Explorer
              </button>
            </div>

            {/* Logout button */}
            <button
              onClick={handleDisconnect}
              className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-white/20 hover:bg-white/5 text-white text-sm transition-colors mb-6 cursor-pointer'
            >
              Logout
            </button>

            {/* Transaction history section */}
            {/* <div className='bg-black/20 rounded-sm p-4'>
              <p className='text-white/60 text-sm text-center'>
                Your transactions will appear here
              </p>
            </div> */}
          </div>
        </Overlay>
      </>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isWalletConnecting}
      className='flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <Wallet className='w-4 h-4' />
      <span>{isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  )
}
