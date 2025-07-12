import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cube Syndicate',
  projectId: '0bef745e74396258e53988801befa628', // Your WalletConnect project ID
  chains: [avalanche],
  ssr: false,
}); 