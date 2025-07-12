// Global type definitions for Cube Syndicate game

declare global {
  interface Window {
    // Ethereum wallet integration (legacy support)
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
      isMetaMask?: boolean;
    };
    
    // Firebase integration
    firebase?: any;
    db?: any;
    collection?: any;
    query?: any;
    orderBy?: any;
    limit?: any;
    getDocs?: any;
    
    // Game-specific globals
    gameCanvas?: HTMLCanvasElement;
    gameContext?: CanvasRenderingContext2D;
    
    // Audio context for game sounds
    audioContext?: AudioContext;
    
    // Audio functions for game sounds
    playLaserSound?: () => void;
    playCollectSound?: () => void;
    
    // Service worker registration
    serviceWorker?: ServiceWorkerRegistration;
  }
  
  // Game state interfaces
  interface GameState {
    score: number;
    highScore: number;
    isPlaying: boolean;
    isPaused: boolean;
    gameOver: boolean;
  }
  
  // Player data interface
  interface PlayerData {
    walletAddress?: string;
    highScore: number;
    totalGames: number;
    totalScore: number;
  }
  
  // Power-up types
  type PowerUpType = 'slowMotion' | 'shield' | 'laser';
  
  // Game settings interface
  interface GameSettings {
    musicVolume: number;
    sfxVolume: number;
    visualEffects: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
  }
}

export {}; 