/**
 * ParticleSystem.js - Handles all particle effects and visual feedback
 */

import { gameState } from './GameState.js';

export class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.life = 1.0;
        this.decay = 0.02;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        this.velocity.y += 500 * deltaTime; // Gravity
        this.life -= this.decay;
        return this.life > 0;
    }
}

export class Star {
    constructor(x, y, radius, color, parallax) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.parallax = parallax;
        this.twinkle = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.5 + Math.sin(this.twinkle) * 0.3;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update(deltaTime) {
        this.x -= gameState.getGameSpeed() * deltaTime * this.parallax;
        this.twinkle += deltaTime * 2;
        return this.x + this.radius > 0;
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
        this.stars = [];
        this.maxParticles = 200;
        this.maxStars = 50;
        
        this.initStars();
    }

    /**
     * Initialize background stars
     */
    initStars() {
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(new Star(
                Math.random() * 1600,
                Math.random() * 600,
                Math.random() * 2 + 1,
                Math.random() < 0.5 ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                Math.random() * 0.5 + 0.1
            ));
        }
    }

    /**
     * Create jump effect particles
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createJumpEffect(x, y) {
        for (let i = 0; i < 8; i++) {
            const speed = Math.random() * 100 + 50;
            const angle = (Math.PI / 4) + (Math.random() - 0.5) * Math.PI / 2;
            const color = Math.random() < 0.5 ? '#00f6ff' : '#00d4ff';
            
            this.particles.push(new Particle(x, y, Math.random() * 3 + 1, color, {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }));
        }
    }

    /**
     * Create landing effect particles
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createLandingEffect(x, y) {
        for (let i = 0; i < 12; i++) {
            const speed = Math.random() * 150 + 100;
            const angle = Math.random() * Math.PI * 2;
            const color = Math.random() < 0.5 ? '#00f6ff' : '#00d4ff';
            
            this.particles.push(new Particle(x, y, Math.random() * 4 + 2, color, {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }));
        }
    }

    /**
     * Create explosion effect particles
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            const speed = Math.random() * 200 + 150;
            const angle = Math.random() * Math.PI * 2;
            const colors = ['#ff00c1', '#ff0080', '#ff4dd2', '#ff00b3'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.particles.push(new Particle(x, y, Math.random() * 5 + 3, color, {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }));
        }
    }

    /**
     * Create electric burst particles
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createElectricBurst(x, y) {
        for (let i = 0; i < 20; i++) {
            const speed = Math.random() * 200 + 100;
            const angle = Math.random() * Math.PI * 2;
            const color = Math.random() < 0.5 ? '#ffff44' : '#ff4444';
            
            this.particles.push(new Particle(x, y, Math.random() * 3 + 1, color, {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }));
        }
    }

    /**
     * Update all particles and stars
     * @param {number} deltaTime - Time elapsed since last frame
     */
    update(deltaTime) {
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            if (!particle.update(deltaTime)) {
                this.particles.splice(i, 1);
            }
        }

        // Update stars
        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];
            if (!star.update(deltaTime)) {
                // Remove star and add new one on the right
                this.stars.splice(i, 1);
                this.stars.push(new Star(
                    1600 + Math.random() * 100,
                    Math.random() * 600,
                    Math.random() * 2 + 1,
                    Math.random() < 0.5 ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    Math.random() * 0.5 + 0.1
                ));
            }
        }
    }

    /**
     * Draw all particles and stars
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        // Draw stars first (background)
        for (const star of this.stars) {
            star.draw(ctx);
        }

        // Draw particles
        for (const particle of this.particles) {
            particle.draw(ctx);
        }
    }

    /**
     * Clear all particles
     */
    clear() {
        this.particles = [];
    }

    /**
     * Get particle count
     * @returns {number} Number of active particles
     */
    getParticleCount() {
        return this.particles.length;
    }

    /**
     * Get star count
     * @returns {number} Number of active stars
     */
    getStarCount() {
        return this.stars.length;
    }
}

// Export singleton instance
export const particleSystem = new ParticleSystem(); 