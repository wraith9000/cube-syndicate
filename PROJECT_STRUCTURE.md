# Cube Syndicate - Project Structure

## 📁 Directory Organization

### Root Directory
```
cube-syndicate/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with PWA metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── game/
│       ├── page.tsx       # Game page
│       └── game.css       # Game-specific styles
├── components/            # React components
│   ├── GameCanvas.tsx     # Main game canvas component
│   ├── GameMenus.tsx      # Game menu components
│   ├── Leaderboard.tsx    # Leaderboard component
│   ├── LeaderboardModal.tsx # Modal wrapper
│   ├── ScriptHandler.tsx  # Script injection handler
│   └── ViewportHandler.tsx # Mobile viewport handler
├── public/               # Static assets (PWA files)
│   ├── assets/
│   │   ├── audio/        # Game audio files
│   │   └── icons/        # PWA icons
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   └── favicon.ico      # App icon
├── types/               # TypeScript definitions
│   └── global.d.ts      # Global type definitions
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── README.md           # Project documentation
```

## 🎯 Key Features

### **PWA (Progressive Web App)**
- Service Worker for offline functionality
- Web App Manifest for mobile installation
- Responsive design with mobile optimizations
- Touch controls for mobile devices

### **Game Architecture**
- Canvas-based game engine
- React state management
- TypeScript for type safety
- Modular component structure

### **Assets Organization**
- Audio files in `public/assets/audio/`
- Icons in `public/assets/icons/`
- CSS files co-located with components
- No duplicate assets

## 🚀 Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 PWA Features

- **Offline Support**: Service worker caches essential resources
- **Mobile Installation**: Can be installed on mobile devices
- **App-like Experience**: Full-screen mode, custom icons
- **Touch Controls**: Optimized for mobile gameplay

## 🎮 Game Components

- **GameCanvas**: Main game rendering and logic
- **GameMenus**: Menu system and UI
- **Leaderboard**: Score tracking and display
- **ScriptHandler**: External script management
- **ViewportHandler**: Mobile viewport optimization

## 🔧 Configuration Files

- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **next.config.js**: Next.js settings
- **manifest.json**: PWA configuration
- **sw.js**: Service worker for caching

## 📊 Type Definitions

The `types/global.d.ts` file contains:
- Window interface extensions
- Game state interfaces
- Player data types
- Power-up type definitions
- Game settings interface

This structure ensures clean separation of concerns, easy maintenance, and optimal performance for the PWA game. 