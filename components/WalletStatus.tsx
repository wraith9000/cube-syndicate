'use client'

import { useWallet } from '@/lib/useWallet'

export default function WalletStatus() {
  const { address, isConnected, balance, chain, formatAddress, getNetworkName } = useWallet()

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
      {balance && (
        <div className="wallet-status-balance">
          <span>{balance.value} {balance.symbol}</span>
        </div>
      )}
      {chain && (
        <div className="wallet-status-network">
          <span>{getNetworkName(chain.id)}</span>
        </div>
      )}
    </div>
  )
} 