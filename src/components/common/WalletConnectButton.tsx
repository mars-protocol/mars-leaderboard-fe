'use client'

import classNames from 'classnames'
import { useState } from 'react'

import { useChain } from '@cosmos-kit/react'

import Overlay from 'components/common/Overlay'
import Text from 'components/common/Text'
import { Copy, Cross, ExternalLink, Wallet } from 'components/common/Icons'
import chainConfig from 'config/chain'

const buttonBaseStyles =
  'flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors'

export default function WalletConnectButton() {
  const [showModal, setShowModal] = useState(false)

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
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  const handleViewOnExplorer = () => {
    if (address) {
      window.open(`https://mintscan.io/neutron/account/${address}`, '_blank')
    }
  }

  if (isWalletConnected && address) {
    const truncatedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

    return (
      <>
        <button onClick={() => setShowModal(true)} className={buttonBaseStyles}>
          <Wallet className='w-4 h-4' />
          {truncatedAddress}
        </button>
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
              <button
                onClick={handleCopyAddress}
                className={classNames(buttonBaseStyles, 'flex-1 justify-center py-3')}
              >
                <Copy className='w-4 h-4' />
                Copy Address
              </button>
              <button
                onClick={handleViewOnExplorer}
                className={classNames(buttonBaseStyles, 'flex-1 justify-center py-3')}
              >
                <ExternalLink className='w-4 h-4' />
                View on Explorer
              </button>
            </div>

            <button
              onClick={handleDisconnect}
              className={classNames(
                buttonBaseStyles,
                'w-full justify-center py-3 border-white/20 hover:bg-white/5 mb-6',
              )}
            >
              Logout
            </button>
          </div>
        </Overlay>
      </>
    )
  }

  return (
    <button
      onClick={connect}
      disabled={isWalletConnecting}
      className={classNames(buttonBaseStyles, 'disabled:opacity-50 disabled:cursor-not-allowed')}
    >
      <Wallet className='w-4 h-4' />
      {isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
