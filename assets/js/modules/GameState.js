/**
 * GameState.js - Manages overall game state and transitions
 */

export class GameState {
    constructor() {
        this.state = 'menu'; // menu, playing, over, paused
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('slidingCubeHighScore')) || 0;
        this.gameSpeed = 300;
        this.lastTime = 0;
        this.slowMoActive = false;
        this.slowMoTimer = 0;
        this.currentMenu = 'landing';
        
        // Visual effects state
        this.screenShake = 0;
        this.cameraOffset = { x: 0, y: 0 };
        this.pulseEffect = 0;
        this.glowIntensity = 0;
        this.rainbowHue = 0;
        
        // Game constants
        this.SLOW_MO_DURATION = 5; // 5 seconds
        this.SLOW_MO_FACTOR = 0.5; // Halves the game speed
        this.GRAVITY = 2000;
        this.JUMP_FORCE = -700;
        this.WORLD_WIDTH = 1600;
    }

    // State management
    setState(newState) {
        this.state = newState;
        this.onStateChange?.(newState);
    }

    isPlaying() {
        return this.state === 'playing';
    }

    isMenu() {
        return this.state === 'menu';
    }

    isGameOver() {
        return this.state === 'over';
    }

    // Score management
    addScore(points) {
        this.score += points;
        this.checkHighScore();
    }

    resetScore() {
        this.score = 0;
    }

    checkHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('slidingCubeHighScore', this.highScore.toString());
            return true;
        }
        return false;
    }

    // Game speed management
    setGameSpeed(speed) {
        this.gameSpeed = speed;
    }

    getGameSpeed() {
        return this.slowMoActive ? this.gameSpeed * this.SLOW_MO_FACTOR : this.gameSpeed;
    }

    // Slow motion management
    activateSlowMo() {
        if (!this.slowMoActive) {
            this.slowMoActive = true;
            this.slowMoTimer = this.SLOW_MO_DURATION;
        }
    }

    updateSlowMo(deltaTime) {
        if (this.slowMoActive) {
            this.slowMoTimer -= deltaTime;
            if (this.slowMoTimer <= 0) {
                this.slowMoActive = false;
            }
        }
    }

    // Visual effects management
    addScreenShake(intensity) {
        this.screenShake = Math.max(this.screenShake, intensity);
    }

    updateVisualEffects(deltaTime) {
        // Update screen shake
        if (this.screenShake > 0) {
            this.screenShake -= deltaTime * 5;
            if (this.screenShake < 0) this.screenShake = 0;
            
            this.cameraOffset.x = (Math.random() - 0.5) * this.screenShake * 10;
            this.cameraOffset.y = (Math.random() - 0.5) * this.screenShake * 10;
        } else {
            this.cameraOffset.x = 0;
            this.cameraOffset.y = 0;
        }

        // Update pulse effect
        this.pulseEffect += deltaTime;
        
        // Update rainbow hue
        this.rainbowHue = (this.rainbowHue + deltaTime * 50) % 360;
    }

    // Menu management
    setCurrentMenu(menuName) {
        this.currentMenu = menuName;
    }

    getCurrentMenu() {
        return this.currentMenu;
    }

    // Reset game state
    reset() {
        this.score = 0;
        this.gameSpeed = 300;
        this.slowMoActive = false;
        this.slowMoTimer = 0;
        this.screenShake = 0;
        this.cameraOffset = { x: 0, y: 0 };
        this.pulseEffect = 0;
        this.glowIntensity = 0;
        this.rainbowHue = 0;
    }

    // Event handlers
    onStateChange(callback) {
        this.onStateChange = callback;
    }
}

// Export singleton instance
export const gameState = new GameState(); 