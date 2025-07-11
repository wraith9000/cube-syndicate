'use client';

import { useEffect } from 'react';

export default function ScriptHandler() {
  useEffect(() => {
    // Initialize wallet connection
    (window as any).currentAccount = null;
    (window as any).walletConnected = false;

    const initializeWallet = async () => {
      if (typeof (window as any).ethereum !== 'undefined') {
        try {
          // Get accounts without prompting user
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            (window as any).currentAccount = accounts[0];
            (window as any).walletConnected = true;
            // Optionally, update UI or show wallet info
          }
        } catch (e) {
          (window as any).currentAccount = null;
          (window as any).walletConnected = false;
        }
      }
    };

    // Initialize service worker
    const initializeServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              // Service worker registered successfully
            })
            .catch(registrationError => {
              // Service worker registration failed
            });
        });
      }
    };

    // Initialize everything
    initializeWallet();
    initializeServiceWorker();
  }, []);

  return null; // This component doesn't render anything
} 