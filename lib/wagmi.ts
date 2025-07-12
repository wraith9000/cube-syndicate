import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect, coinbaseWallet, injected } from '@wagmi/connectors'

// Check if we're on mobile
const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  connectors: [
    // For mobile, prioritize WalletConnect and MetaMask
    ...(isMobile ? [
      walletConnect({ 
        projectId: '0bef745e74396258e53988801befa628',
        metadata: {
          name: 'Cube Syndicate',
          description: 'A cyberpunk cube runner game',
          url: 'https://cube-syndicate.vercel.app',
          icons: ['https://cube-syndicate.vercel.app/icon-192.png']
        },
        showQrModal: true
      }),
      metaMask(),
      coinbaseWallet({ 
        appName: 'Cube Syndicate',
        jsonRpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' // Optional: Add your Infura project ID
      })
    ] : [
      // For desktop, prioritize injected and MetaMask
      injected({
        target: 'metaMask'
      }),
      metaMask(),
      walletConnect({ 
        projectId: '0bef745e74396258e53988801befa628',
        metadata: {
          name: 'Cube Syndicate',
          description: 'A cyberpunk cube runner game',
          url: 'https://cube-syndicate.vercel.app',
          icons: ['https://cube-syndicate.vercel.app/icon-192.png']
        }
      }),
      coinbaseWallet({ 
        appName: 'Cube Syndicate'
      })
    ])
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})

export { config } 