'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { config } from '@/lib/wagmi'
import { formatEther, formatUnits } from 'viem'

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const { address, isConnected, isConnecting: wagmiConnecting } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    // Check if we're on mobile
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  const handleConnect = async (connector: any) => {
    setIsConnecting(true)
    setError(null)
    
    try {
      await connect({ connector })
    } catch (err) {
      console.error('Connection error:', err)
      let errorMessage = 'Failed to connect wallet'
      
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message)
      }
      
      // Handle specific mobile errors
      if (isMobile && errorMessage.includes('provider not found')) {
        errorMessage = 'No wallet app detected. Please install MetaMask, WalletConnect, or another compatible wallet app.'
      } else if (errorMessage.includes('User rejected')) {
        errorMessage = 'Connection was cancelled by user'
      } else if (errorMessage.includes('No provider')) {
        errorMessage = 'No wallet provider found. Please install a compatible wallet extension.'
      }
      
      setError(errorMessage)
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

  // Filter connectors based on mobile/desktop
  const availableConnectors = connectors.filter(connector => {
    if (isMobile) {
      // On mobile, prioritize WalletConnect and MetaMask
      return ['walletConnect', 'metaMask', 'coinbaseWallet'].includes(connector.id)
    } else {
      // On desktop, show all connectors
      return true
    }
  })

  return (
    <div className="wallet-connect-container">
      {isMobile && (
        <div className="mobile-notice">
          <i className="fas fa-mobile-alt"></i>
          <span>Mobile detected - Use WalletConnect or MetaMask app</span>
        </div>
      )}
      
      <button 
        className="btn-wallet connect"
        onClick={() => {
          // On mobile, try WalletConnect first, then MetaMask
          if (isMobile) {
            const walletConnectConnector = connectors.find(c => c.id === 'walletConnect')
            const metaMaskConnector = connectors.find(c => c.id === 'metaMask')
            
            if (walletConnectConnector && walletConnectConnector.ready) {
              handleConnect(walletConnectConnector)
            } else if (metaMaskConnector && metaMaskConnector.ready) {
              handleConnect(metaMaskConnector)
            } else {
              setError('No compatible wallet found. Please install MetaMask or use WalletConnect.')
            }
          } else {
            // On desktop, try injected first
            const injectedConnector = connectors.find(c => c.id === 'injected')
            if (injectedConnector) {
              handleConnect(injectedConnector)
            }
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
        {availableConnectors.map((connector) => (
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