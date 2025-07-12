import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect, coinbaseWallet, injected } from '@wagmi/connectors'

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId: 'YOUR_PROJECT_ID',
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