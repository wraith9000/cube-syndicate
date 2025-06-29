/**
 * GameEngine.js - Main game controller that coordinates all modules
 */

import { gameState } from './GameState.js';
import { audioManager } from './AudioManager.js';
import { player } from './Player.js';
import { particleSystem } from './ParticleSystem.js';
import { obstacleManager } from './ObstacleManager.js';
import { powerUpSystem } from './PowerUpSystem.js';

export class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
        this.lastTime = 0;
        this.worldHeight = 0;
        this.groundY = 0;
        
        // Initialize modules
        this.initializeModules();
        this.setupEventListeners();
    }

    /**
     * Initialize all game modules
     */
    initializeModules() {
        // Set up power-up system event handlers
        powerUpSystem.onShieldActivate = () => {
            player.setShielded(true);
            this.showToast('Shield activated!', 2000);
        };

        powerUpSystem.onLaserActivate = () => {
            player.setLaserReady(true);
            this.showToast('Laser ready! Land to activate!', 2000);
        };

        powerUpSystem.onSlowMoActivate = () => {
            this.showToast('Slow motion activated!', 2000);
        };

        // Set up player event handlers
        player.onLaserActivate = () => {
            powerUpSystem.createLaser(player.x + player.width / 2, player.y + player.height / 2);
        };
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Handle input
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && gameState.isPlaying()) {
                e.preventDefault();
                player.jump();
            }
        });

        // Handle touch input
        this.canvas.addEventListener('touchstart', (e) => {
            if (gameState.isPlaying()) {
                e.preventDefault();
                player.jump();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    /**
     * Start the game
     */
    start() {
        this.isRunning = true;
        gameState.setState('playing');
        gameState.reset();
        
        // Reset all modules
        player.reset();
        particleSystem.clear();
        obstacleManager.clear();
        powerUpSystem.clear();
        
        // Start game loop
        this.gameLoop();
    }

    /**
     * Stop the game
     */
    stop() {
        this.isRunning = false;
        gameState.setState('menu');
    }

    /**
     * Main game loop
     * @param {number} timestamp - Current timestamp
     */
    gameLoop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update game state
        gameState.updateSlowMo(deltaTime);
        gameState.updateVisualEffects(deltaTime);

        // Update all systems
        this.update(deltaTime);

        // Draw everything
        this.draw();

        // Continue game loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    /**
     * Update all game systems
     * @param {number} deltaTime - Time elapsed since last frame
     */
    update(deltaTime) {
        if (!gameState.isPlaying()) return;

        // Update player
        player.update(deltaTime, this.groundY);

        // Update particle system
        particleSystem.update(deltaTime);

        // Update obstacles
        obstacleManager.update(deltaTime, this.groundY);
        obstacleManager.updateSpawning(this.groundY);

        // Update power-ups
        powerUpSystem.update(deltaTime, player);
        powerUpSystem.spawnPowerUp(this.groundY);

        // Check collisions
        this.checkCollisions();

        // Update score
        gameState.addScore(Math.floor(deltaTime * 10));

        // Increase game speed over time
        const newSpeed = gameState.gameSpeed + deltaTime * 2;
        gameState.setGameSpeed(newSpeed);
    }

    /**
     * Check all collisions
     */
    checkCollisions() {
        // Check obstacle collisions
        const collidingObstacle = obstacleManager.checkPlayerCollision(player);
        if (collidingObstacle) {
            if (player.isShielded()) {
                // Shield protects from collision
                player.setShielded(false);
                obstacleManager.createObstacleExplosion(collidingObstacle);
                obstacleManager.removeObstacle(obstacleManager.getObstacles().indexOf(collidingObstacle));
                this.showToast('Shield destroyed!', 1500);
            } else {
                // Game over
                this.gameOver();
            }
        }

        // Check laser collisions with obstacles
        for (const laser of powerUpSystem.lasers) {
            for (let i = obstacleManager.getObstacles().length - 1; i >= 0; i--) {
                const obstacle = obstacleManager.getObstacles()[i];
                if (this.checkLaserObstacleCollision(laser, obstacle)) {
                    obstacleManager.createObstacleExplosion(obstacle);
                    obstacleManager.removeObstacle(i);
                }
            }
        }
    }

    /**
     * Check collision between laser and obstacle
     * @param {Laser} laser - Laser object
     * @param {Object} obstacle - Obstacle object
     * @returns {boolean} True if collision detected
     */
    checkLaserObstacleCollision(laser, obstacle) {
        return (
            laser.x < obstacle.x + obstacle.width &&
            laser.x + laser.width > obstacle.x &&
            laser.y < obstacle.y + obstacle.height &&
            laser.y + laser.height > obstacle.y
        );
    }

    /**
     * Handle game over
     */
    gameOver() {
        gameState.setState('over');
        this.isRunning = false;
        
        // Create explosion effect
        particleSystem.createExplosion(player.x + player.width / 2, player.y + player.height / 2);
        
        // Show game over menu
        this.showGameOverMenu();
    }

    /**
     * Draw all game elements
     */
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0d0221';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background grid
        this.drawGrid();

        // Draw particle system (stars and particles)
        particleSystem.draw(this.ctx);

        // Draw ground
        this.drawGround();

        // Draw obstacles
        obstacleManager.draw(this.ctx);

        // Draw power-ups
        powerUpSystem.draw(this.ctx);

        // Draw player
        player.draw(this.ctx);

        // Draw UI
        this.drawUI();
    }

    /**
     * Draw background grid
     */
    drawGrid() {
        this.ctx.save();
        
        const gridColor = 'rgba(0, 246, 255, 0.3)';
        const lineCount = 40;
        const horizonY = this.worldHeight * 0.45;
        
        for (let i = 0; i < lineCount; i++) {
            const zRatio = (i / lineCount) - (gameState.getGameSpeed() * 0.00015);
            const y = this.groundY - (this.groundY - horizonY) * Math.pow(zRatio, 2);
            
            if (y < horizonY) continue;
            
            const alpha = (1 - zRatio) * 0.3;
            const lineWidth = (1 - zRatio) * 2;
            
            this.ctx.strokeStyle = `rgba(0, 246, 255, ${alpha})`;
            this.ctx.lineWidth = Math.max(0.5, lineWidth);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(1600, y);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    /**
     * Draw ground
     */
    drawGround() {
        this.ctx.save();
        
        // Ground glow
        const glowSize = 20 + Math.sin(gameState.pulseEffect * 0.01) * 5;
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = glowSize;
        
        // Ground gradient
        const gradient = this.ctx.createLinearGradient(0, this.groundY - 10, 0, this.groundY);
        gradient.addColorStop(0, '#00f6ff');
        gradient.addColorStop(1, '#00d4ff');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, this.groundY - 10, 1600, 10);
        
        this.ctx.restore();
    }

    /**
     * Draw UI elements
     */
    drawUI() {
        this.ctx.save();
        
        // Score
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score: ${gameState.score.toLocaleString()}`, 20, 40);
        
        // High score
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = '18px Arial';
        this.ctx.fillText(`High Score: ${gameState.highScore.toLocaleString()}`, 20, 65);
        
        // Power-up indicators
        if (player.isShielded()) {
            this.ctx.fillStyle = `hsl(${gameState.rainbowHue}, 100%, 70%)`;
            this.ctx.fillText('SHIELD ACTIVE', 20, 90);
        }
        
        if (player.isLaserReady()) {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillText('LASER READY', 20, 115);
        }
        
        if (gameState.slowMoActive) {
            this.ctx.fillStyle = '#4d94ff';
            this.ctx.fillText('SLOW MOTION', 20, 140);
        }
        
        this.ctx.restore();
    }

    /**
     * Resize canvas to fit window
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.worldHeight = this.canvas.height;
        this.groundY = this.worldHeight - 100;
    }

    /**
     * Show toast message
     * @param {string} message - Message to show
     * @param {number} duration - Duration in milliseconds
     */
    showToast(message, duration = 3000) {
        // Implementation would go here
        console.log('Toast:', message);
    }

    /**
     * Show game over menu
     */
    showGameOverMenu() {
        // Implementation would go here
        console.log('Game Over! Score:', gameState.score);
    }

    /**
     * Load audio
     * @param {Function} callback - Called when loading is complete
     */
    loadAudio(callback) {
        audioManager.load(callback);
    }

    /**
     * Get game state
     * @returns {GameState} Current game state
     */
    getGameState() {
        return gameState;
    }

    /**
     * Get player
     * @returns {Player} Player object
     */
    getPlayer() {
        return player;
    }
}

// Export the class
export default GameEngine; 