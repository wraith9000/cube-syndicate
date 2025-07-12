import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { config } from '@/lib/wagmi'
import { formatEther } from 'viem'

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()
  const chain = config.chains.find(c => c.id === chainId)

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

  const getFormattedBalance = () => {
    if (!balance) return null
    return {
      value: parseFloat(formatEther(balance.value)).toFixed(4),
      symbol: balance.symbol
    }
  }

  return {
    address,
    isConnected,
    isConnecting,
    balance: getFormattedBalance(),
    chain,
    chains,
    switchNetwork: switchChain,
    formatAddress,
    getNetworkName
  }
} 