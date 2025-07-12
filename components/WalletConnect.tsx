'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { config } from '@/lib/wagmi'
import { formatEther, formatUnits } from 'viem'

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { address, isConnected, isConnecting: wagmiConnecting } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const handleConnect = async (connector: any) => {
    setIsConnecting(true)
    setError(null)
    
    try {
      await connect({ connector })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setError(null)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getNetworkName = (chainId?: number) => {
    switch (chainId) {
      case 1: return 'Ethereum'
      case 137: return 'Polygon'
      case 10: return 'Optimism'
      case 42161: return 'Arbitrum'
      case 8453: return 'Base'
      case 11155111: return 'Sepolia'
      default: return 'Unknown'
    }
  }

  const chain = config.chains.find(c => c.id === chainId)

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <div className="wallet-address">
            <i className="fas fa-wallet"></i>
            <span>{formatAddress(address)}</span>
          </div>
          {balance && (
            <div className="wallet-balance">
              <span>{parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}</span>
            </div>
          )}
          {chain && (
            <div className="wallet-network">
              <span>{getNetworkName(chain.id)}</span>
            </div>
          )}
        </div>
        <button 
          className="btn-wallet disconnect" 
          onClick={handleDisconnect}
          disabled={isConnecting}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Disconnect</span>
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-connect-container">
      <button 
        className="btn-wallet connect"
        onClick={() => {
          const injectedConnector = connectors.find(c => c.id === 'injected')
          if (injectedConnector) {
            handleConnect(injectedConnector)
          }
        }}
        disabled={isConnecting || wagmiConnecting}
      >
        <i className="fas fa-wallet"></i>
        <span>
          {isConnecting || wagmiConnecting ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </button>
      
      {error && (
        <div className="wallet-error">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
        </div>
      )}
      
      {connectError && (
        <div className="wallet-error">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{connectError.message}</span>
        </div>
      )}
      
      {/* Wallet Options Dropdown */}
      <div className="wallet-options">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            className="wallet-option"
            onClick={() => handleConnect(connector)}
            disabled={!connector.ready || isConnecting}
          >
            <i className={`fas fa-${getWalletIcon(connector.id)}`}></i>
            <span>{getWalletName(connector.id)}</span>
            {!connector.ready && <span className="unavailable">(Unavailable)</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

function getWalletIcon(connectorId: string): string {
  switch (connectorId) {
    case 'injected': return 'link'
    case 'metaMask': return 'shield-alt'
    case 'walletConnect': return 'qrcode'
    case 'coinbaseWallet': return 'coins'
    default: return 'wallet'
  }
}

function getWalletName(connectorId: string): string {
  switch (connectorId) {
    case 'injected': return 'Browser Wallet'
    case 'metaMask': return 'MetaMask'
    case 'walletConnect': return 'WalletConnect'
    case 'coinbaseWallet': return 'Coinbase Wallet'
    default: return 'Unknown Wallet'
  }
} 