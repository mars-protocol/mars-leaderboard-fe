'use client'

import { useEffect, useState } from 'react'

import { useChain } from '@cosmos-kit/react'

import Button from 'components/common/Button'
import Overlay from 'components/common/Overlay'
import Text from 'components/common/Text'
import { Copy, Cross, ExternalLink, Wallet } from 'components/common/Icons'
import chainConfig from 'config/chain'

export default function WalletConnectButton() {
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const { connect, isWalletConnecting, isWalletConnected, address, disconnect } = useChain(
    chainConfig.name,
  )

  const handleDisconnect = () => {
    disconnect()
    setShowModal(false)
  }

  const handleCopyAddress = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const handleViewOnExplorer = () => {
    if (address) {
      window.open(`https://mintscan.io/neutron/account/${address}`, '_blank')
    }
  }

  if (isWalletConnected && address) {
    const truncatedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

    return (
      <>
        <Button onClick={() => setShowModal(true)} leftIcon={<Wallet className='w-4 h-4' />}>
          {truncatedAddress}
        </Button>
        <Overlay
          show={showModal}
          setShow={setShowModal}
          className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-md mx-4'
        >
          <div className='relative w-full min-w-80 bg-surface p-6 border border-white/10 rounded-sm'>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-4 right-4 text-white/60 hover:text-white transition-colors'
              aria-label='Close'
            >
              <Cross className='w-4 h-4' />
            </button>

            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 rounded-full bg-linear-to-r from-green-400 to-blue-500' />
            </div>

            <div className='text-center mb-6'>
              <Text size='sm' className='text-white break-all'>
                {address}
              </Text>
            </div>

            <div className='flex gap-3 mb-4'>
              <Button
                onClick={handleCopyAddress}
                className='flex-1 justify-center py-3'
                leftIcon={<Copy className='w-4 h-4' />}
              >
                {copied ? 'Copied!' : 'Copy Address'}
              </Button>
              <Button
                onClick={handleViewOnExplorer}
                className='flex-1 justify-center py-3'
                leftIcon={<ExternalLink className='w-4 h-4' />}
              >
                View on Explorer
              </Button>
            </div>

            <Button
              onClick={handleDisconnect}
              className='w-full justify-center py-3 border-white/20 hover:bg-white/5 mb-6'
            >
              Logout
            </Button>
          </div>
        </Overlay>
      </>
    )
  }

  return (
    <Button
      onClick={connect}
      disabled={isWalletConnecting}
      className='disabled:opacity-50 disabled:cursor-not-allowed'
      leftIcon={<Wallet className='w-4 h-4' />}
    >
      {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}
