import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ViewportHandler from '@/components/ViewportHandler'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sliding Cube - Cyberpunk Runner Game',
  description: 'Navigate your neon cube through an endless cyberpunk world. Jump over obstacles, collect power-ups, and survive as long as possible in this addictive runner game.',
  keywords: 'sliding cube, cyberpunk game, endless runner, puzzle game, browser game, mobile game',
  authors: [{ name: 'Sliding Cube' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/icons/icon-152.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://cube-syndicate.vercel.app/',
    title: 'Sliding Cube - Cyberpunk Runner Game',
    description: 'Navigate your neon cube through an endless cyberpunk world. Jump over obstacles, collect power-ups, and survive as long as possible!',
    images: ['https://cube-syndicate.vercel.app/favicon.ico'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sliding Cube - Cyberpunk Runner Game',
    description: 'Navigate your neon cube through an endless cyberpunk world. Jump over obstacles, collect power-ups, and survive as long as possible!',
    images: ['https://cube-syndicate.vercel.app/favicon.ico'],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Sliding Cube',
    'application-name': 'Sliding Cube',
    'theme-color': '#0d0221',
    'msapplication-TileColor': '#0d0221',
    'msapplication-navbutton-color': '#0d0221',
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: '#0d0221',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" />
        {/* Mobile-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sliding Cube" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0d0221" />
        <meta name="msapplication-TileColor" content="#0d0221" />
        <meta name="format-detection" content="telephone=no" />
        {/* PWA icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/icon-96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/icon-72.png" />
        <link rel="apple-touch-icon" href="/assets/icons/icon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/icon-152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/icon-144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/icon-128.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/icon-96.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/icon-72.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/icon-72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/icon-72.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/icon-72.png" />
      </head>
      <body className={inter.className}>
        <ViewportHandler />
        {children}
        
        {/* Firebase SDK removed for consistency; use dynamic import in React components only. */}
        
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js?v=' + Date.now())
                        .then(registration => {
                            // Service worker registered successfully
                        })
                        .catch(registrationError => {
                            // Service worker registration failed
                        });
                });
            }
            
            // Mobile-specific optimizations
            document.addEventListener('DOMContentLoaded', function() {
                // Prevent zoom on double tap
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function (event) {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false);
                
                // Prevent pull-to-refresh on mobile
                document.body.addEventListener('touchmove', function(e) {
                    if (e.target.closest('.game-page')) {
                        e.preventDefault();
                    }
                }, { passive: false });
            });
          `
        }} />
      </body>
    </html>
  )
} 