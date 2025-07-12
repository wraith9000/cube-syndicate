'use client';

import { useEffect } from 'react';

export default function ScriptHandler() {
  useEffect(() => {
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

    // Initialize service worker
    initializeServiceWorker();
  }, []);

  return null; // This component doesn't render anything
} 