'use client'

import { useEffect, useRef, useState } from 'react'

import { useChain } from '@cosmos-kit/react'

import Button from 'components/common/Button'
import { Wallet } from 'components/common/Icons'
import chainConfig from 'config/chain'

export default function WalletConnectButton() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use the chain name from config (should be 'neutron')
  const chainName = chainConfig.name

  const { connect, isWalletConnecting, isWalletConnected, address, disconnect } =
    useChain(chainName)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleConnect = () => {
    connect()
  }

  const handleDisconnect = () => {
    disconnect()
    setShowDropdown(false)
  }

  // Truncate address for display
  const truncatedAddress = address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : ''

  // If wallet is connected, show address with disconnect option
  if (isWalletConnected && address) {
    return (
      <div className='relative' ref={dropdownRef}>
        <Button
          onClick={() => setShowDropdown(!showDropdown)}
          leftIcon={<Wallet />}
          text={truncatedAddress}
          size='sm'
        />
        {showDropdown && (
          <>
            <div className='fixed inset-0 z-40' onClick={() => setShowDropdown(false)} />
            <div className='absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px]'>
              <div className='p-2'>
                <div className='px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700'>
                  {address}
                </div>
                <button
                  onClick={handleDisconnect}
                  className='w-full text-left px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-red-600 dark:text-red-400'
                >
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Show connect button when not connected
  return (
    <Button
      onClick={handleConnect}
      disabled={isWalletConnecting}
      leftIcon={<Wallet />}
      text={isWalletConnecting ? 'Connecting...' : 'Connect Wallet'}
      size='sm'
      showProgressIndicator={isWalletConnecting}
    />
  )
}
