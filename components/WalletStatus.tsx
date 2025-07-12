'use client'

import { useWallet } from '@/lib/useWallet'
import { useState, useEffect } from 'react'

export default function WalletStatus() {
  const { address, isConnected, balance, chain, formatAddress, getNetworkName } = useWallet()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="wallet-status disconnected">
        <i className="fas fa-wallet"></i>
        <span>Not Connected</span>
      </div>
    )
  }

  if (!isConnected || !address) {
    return (
      <div className="wallet-status disconnected">
        <i className="fas fa-wallet"></i>
        <span>Not Connected</span>
      </div>
    )
  }

  return (
    <div className="wallet-status connected">
      <div className="wallet-status-main">
        <i className="fas fa-wallet"></i>
        <span>{formatAddress(address)}</span>
      </div>
      {chain && (
        <div className="wallet-status-network">
          <span>{getNetworkName(chain.id)}</span>
        </div>
      )}
    </div>
  )
} 