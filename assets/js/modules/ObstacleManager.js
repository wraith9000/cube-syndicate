/**
 * ObstacleManager.js - Handles obstacle spawning, management, and rendering
 */

import { gameState } from './GameState.js';
import { particleSystem } from './ParticleSystem.js';

export class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.currentChunk = null;
        this.chunkObstacleIndex = 0;
        
        // Level chunks for procedural generation
        this.LEVEL_CHUNKS = [
            // Simple warm-up chunks
            { id: 'easy_1', obstacles: [{ type: 'tall', height: 60, baseSpacing: 750 }] },
            { id: 'easy_2', obstacles: [{ type: 'low', baseSpacing: 650 }] },
            { id: 'easy_3', obstacles: [{ type: 'tall', height: 100, baseSpacing: 850 }] },

            // Rhythmic jumps
            { id: 'rhythm_1', obstacles: [
                { type: 'low', baseSpacing: 500 },
                { type: 'low', baseSpacing: 500 },
                { type: 'low', baseSpacing: 500 },
            ]},
            { id: 'rhythm_2', obstacles: [
                { type: 'tall', height: 80, baseSpacing: 600 },
                { type: 'tall', height: 80, baseSpacing: 600 },
            ]},

            // Mixed challenges
            { id: 'mixed_1', obstacles: [
                { type: 'tall', height: 120, baseSpacing: 750 },
                { type: 'low', baseSpacing: 600 },
            ]},
            { id: 'mixed_2', obstacles: [
                { type: 'low', baseSpacing: 600 },
                { type: 'tall', height: 150, baseSpacing: 800 },
            ]},
            
            // Tricky sequences
            { id: 'tricky_1', obstacles: [
                { type: 'tall', height: 80, baseSpacing: 650 },
                { type: 'tall', height: 160, baseSpacing: 650 },
            ]},
            { id: 'tricky_2', obstacles: [
                { type: 'low', baseSpacing: 500 },
                { type: 'low', baseSpacing: 500 },
                { type: 'tall', height: 100, baseSpacing: 700 },
            ]},
        ];

        // Colors for obstacles
        this.COLORS = {
            obstacle: '#ff00c1',
            obstacleGlow: '#ff0080',
            lowObstacle: '#ff4dd2',
            lowObstacleGlow: '#ff00b3',
        };
    }

    /**
     * Update all obstacles
     * @param {number} deltaTime - Time elapsed since last frame
     * @param {number} groundY - Y position of the ground
     */
    update(deltaTime, groundY) {
        const gameSpeed = gameState.getGameSpeed();
        
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.x -= gameSpeed * deltaTime;

            // Remove if off-screen
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(i, 1);
            }
        }
    }

    /**
     * Draw all obstacles
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        for (const obstacle of this.obstacles) {
            ctx.save();
            
            // Apply screen shake
            ctx.translate(gameState.cameraOffset.x, gameState.cameraOffset.y);
            
            // Obstacle glow effect
            const glowSize = 15 + Math.sin(gameState.pulseEffect * 0.02) * 5;
            ctx.shadowColor = obstacle.type === 'low' ? this.COLORS.lowObstacleGlow : this.COLORS.obstacleGlow;
            ctx.shadowBlur = glowSize;
            
            // Draw obstacle with gradient
            const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y + obstacle.height);
            if (obstacle.type === 'low') {
                gradient.addColorStop(0, this.COLORS.lowObstacle);
                gradient.addColorStop(1, this.COLORS.lowObstacleGlow);
            } else {
                gradient.addColorStop(0, this.COLORS.obstacle);
                gradient.addColorStop(1, this.COLORS.obstacleGlow);
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Inner glow
            ctx.shadowBlur = 0;
            ctx.strokeStyle = obstacle.type === 'low' ? this.COLORS.lowObstacleGlow : this.COLORS.obstacleGlow;
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x + 2, obstacle.y + 2, obstacle.width - 4, obstacle.height - 4);
            
            ctx.restore();
        }
    }

    /**
     * Spawn a new obstacle based on template
     * @param {Object} template - Obstacle template
     * @param {number} groundY - Y position of the ground
     */
    spawnObstacle(template, groundY) {
        const obstacle = {
            x: 1600, // Start off-screen
            width: 40,
            height: template.type === 'low' ? 30 : (template.height || 120),
            type: template.type,
            y: groundY - (template.type === 'low' ? 30 : (template.height || 120))
        };
        
        this.obstacles.push(obstacle);
    }

    /**
     * Update obstacle spawning based on current chunk
     * @param {number} groundY - Y position of the ground
     */
    updateSpawning(groundY) {
        // Select a new chunk if needed
        if (!this.currentChunk || this.chunkObstacleIndex >= this.currentChunk.obstacles.length) {
            this.selectNewChunk();
        }

        // Spawn obstacles from current chunk
        if (this.currentChunk && this.chunkObstacleIndex < this.currentChunk.obstacles.length) {
            const obstacleTemplate = this.currentChunk.obstacles[this.chunkObstacleIndex];
            
            // Check if it's time to spawn this obstacle
            const lastObstacle = this.obstacles[this.obstacles.length - 1];
            const shouldSpawn = !lastObstacle || 
                (1600 - lastObstacle.x) >= obstacleTemplate.baseSpacing;
            
            if (shouldSpawn) {
                this.spawnObstacle(obstacleTemplate, groundY);
                this.chunkObstacleIndex++;
            }
        }
    }

    /**
     * Select a new random chunk
     */
    selectNewChunk() {
        const randomIndex = Math.floor(Math.random() * this.LEVEL_CHUNKS.length);
        this.currentChunk = this.LEVEL_CHUNKS[randomIndex];
        this.chunkObstacleIndex = 0;
    }

    /**
     * Check collision with player
     * @param {Object} player - Player object
     * @returns {Object|null} Colliding obstacle or null
     */
    checkPlayerCollision(player) {
        for (const obstacle of this.obstacles) {
            if (this.checkCollision(player, obstacle)) {
                return obstacle;
            }
        }
        return null;
    }

    /**
     * Check collision between two objects
     * @param {Object} obj1 - First object
     * @param {Object} obj2 - Second object
     * @returns {boolean} True if collision detected
     */
    checkCollision(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    }

    /**
     * Clear all obstacles
     */
    clear() {
        this.obstacles = [];
        this.currentChunk = null;
        this.chunkObstacleIndex = 0;
    }

    /**
     * Get obstacle count
     * @returns {number} Number of active obstacles
     */
    getObstacleCount() {
        return this.obstacles.length;
    }

    /**
     * Get all obstacles
     * @returns {Array} Array of active obstacles
     */
    getObstacles() {
        return this.obstacles;
    }

    /**
     * Add custom obstacle
     * @param {Object} obstacle - Obstacle object
     */
    addObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    /**
     * Remove obstacle by index
     * @param {number} index - Index of obstacle to remove
     */
    removeObstacle(index) {
        if (index >= 0 && index < this.obstacles.length) {
            this.obstacles.splice(index, 1);
        }
    }

    /**
     * Create explosion effect at obstacle position
     * @param {Object} obstacle - Obstacle that was destroyed
     */
    createObstacleExplosion(obstacle) {
        const centerX = obstacle.x + obstacle.width / 2;
        const centerY = obstacle.y + obstacle.height / 2;
        particleSystem.createExplosion(centerX, centerY);
    }
}

// Export singleton instance
export const obstacleManager = new ObstacleManager(); 