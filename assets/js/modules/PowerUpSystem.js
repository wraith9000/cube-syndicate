/**
 * PowerUpSystem.js - Handles power-up spawning, management, and effects
 */

import { gameState } from './GameState.js';
import { audioManager } from './AudioManager.js';
import { particleSystem } from './ParticleSystem.js';

export class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 800;
        this.height = 20;
        this.life = 0.5; // Laser lasts for 0.5 seconds
        this.decay = 0.02;
        this.lightningPoints = [];
        this.plasmaParticles = [];
        this.energyWaves = [];
        
        this.generateLightningPoints();
        this.generatePlasmaParticles();
        this.generateEnergyWaves();
    }

    generateLightningPoints() {
        this.lightningPoints = [];
        for (let i = 0; i < 8; i++) {
            this.lightningPoints.push({
                x: this.x + Math.random() * this.width,
                y: this.y + (Math.random() - 0.5) * this.height,
                life: Math.random() * 0.3 + 0.2
            });
        }
    }

    generatePlasmaParticles() {
        this.plasmaParticles = [];
        for (let i = 0; i < 15; i++) {
            this.plasmaParticles.push({
                x: this.x + Math.random() * this.width,
                y: this.y + (Math.random() - 0.5) * this.height,
                vx: (Math.random() - 0.5) * 100,
                vy: (Math.random() - 0.5) * 100,
                life: Math.random() * 0.4 + 0.3
            });
        }
    }

    generateEnergyWaves() {
        this.energyWaves = [];
        for (let i = 0; i < 3; i++) {
            this.energyWaves.push({
                x: this.x + i * 200,
                y: this.y,
                radius: 0,
                maxRadius: 50,
                speed: 200 + i * 50
            });
        }
    }

    draw(ctx) {
        ctx.save();
        
        // Apply screen shake
        ctx.translate(gameState.cameraOffset.x, gameState.cameraOffset.y);
        
        // Draw energy waves
        this.drawEnergyWaves(ctx);
        
        // Draw plasma particles
        this.drawPlasmaParticles(ctx);
        
        // Draw lightning arcs
        this.drawLightningArcs(ctx);
        
        // Draw main laser beam
        this.drawLaserBeam(ctx);
        
        ctx.restore();
    }

    drawLaserBeam(ctx) {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
        
        // Inner core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(this.x, this.y - this.height/4, this.width, this.height/2);
    }

    drawLightningArcs(ctx) {
        for (const point of this.lightningPoints) {
            if (point.life > 0) {
                ctx.strokeStyle = `rgba(255, 255, 0, ${point.life})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(point.x + (Math.random() - 0.5) * 20, point.y + (Math.random() - 0.5) * 20);
                ctx.stroke();
            }
        }
    }

    drawPlasmaParticles(ctx) {
        for (const particle of this.plasmaParticles) {
            if (particle.life > 0) {
                ctx.fillStyle = `rgba(255, 255, 0, ${particle.life})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    drawEnergyWaves(ctx) {
        for (const wave of this.energyWaves) {
            if (wave.radius < wave.maxRadius) {
                ctx.strokeStyle = `rgba(255, 255, 0, ${1 - wave.radius / wave.maxRadius})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    update(deltaTime) {
        this.life -= this.decay;
        
        // Update lightning points
        for (const point of this.lightningPoints) {
            point.life -= deltaTime;
        }
        
        // Update plasma particles
        for (const particle of this.plasmaParticles) {
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;
            particle.life -= deltaTime;
        }
        
        // Update energy waves
        for (const wave of this.energyWaves) {
            wave.radius += wave.speed * deltaTime;
        }
        
        return this.life > 0;
    }
}

export class PowerUpSystem {
    constructor() {
        this.powerUps = [];
        this.lasers = [];
        this.spawnChance = 0.015; // 1.5% chance per frame
        this.maxPowerUps = 1; // Only one power-up on screen at a time
        
        // Power-up types and their probabilities
        this.powerUpTypes = [
            { type: 'shield', probability: 0.33 },
            { type: 'slow-mo', probability: 0.33 },
            { type: 'laser', probability: 0.34 }
        ];
    }

    /**
     * Update all power-ups and lasers
     * @param {number} deltaTime - Time elapsed since last frame
     * @param {Object} player - Player object
     */
    update(deltaTime, player) {
        const gameSpeed = gameState.getGameSpeed();
        
        // Update power-ups
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            powerUp.x -= gameSpeed * deltaTime;

            // Animate floating
            powerUp.animationTimer += deltaTime * 3;
            powerUp.y = powerUp.baseY + Math.sin(powerUp.animationTimer) * 8;

            // Check collision with player
            if (this.checkCollision(player, powerUp)) {
                this.collectPowerUp(powerUp, i);
            }

            // Remove if off-screen
            if (powerUp.x + powerUp.width < 0) {
                this.powerUps.splice(i, 1);
            }
        }

        // Update lasers
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const laser = this.lasers[i];
            if (!laser.update(deltaTime)) {
                this.lasers.splice(i, 1);
            }
        }
    }

    /**
     * Draw all power-ups and lasers
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        // Draw power-ups
        for (const powerUp of this.powerUps) {
            this.drawPowerUp(ctx, powerUp);
        }

        // Draw lasers
        for (const laser of this.lasers) {
            laser.draw(ctx);
        }
    }

    /**
     * Draw a single power-up
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} powerUp - Power-up object
     */
    drawPowerUp(ctx, powerUp) {
        ctx.save();

        const isShield = powerUp.type === 'shield';
        const isLaser = powerUp.type === 'laser';
        let color;
        
        if (isShield) {
            color = `hsl(${gameState.rainbowHue}, 100%, 50%)`;
        } else if (isLaser) {
            color = '#ff0000';
        } else {
            color = '#4d94ff';
        }
        
        // Pulsing glow
        const pulse = Math.sin(powerUp.animationTimer * 2) * 0.5 + 0.5;
        const glowSize = 10 + pulse * 10;
        
        ctx.shadowColor = color;
        ctx.shadowBlur = glowSize;

        // Translate to the power-up's position
        ctx.translate(powerUp.x, powerUp.y);
        
        if (isShield) {
            this.drawShield(ctx, powerUp, color);
        } else if (powerUp.type === 'slow-mo') {
            this.drawSlowMo(ctx, powerUp, color);
        } else if (isLaser) {
            this.drawLaserPowerUp(ctx, powerUp, color);
        }
        
        ctx.restore();
    }

    drawShield(ctx, powerUp, color) {
        const shieldW = powerUp.width;
        const shieldH = powerUp.height;

        // Draw main shield shape
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(shieldW, 0);
        ctx.lineTo(shieldW, shieldH * 0.7);
        ctx.lineTo(shieldW / 2, shieldH);
        ctx.lineTo(0, shieldH * 0.7);
        ctx.closePath();
        ctx.fill();

        // Draw a white border for detail
        ctx.strokeStyle = `hsl(${(gameState.rainbowHue + 180) % 360}, 100%, 90%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawSlowMo(ctx, powerUp, color) {
        const centerX = powerUp.width / 2;
        const centerY = powerUp.height / 2;
        const radius = powerUp.width / 2.5;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        
        // Clock face
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Clock hands
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + radius * 0.5, centerY);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - radius * 0.7);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    drawLaserPowerUp(ctx, powerUp, color) {
        const centerX = powerUp.width / 2;
        const centerY = powerUp.height / 2;
        const radius = powerUp.width / 2.5;
        
        // Draw laser beam shape
        ctx.fillStyle = color;
        ctx.fillRect(centerX - radius * 0.8, centerY - radius * 0.3, radius * 1.6, radius * 0.6);
        
        // Draw laser tip
        ctx.beginPath();
        ctx.moveTo(centerX + radius * 0.8, centerY - radius * 0.3);
        ctx.lineTo(centerX + radius * 1.2, centerY);
        ctx.lineTo(centerX + radius * 0.8, centerY + radius * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Draw energy core
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(centerX - radius * 0.4, centerY - radius * 0.15, radius * 0.8, radius * 0.3);
    }

    /**
     * Spawn a new power-up
     * @param {number} groundY - Y position of the ground
     */
    spawnPowerUp(groundY) {
        if (Math.random() < this.spawnChance && this.powerUps.length === 0) {
            const size = 25;
            const powerUpType = this.selectPowerUpType();
            const yPos = groundY - size - (Math.random() * 100 + 50);

            this.powerUps.push({
                x: 1600 + 50,
                y: yPos,
                baseY: yPos,
                width: size,
                height: size,
                type: powerUpType,
                animationTimer: Math.random() * Math.PI * 2
            });
        }
    }

    /**
     * Select a random power-up type based on probabilities
     * @returns {string} Selected power-up type
     */
    selectPowerUpType() {
        const random = Math.random();
        let cumulative = 0;
        
        for (const powerUp of this.powerUpTypes) {
            cumulative += powerUp.probability;
            if (random <= cumulative) {
                return powerUp.type;
            }
        }
        
        return 'shield'; // Fallback
    }

    /**
     * Collect a power-up
     * @param {Object} powerUp - Power-up object
     * @param {number} index - Index of power-up in array
     */
    collectPowerUp(powerUp, index) {
        console.log('Powerup collected! Type:', powerUp.type);
        audioManager.play('itemcollect');
        
        if (powerUp.type === 'shield') {
            console.log('Shield activated!');
            this.activateShield();
        } else if (powerUp.type === 'slow-mo') {
            this.activateSlowMo();
        } else if (powerUp.type === 'laser') {
            this.activateLaser();
        }
        
        this.powerUps.splice(index, 1);
    }

    /**
     * Activate shield power-up
     */
    activateShield() {
        // This will be handled by the player system
        this.onShieldActivate?.();
    }

    /**
     * Activate slow motion power-up
     */
    activateSlowMo() {
        gameState.activateSlowMo();
        this.onSlowMoActivate?.();
    }

    /**
     * Activate laser power-up
     */
    activateLaser() {
        // This will be handled by the player system
        this.onLaserActivate?.();
    }

    /**
     * Create laser beam
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createLaser(x, y) {
        this.lasers.push(new Laser(x, y));
        
        // Enhanced screen shake effect
        gameState.addScreenShake(1.0);
        
        // Create electric particle burst
        particleSystem.createElectricBurst(x, y);
        
        // Play laser sound
        audioManager.play('laser');
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
     * Clear all power-ups and lasers
     */
    clear() {
        this.powerUps = [];
        this.lasers = [];
    }

    /**
     * Get power-up count
     * @returns {number} Number of active power-ups
     */
    getPowerUpCount() {
        return this.powerUps.length;
    }

    /**
     * Get laser count
     * @returns {number} Number of active lasers
     */
    getLaserCount() {
        return this.lasers.length;
    }

    /**
     * Set spawn chance
     * @param {number} chance - New spawn chance (0-1)
     */
    setSpawnChance(chance) {
        this.spawnChance = chance;
    }
}

// Export singleton instance
export const powerUpSystem = new PowerUpSystem(); 