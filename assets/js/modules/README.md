# Game Modules Architecture

This directory contains the modularized components of the Cube Syndicate game, breaking down the original monolithic `game.js` file into focused, maintainable modules.

## 📁 Module Structure

```
modules/
├── Config.js           # Centralized configuration and constants
├── GameState.js        # Game state management and transitions
├── AudioManager.js     # Audio loading, playing, and volume control
├── Player.js           # Player physics, controls, and rendering
├── ParticleSystem.js   # Particle effects and visual feedback
├── ObstacleManager.js  # Obstacle spawning, management, and rendering
├── PowerUpSystem.js    # Power-up logic and effects
├── GameEngine.js       # Main game controller and coordination
└── README.md           # This file
```

## 🔧 Module Dependencies

```
GameEngine.js
├── GameState.js
├── AudioManager.js
├── Player.js
├── ParticleSystem.js
├── ObstacleManager.js
└── PowerUpSystem.js

Player.js
├── GameState.js
├── AudioManager.js
└── ParticleSystem.js

ParticleSystem.js
└── GameState.js

ObstacleManager.js
├── GameState.js
└── ParticleSystem.js

PowerUpSystem.js
├── GameState.js
├── AudioManager.js
└── ParticleSystem.js
```

## 🚀 Usage

### Basic Setup

```javascript
import GameEngine from './modules/GameEngine.js';
import { CONFIG } from './modules/Config.js';

// Initialize game engine
const canvas = document.getElementById('gameCanvas');
const gameEngine = new GameEngine(canvas);

// Load audio
gameEngine.loadAudio(() => {
    console.log('Audio loaded successfully');
});

// Start game
gameEngine.start();
```

### Accessing Individual Modules

```javascript
import { gameState } from './modules/GameState.js';
import { player } from './modules/Player.js';
import { audioManager } from './modules/AudioManager.js';
import { particleSystem } from './modules/ParticleSystem.js';
import { obstacleManager } from './modules/ObstacleManager.js';
import { powerUpSystem } from './modules/PowerUpSystem.js';
import { CONFIG } from './modules/Config.js';

// Use modules directly
gameState.setState('playing');
player.jump();
audioManager.play('music');
particleSystem.createExplosion(100, 100);
```

## 📋 Module Responsibilities

### GameState.js
- **Purpose**: Central state management for the entire game
- **Responsibilities**:
  - Game state transitions (menu, playing, over, paused)
  - Score tracking and high score management
  - Game speed control and slow motion
  - Visual effects state (screen shake, camera offset, etc.)
  - Menu state management

### AudioManager.js
- **Purpose**: Handle all audio-related functionality
- **Responsibilities**:
  - Audio file loading and management
  - Sound playback with volume control
  - Music and SFX volume settings
  - Audio enable/disable toggle
  - Local storage for audio preferences

### Player.js
- **Purpose**: Player character physics, controls, and rendering
- **Responsibilities**:
  - Player movement and physics (gravity, jumping)
  - Collision detection
  - Visual rendering with effects
  - Power-up state management (shield, laser ready)
  - After-image trail effects

### ParticleSystem.js
- **Purpose**: Visual effects and particle management
- **Responsibilities**:
  - Particle creation and management
  - Star field background
  - Effect creation (jump, landing, explosion, electric burst)
  - Particle physics and rendering
  - Memory management (particle cleanup)

### ObstacleManager.js
- **Purpose**: Obstacle spawning and management
- **Responsibilities**:
  - Procedural obstacle generation
  - Obstacle movement and cleanup
  - Collision detection with player
  - Level chunk management
  - Obstacle rendering with effects

### PowerUpSystem.js
- **Purpose**: Power-up logic and effects
- **Responsibilities**:
  - Power-up spawning and management
  - Power-up collection and effects
  - Laser beam creation and management
  - Power-up rendering
  - Effect coordination with other systems

### GameEngine.js
- **Purpose**: Main game controller and coordinator
- **Responsibilities**:
  - Game loop management
  - Module coordination and updates
  - Input handling
  - Canvas management
  - Game initialization and cleanup
  - UI rendering

### Config.js
- **Purpose**: Centralized configuration management
- **Responsibilities**:
  - Game constants and settings
  - Color definitions
  - Audio configuration
  - Particle system settings
  - Power-up and obstacle settings
  - Local storage keys

## 🔄 Event System

Modules communicate through events and callbacks:

```javascript
// Power-up system events
powerUpSystem.onShieldActivate = () => {
    player.setShielded(true);
    showToast('Shield activated!');
};

powerUpSystem.onLaserActivate = () => {
    player.setLaserReady(true);
    showToast('Laser ready!');
};

// Player events
player.onLaserActivate = () => {
    powerUpSystem.createLaser(player.x, player.y);
};
```

## 🎯 Benefits of Modular Architecture

1. **Maintainability**: Each module has a single responsibility
2. **Testability**: Modules can be tested independently
3. **Reusability**: Modules can be reused in other projects
4. **Scalability**: Easy to add new features or modify existing ones
5. **Debugging**: Issues can be isolated to specific modules
6. **Performance**: Better code organization leads to optimized execution

## 🔧 Migration from Monolithic Structure

The original `game.js` file has been broken down as follows:

- **Global variables** → `Config.js` and `GameState.js`
- **Audio system** → `AudioManager.js`
- **Player logic** → `Player.js`
- **Particle effects** → `ParticleSystem.js`
- **Obstacle system** → `ObstacleManager.js`
- **Power-up system** → `PowerUpSystem.js`
- **Game loop** → `GameEngine.js`

## 📝 Development Guidelines

1. **Single Responsibility**: Each module should have one clear purpose
2. **Loose Coupling**: Minimize dependencies between modules
3. **Event-Driven**: Use events for inter-module communication
4. **Configuration**: Use `Config.js` for all constants and settings
5. **Error Handling**: Implement proper error handling in each module
6. **Documentation**: Add JSDoc comments for all public methods

## 🚀 Future Enhancements

- **TypeScript Migration**: Add type safety to all modules
- **Unit Tests**: Add comprehensive test coverage
- **Performance Monitoring**: Add performance metrics
- **Plugin System**: Allow for modular feature additions
- **State Persistence**: Add save/load functionality 