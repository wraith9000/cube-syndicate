/**
 * Player.js - Handles player physics, controls, and rendering
 */

import { gameState } from './GameState.js';
import { audioManager } from './AudioManager.js';
import { particleSystem } from './ParticleSystem.js';

export class Player {
    constructor() {
        this.x = 150;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.velocityY = 0;
        this.jumpsLeft = 0;
        this.rotation = 0;
        this.scale = 1;
        this.pulse = 0;
        this.history = [];
        this.shielded = false;
        this.laserReady = false;
        
        // Physics constants
        this.GRAVITY = 2000;
        this.JUMP_FORCE = -700;
        this.MAX_ROTATION = 0.8;
        this.MIN_ROTATION = -0.4;
        this.ROTATION_SPEED_UP = 6;
        this.ROTATION_SPEED_DOWN = 8;
        
        // Visual constants
        this.HISTORY_LENGTH = 10;
        this.AFTER_IMAGE_ALPHA = 0.3;
        this.GLOW_SIZE = 20;
        this.GLOW_PULSE = 5;
    }

    /**
     * Update player physics and state
     * @param {number} deltaTime - Time elapsed since last frame
     * @param {number} groundY - Y position of the ground
     */
    update(deltaTime, groundY) {
        if (!gameState.isPlaying()) return;
        
        // Apply gravity
        this.velocityY += this.GRAVITY * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Update rotation based on velocity
        this.updateRotation(deltaTime);
        
        // Check ground collision
        const isGrounded = this.y >= groundY - this.height;
        if (isGrounded) {
            this.handleGroundCollision(groundY);
        }

        // Update history for after-image effect
        this.updateHistory();
        
        // Update scale animation
        this.updateScale(deltaTime);
    }

    /**
     * Update player rotation based on velocity
     * @param {number} deltaTime - Time elapsed since last frame
     */
    updateRotation(deltaTime) {
        if (this.velocityY < 0) {
            // Moving up - rotate counter-clockwise
            this.rotation = Math.max(this.rotation - this.ROTATION_SPEED_DOWN * deltaTime, this.MIN_ROTATION);
        } else if (this.velocityY > 0 && this.y < gameState.GROUND_Y - this.height) {
            // Moving down - rotate clockwise
            this.rotation = Math.min(this.rotation + this.ROTATION_SPEED_UP * deltaTime, this.MAX_ROTATION);
        }
    }

    /**
     * Handle collision with ground
     * @param {number} groundY - Y position of the ground
     */
    handleGroundCollision(groundY) {
        if (this.velocityY > 0) {
            // Landing effect
            particleSystem.createLandingEffect(this.x + this.width / 2, groundY);
            this.jumpsLeft = 2;

            // Activate laser if ready
            if (this.laserReady) {
                this.laserReady = false;
                setTimeout(() => {
                    this.activateLaser();
                }, 100);
            }
        }
        this.y = groundY - this.height;
        this.velocityY = 0;
    }

    /**
     * Update player history for after-image effect
     */
    updateHistory() {
        this.history.push({
            x: this.x,
            y: this.y,
            rotation: this.rotation
        });
        
        // Keep only the last N positions
        if (this.history.length > this.HISTORY_LENGTH) {
            this.history.shift();
        }
    }

    /**
     * Update scale animation
     * @param {number} deltaTime - Time elapsed since last frame
     */
    updateScale(deltaTime) {
        if (this.scale > 1) {
            this.scale -= deltaTime * 2;
            if (this.scale < 1) this.scale = 1;
        }
    }

    /**
     * Make the player jump
     */
    jump() {
        if (this.jumpsLeft > 0 && gameState.isPlaying()) {
            this.velocityY = this.JUMP_FORCE;
            this.jumpsLeft--;
            
            // Jump effects
            this.scale = 1.2;
            gameState.addScreenShake(0.3);
            particleSystem.createJumpEffect(this.x + this.width / 2, this.y + this.height / 2);
        }
    }

    /**
     * Activate laser power-up
     */
    activateLaser() {
        // This will be handled by the PowerUpSystem
        // For now, just trigger the event
        this.onLaserActivate?.();
    }

    /**
     * Draw the player
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        ctx.save();
        
        // Draw after-image trail
        if (gameState.isPlaying()) {
            this.drawAfterImage(ctx);
        }
        
        // Apply screen shake
        ctx.translate(gameState.cameraOffset.x, gameState.cameraOffset.y);
        
        // Player glow effect
        const glowSize = this.GLOW_SIZE + Math.sin(gameState.pulseEffect * 0.01) * this.GLOW_PULSE;
        ctx.shadowColor = this.shielded ? `hsl(${gameState.rainbowHue}, 100%, 70%)` : '#00d4ff';
        ctx.shadowBlur = glowSize;
        
        // Transform to player position
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        // Draw player with gradient
        this.drawPlayerBody(ctx);
        
        ctx.restore();
    }

    /**
     * Draw after-image trail
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawAfterImage(ctx) {
        for (let i = 0; i < this.history.length; i++) {
            const pos = this.history[i];
            const alpha = (i / this.history.length) * this.AFTER_IMAGE_ALPHA;
            
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(pos.x + this.width / 2, pos.y + this.height / 2);
            ctx.rotate(pos.rotation);
            ctx.scale(this.scale, this.scale);
            ctx.fillStyle = this.shielded ? `hsl(${(gameState.rainbowHue + i * 10) % 360}, 100%, 70%)` : '#00d4ff';
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }

    /**
     * Draw the main player body
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawPlayerBody(ctx) {
        const gradient = ctx.createLinearGradient(-this.width/2, -this.height/2, this.width/2, this.height/2);
        if (this.shielded) {
            gradient.addColorStop(0, `hsl(${gameState.rainbowHue}, 100%, 50%)`);
            gradient.addColorStop(1, `hsl(${(gameState.rainbowHue + 40) % 360}, 100%, 50%)`);
        } else {
            gradient.addColorStop(0, '#00f6ff');
            gradient.addColorStop(1, '#00d4ff');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Inner glow
        ctx.shadowBlur = 0;
        ctx.strokeStyle = this.shielded ? `hsl(${gameState.rainbowHue}, 100%, 70%)` : '#00d4ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width / 2 + 2, -this.height / 2 + 2, this.width - 4, this.height - 4);
    }

    /**
     * Check collision with another object
     * @param {Object} object - Object to check collision with
     * @returns {boolean} True if collision detected
     */
    checkCollision(object) {
        return (
            this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y
        );
    }

    /**
     * Reset player state
     */
    reset() {
        this.x = 150;
        this.y = 0;
        this.velocityY = 0;
        this.jumpsLeft = 0;
        this.rotation = 0;
        this.scale = 1;
        this.pulse = 0;
        this.history = [];
        this.shielded = false;
        this.laserReady = false;
    }

    /**
     * Get player bounds
     * @returns {Object} Player bounds
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Set laser ready state
     * @param {boolean} ready - Whether laser is ready
     */
    setLaserReady(ready) {
        this.laserReady = ready;
    }

    /**
     * Set shielded state
     * @param {boolean} shielded - Whether player is shielded
     */
    setShielded(shielded) {
        this.shielded = shielded;
    }

    /**
     * Get shielded state
     * @returns {boolean} Whether player is shielded
     */
    isShielded() {
        return this.shielded;
    }

    /**
     * Get laser ready state
     * @returns {boolean} Whether laser is ready
     */
    isLaserReady() {
        return this.laserReady;
    }
}

// Export singleton instance
export const player = new Player(); 