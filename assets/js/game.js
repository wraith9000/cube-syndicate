const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- LEVEL CHUNKS ---
const LEVEL_CHUNKS = [
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

let currentChunk = null;
let chunkObstacleIndex = 0;

let worldHeight; // Will be calculated dynamically

// --- COLOR PALETTE ---
const COLORS = {
    background: '#0d0221',
    background2: '#1a0033',
    player: '#00f6ff',
    playerGlow: '#00d4ff',
    playerShield: '#ffd700', // Gold color for shield
    slowMo: '#4d94ff', // A light blue for slow-motion
    laser: '#ff0000', // Red color for laser
    laserGlow: '#ff4444', // Brighter red for laser glow
    obstacle: '#ff00c1',
    obstacleGlow: '#ff0080',
    lowObstacle: '#ff4dd2',
    lowObstacleGlow: '#ff00b3',
    ground: '#00f6ff',
    groundGlow: '#00d4ff',
    particleExplosion: '#ff00c1',
    star: '#ffffff',
    starDim: 'rgba(255, 255, 255, 0.5)',
    grid: 'rgba(0, 246, 255, 1)',
    ui: '#ffffff',
    uiGlow: 'rgba(255, 255, 255, 0.8)',
};

// Game state
let state = 'menu'; // menu, playing, over

// Game variables
let gameSpeed = 300;
let score = 0;
let obstacles = [];
let particles = [];
let stars = [];
let powerUps = [];
let lasers = []; // Array to store active laser beams
let GROUND_Y;
let lastTime = 0;
let highScore = parseInt(localStorage.getItem('slidingCubeHighScore')) || 0;
let slowMoActive = false;
let slowMoTimer = 0;

const device = {
    isMobile: false,
    baseSpeed: 300,
    speedIncrement: 2.0
};

// --- AUDIO MANAGER ---
const audio = {
    files: {
        music: 'assets/audio/music.mp3',
        laser: 'assets/audio/laserbraam.mp3',
        itemcollect: 'assets/audio/itemcollect.mp3',
    },
    sounds: {},
    enabled: true,
    musicVolume: 0.4, // Default music volume (40%)
    sfxVolume: 0.8,   // Default SFX volume (80%)

    load(callback) {
        let loaded = 0;
        let failed = 0;
        const total = Object.keys(this.files).length;

        for (const name in this.files) {
            const sound = new Audio();
            
            sound.oncanplaythrough = () => {
                loaded++;
                this.sounds[name] = sound;
                if (loaded + failed >= total) {
                    if(callback) callback();
                }
            };
            
            sound.onerror = () => {
                failed++;
                console.warn(`Failed to load audio: ${this.files[name]}`);
                if (loaded + failed >= total) {
                    if(callback) callback();
                }
            };
            
            sound.src = this.files[name];
        }
        
        // Settings for music if it loads successfully
        if (this.sounds.music) {
            this.sounds.music.loop = true;
            this.sounds.music.volume = this.musicVolume;
        }
    },

    play(soundName) {
        if (!this.enabled) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            console.log(`Playing sound: ${soundName}`); // Debug log
            sound.currentTime = 0;
            
            // Set appropriate volume based on sound type
            if (soundName === 'music') {
                sound.volume = this.musicVolume;
            } else if (soundName === 'laser') {
                // Make laser sound 200% louder than other SFX
                sound.volume = Math.min(1.0, this.sfxVolume * 3.0);
            } else {
                sound.volume = this.sfxVolume;
            }
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log(`Audio play prevented for ${soundName}:`, error);
                });
            }
        } else {
            console.log(`Sound not found: ${soundName}`); // Debug log
        }
    },
    
    stop(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    },

    setMusicVolume(volume) {
        this.musicVolume = volume / 100; // Convert percentage to 0-1 range
        if (this.sounds.music) {
            this.sounds.music.volume = this.musicVolume;
        }
        // Save to localStorage
        localStorage.setItem('slidingCubeMusicVolume', volume);
    },

    setSFXVolume(volume) {
        this.sfxVolume = volume / 100; // Convert percentage to 0-1 range
        // Save to localStorage
        localStorage.setItem('slidingCubeSFXVolume', volume);
    },

    loadSettings() {
        // Load saved volume settings
        const savedMusicVolume = localStorage.getItem('slidingCubeMusicVolume');
        const savedSFXVolume = localStorage.getItem('slidingCubeSFXVolume');
        
        if (savedMusicVolume !== null) {
            this.musicVolume = parseInt(savedMusicVolume) / 100;
            if (this.sounds.music) {
                this.sounds.music.volume = this.musicVolume;
            }
        }
        
        if (savedSFXVolume !== null) {
            this.sfxVolume = parseInt(savedSFXVolume) / 100;
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            // Stop all sounds when disabled
            for (const sound of Object.values(this.sounds)) {
                if (sound) {
                    sound.pause();
                    sound.currentTime = 0;
                }
            }
        }
    }
};

// --- GRID SYSTEM ---
const grid = {
    color: 'rgba(0, 246, 255, 0.3)',
    lines: [],
    lineCount: 40,
    horizonY: 0,
    
    init() {
        if (!worldHeight) return;
        this.horizonY = worldHeight * 0.45;
        this.lines = [];
        for (let i = 0; i < this.lineCount; i++) {
            this.lines.push({
                z_ratio: i / this.lineCount
            });
        }
    },
    
    update(deltaTime) {
        for (const line of this.lines) {
            line.z_ratio -= gameSpeed * deltaTime * 0.00015;
            if (line.z_ratio < 0) {
                line.z_ratio += 1;
            }
        }
    },
    
    draw() {
        ctx.save();
        for (const line of this.lines) {
            const y = GROUND_Y - (GROUND_Y - this.horizonY) * Math.pow(line.z_ratio, 2);
            
            if (y < this.horizonY) continue;
            
            const alpha = (1 - line.z_ratio) * 0.3;
            const lineWidth = (1 - line.z_ratio) * 2;
            
            const gridRgb = '0, 246, 255';
            ctx.strokeStyle = `rgba(${gridRgb}, ${alpha})`;
            ctx.lineWidth = Math.max(0.5, lineWidth);
            
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(WORLD_WIDTH, y);
            ctx.stroke();
        }
        ctx.restore();
    }
};

// Visual effects
let screenShake = 0;
let cameraOffset = { x: 0, y: 0 };
let pulseEffect = 0;
let glowIntensity = 0;
let rainbowHue = 0;

// Game constants
const GRAVITY = 2000;
const JUMP_FORCE = -700;
const WORLD_WIDTH = 1600;

const SLOW_MO_DURATION = 5; // 5 seconds
const SLOW_MO_FACTOR = 0.5; // Halves the game speed

// Player properties
const player = {
    x: 150,
    y: 0,
    width: 40,
    height: 40,
    velocityY: 0,
    jumpsLeft: 0,
    rotation: 0,
    scale: 1,
    pulse: 0,
    history: [],
    shielded: false,
    laserReady: false, // Track if laser is ready to be activated

    draw() {
        ctx.save();
        
        // Draw after-image trail
        if (state === 'playing') {
            for (let i = 0; i < this.history.length; i++) {
                const pos = this.history[i];
                const alpha = (i / this.history.length) * 0.3;
                
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate(pos.x + this.width / 2, pos.y + this.height / 2);
                ctx.rotate(pos.rotation);
                ctx.scale(this.scale, this.scale);
                ctx.fillStyle = this.shielded ? `hsl(${(rainbowHue + i * 10) % 360}, 100%, 70%)` : COLORS.playerGlow;
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                ctx.restore();
            }
        }
        
        // Apply screen shake
        ctx.translate(cameraOffset.x, cameraOffset.y);
        
        // Player glow effect
        const glowSize = 20 + Math.sin(pulseEffect * 0.01) * 5;
        ctx.shadowColor = this.shielded ? `hsl(${rainbowHue}, 100%, 70%)` : COLORS.playerGlow;
        ctx.shadowBlur = glowSize;
        
        // Transform to player position
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        // Draw player with gradient
        const gradient = ctx.createLinearGradient(-this.width/2, -this.height/2, this.width/2, this.height/2);
        if (this.shielded) {
            gradient.addColorStop(0, `hsl(${rainbowHue}, 100%, 50%)`);
            gradient.addColorStop(1, `hsl(${(rainbowHue + 40) % 360}, 100%, 50%)`);
        } else {
            gradient.addColorStop(0, COLORS.player);
            gradient.addColorStop(1, COLORS.playerGlow);
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Inner glow
        ctx.shadowBlur = 0;
        ctx.strokeStyle = this.shielded ? `hsl(${rainbowHue}, 100%, 70%)` : COLORS.playerGlow;
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width / 2 + 2, -this.height / 2 + 2, this.width - 4, this.height - 4);
        
        ctx.restore();
    },

    jump() {
        if (this.jumpsLeft > 0 && state === 'playing') {
            this.velocityY = JUMP_FORCE;
            this.jumpsLeft--;
            
            // Jump effects
            this.scale = 1.2;
            screenShake = 0.3;
            createJumpEffect(this.x + this.width / 2, this.y + this.height / 2);
        }
    },

    update(deltaTime) {
        if (state !== 'playing') return;
        
        this.velocityY += GRAVITY * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Enhanced rotation with smooth transitions
        if (this.velocityY < 0) {
            this.rotation = Math.max(this.rotation - 8 * deltaTime, -0.4);
        } else if (this.velocityY > 0 && this.y < GROUND_Y - this.height) {
            this.rotation = Math.min(this.rotation + 6 * deltaTime, 0.8);
        }
        
        const isGrounded = this.y >= GROUND_Y - this.height;

        if (isGrounded) {
            if (this.velocityY > 0) {
                createLandingEffect(this.x + this.width / 2, GROUND_Y);
                this.jumpsLeft = 2;

                // Activate laser if ready, with 100ms delay
                if (this.laserReady) {
                    this.laserReady = false;
                    setTimeout(() => {
                        activateLaser();
                        showToast('Laser activated! Destroy 3 obstacles!', 2000);
                    }, 100); // 100 ms delay
                }
            }
            this.y = GROUND_Y - this.height;
            this.velocityY = 0;
            this.rotation = 0;
        }
        
        this.scale = Math.max(1, this.scale - 2 * deltaTime);
        
        if (state === 'playing') {
            // The sliding particle effect has been removed completely
            // to address user feedback about it being "too much".
            // Landing particles are now handled exclusively by createLandingEffect.
        }
        
        // Record history for after-image trail
        this.history.push({ x: this.x, y: this.y, rotation: this.rotation });
        if (this.history.length > 10) {
            this.history.shift();
        }
    }
};

// Enhanced Particle Class
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.gravity = Math.random() * 500 + 200;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Particle glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.radius * 2;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
    }

    update(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        this.velocity.y += this.gravity * deltaTime;
        // Increased alpha decay for faster fading
        this.alpha -= this.decay * 1.5;
        this.life -= this.decay;
        // Increased radius reduction for faster shrinking
        this.radius *= 0.96;
    }
}

// Enhanced Star Class with twinkling
class Star {
    constructor(x, y, radius, color, parallax) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.parallax = parallax;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 2 + 1;
    }

    draw() {
        ctx.save();
        
        // Twinkling effect
        const twinkleAlpha = 0.3 + Math.sin(this.twinkle) * 0.7;
        ctx.globalAlpha = twinkleAlpha;
        
        // Star glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.radius * 3;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
    }

    update(deltaTime) {
        this.x -= (gameSpeed / this.parallax) * deltaTime;
        this.twinkle += this.twinkleSpeed * deltaTime;
        
        if (this.x + this.radius < 0) {
            this.x = WORLD_WIDTH + this.radius;
        }
    }
}

// Laser Class for powerup
class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = WORLD_WIDTH; // Full screen width
        this.height = 8; // Laser beam thickness
        this.duration = 1; // 1 second duration
        this.timer = this.duration;
        this.targetsDestroyed = 0;
        // Removed maxTargets limit - laser can destroy unlimited obstacles
        
        // Electric/Plasma effect properties
        this.lightningArcs = [];
        this.plasmaParticles = [];
        this.energyWaves = [];
        this.electricTimer = 0;
        
        // Initialize lightning arcs
        for (let i = 0; i < 8; i++) {
            this.lightningArcs.push({
                x: this.x + Math.random() * this.width,
                y: this.y + (Math.random() - 0.5) * 20,
                points: this.generateLightningPoints(),
                alpha: Math.random() * 0.5 + 0.5,
                speed: Math.random() * 2 + 1
            });
        }
        
        // Initialize plasma particles
        for (let i = 0; i < 15; i++) {
            this.plasmaParticles.push({
                x: this.x + Math.random() * this.width,
                y: this.y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 100,
                vy: (Math.random() - 0.5) * 100,
                size: Math.random() * 3 + 1,
                life: 1,
                color: Math.random() < 0.5 ? '#ff4444' : '#ffff44'
            });
        }
        
        // Initialize energy waves
        for (let i = 0; i < 3; i++) {
            this.energyWaves.push({
                x: this.x + i * this.width / 3,
                y: this.y,
                radius: 0,
                maxRadius: 50,
                speed: 100 + i * 50,
                alpha: 0.3
            });
        }
    }
    
    generateLightningPoints() {
        const points = [];
        const segments = 8;
        let currentX = 0;
        let currentY = 0;
        
        for (let i = 0; i <= segments; i++) {
            points.push({ x: currentX, y: currentY });
            currentX += this.width / segments;
            currentY += (Math.random() - 0.5) * 15;
        }
        
        return points;
    }

    draw() {
        ctx.save();
        
        // Draw energy waves first (behind everything)
        this.drawEnergyWaves();
        
        // Draw plasma particles
        this.drawPlasmaParticles();
        
        // Draw lightning arcs
        this.drawLightningArcs();
        
        // Main laser beam with enhanced glow
        const pulse = Math.sin(this.timer * 10) * 0.3 + 0.7; // Pulsing effect
        const electricPulse = Math.sin(this.electricTimer * 20) * 0.5 + 0.5;
        
        // Multiple glow layers for electric effect
        ctx.shadowColor = '#ffff44'; // Electric yellow glow
        ctx.shadowBlur = 30 + electricPulse * 20;
        ctx.fillStyle = 'rgba(255, 255, 68, 0.3)';
        ctx.fillRect(this.x, this.y - this.height/2 - 5, this.width, this.height + 10);
        
        ctx.shadowColor = '#ff4444'; // Red glow
        ctx.shadowBlur = 20 + pulse * 15;
        ctx.fillStyle = 'rgba(255, 68, 68, 0.4)';
        ctx.fillRect(this.x, this.y - this.height/2 - 3, this.width, this.height + 6);
        
        // Core laser beam
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.3, '#ff4444');
        gradient.addColorStop(0.5, '#ffff44'); // Electric yellow core
        gradient.addColorStop(0.7, '#ff4444');
        gradient.addColorStop(1, '#ff0000');
        
        ctx.shadowBlur = 15;
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
        
        // Electric core line
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffff44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
        
        ctx.restore();
    }
    
    drawLightningArcs() {
        for (const arc of this.lightningArcs) {
            ctx.save();
            ctx.globalAlpha = arc.alpha;
            ctx.strokeStyle = '#ffff44';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ffff44';
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.moveTo(arc.x, arc.y);
            for (let i = 1; i < arc.points.length; i++) {
                const point = arc.points[i];
                ctx.lineTo(arc.x + point.x, arc.y + point.y);
            }
            ctx.stroke();
            ctx.restore();
        }
    }
    
    drawPlasmaParticles() {
        for (const particle of this.plasmaParticles) {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = particle.size * 2;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    drawEnergyWaves() {
        for (const wave of this.energyWaves) {
            ctx.save();
            ctx.globalAlpha = wave.alpha * (1 - wave.radius / wave.maxRadius);
            ctx.strokeStyle = '#ffff44';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ffff44';
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    update(deltaTime) {
        this.timer -= deltaTime;
        this.electricTimer += deltaTime;
        
        // Update lightning arcs
        for (const arc of this.lightningArcs) {
            arc.x -= gameSpeed * deltaTime;
            arc.points = this.generateLightningPoints();
            arc.alpha = Math.sin(this.electricTimer * arc.speed) * 0.3 + 0.7;
        }
        
        // Update plasma particles
        for (const particle of this.plasmaParticles) {
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;
            particle.life -= deltaTime * 0.5;
            
            // Reset particles that go off-screen or die
            if (particle.life <= 0 || particle.x < this.x || particle.x > this.x + this.width) {
                particle.x = this.x + Math.random() * this.width;
                particle.y = this.y + (Math.random() - 0.5) * 30;
                particle.vx = (Math.random() - 0.5) * 100;
                particle.vy = (Math.random() - 0.5) * 100;
                particle.life = 1;
                particle.color = Math.random() < 0.5 ? '#ff4444' : '#ffff44';
            }
        }
        
        // Update energy waves
        for (const wave of this.energyWaves) {
            wave.x -= gameSpeed * deltaTime;
            wave.radius += wave.speed * deltaTime;
            
            if (wave.radius >= wave.maxRadius) {
                wave.radius = 0;
                wave.x = this.x + Math.random() * this.width;
            }
        }
        
        // Check collision with obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            if (
                this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y - this.height/2 < obstacle.y + obstacle.height &&
                this.y + this.height/2 > obstacle.y
            ) {
                // Destroy obstacle
                createExplosion(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
                obstacles.splice(i, 1);
                this.targetsDestroyed++;
                
                // Add score for destroyed obstacle
                if (state === 'playing') {
                    score += 1; // 1 bonus point for laser destruction
                }
            }
        }
    }
}

// New effect functions
function createJumpEffect(x, y) {
    for (let i = 0; i < 15; i++) {
        const speed = Math.random() * 300 + 100;
        const angle = Math.random() * Math.PI * 2;
        particles.push(new Particle(x, y, Math.random() * 4 + 2, COLORS.playerGlow, {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        }));
    }
}

function createLandingEffect(x, y) {
    // Reduced particle count from 20 to 8 for a more subtle effect
    for (let i = 0; i < 8; i++) {
        // Reduced speed and size of particles
        const speed = Math.random() * 100 + 50;
        const angle = (Math.PI / 2) + (Math.random() - 0.5) * Math.PI;
        particles.push(new Particle(x, y, Math.random() * 1.5 + 0.5, COLORS.groundGlow, {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        }));
    }
}

function createExplosion(x, y) {
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 200 + 50;
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        const radius = Math.random() * 4 + 2;
        particles.push(new Particle(x, y, radius, COLORS.particleExplosion, velocity));
    }
    
    // Screen shake on explosion
    screenShake = 1.0;
}

function spawnObstacle(template) {
    let obstacle;
    const obstacleType = template.type || 'tall';

    if (obstacleType === 'low') {
        obstacle = {
            type: 'low',
            x: WORLD_WIDTH,
            y: GROUND_Y - 20,
            width: 60,
            height: 20
        };
    } else { // 'tall'
        const height = template.height || 100;
        obstacle = {
            type: 'tall',
            x: WORLD_WIDTH,
            y: GROUND_Y - height,
            width: 30,
            height: height
        };
    }
    obstacles.push(obstacle);
}

function updateObstacles(deltaTime) {
    if (state !== 'playing') return;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed * deltaTime;

        if (
            !player._invulnerable &&
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            console.log('Collision detected! Shield status:', player.shielded);
            if (player.shielded) {
                console.log('Shield consumed!');
                player.shielded = false;
                createExplosion(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
                // Remove the obstacle when shield is consumed
                obstacles.splice(i, 1);
                // Shield break effect handled by createExplosion
            } else {
                console.log('Player died - no shield!');
                state = 'over'; // Set state to over immediately
                saveScore(score);
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('slidingCubeHighScore', highScore);
                }
                audio.stop('music');
                createExplosion(player.x + player.width / 2, player.y + player.height / 2);
                updateDonationVisibility();
                setTimeout(() => {
                    showGameOverMenu();
                }, 1000);
            }
            // Break out of the loop since we've handled the collision
            break;
        }

        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            if (state === 'playing') {
                score++;
            }
        }
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.save();
        
        // Obstacle glow effect
        ctx.shadowColor = COLORS.obstacleGlow;
        ctx.shadowBlur = 20 + Math.sin(pulseEffect * 0.02) * 5;
        
        // Create gradient for obstacles, with a different look for the new type
        const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
        
        if (obstacle.type === 'low') {
            gradient.addColorStop(0, COLORS.lowObstacle);
            gradient.addColorStop(1, COLORS.lowObstacleGlow);
        } else {
            gradient.addColorStop(0, COLORS.obstacle);
            gradient.addColorStop(1, COLORS.obstacleGlow);
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Inner glow border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = COLORS.obstacleGlow;
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x + 2, obstacle.y + 2, obstacle.width - 4, obstacle.height - 4);
        
        ctx.restore();
    });
}

function drawGround() {
    ctx.save();
    
    // Ground glow effect
    ctx.strokeStyle = COLORS.ground;
    ctx.lineWidth = 4;
    ctx.shadowColor = COLORS.groundGlow;
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(WORLD_WIDTH, GROUND_Y);
    ctx.stroke();
    
    ctx.restore();
}

function drawUI() {
    ctx.save();
    
    // Apply screen shake to UI
    ctx.translate(cameraOffset.x * 0.5, cameraOffset.y * 0.5);
    
    ctx.fillStyle = COLORS.ui;
    ctx.font = `bold ${canvas.width * 0.05}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
    ctx.textAlign = 'center';
    ctx.shadowColor = COLORS.uiGlow;
    ctx.shadowBlur = 10;

    if (state === 'playing') {
        ctx.textAlign = 'left';
        ctx.font = `bold ${canvas.width * 0.06}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
        ctx.fillText(`SCORE: ${score}`, 30, 60);
        
        // Restore Speed indicator
        ctx.font = `${canvas.width * 0.03}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
        ctx.fillText(`SPEED: ${Math.floor(gameSpeed)}`, 30, 90);
        
        // Slow-mo timer indicator
        if (slowMoActive) {
            ctx.fillStyle = COLORS.slowMo;
            ctx.textAlign = 'right';
            ctx.font = `bold ${canvas.width * 0.025}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
            ctx.fillText(`SLOW-MO: ${slowMoTimer.toFixed(1)}s`, canvas.width - 30, 60);
        }
        
        // Shield status indicator
        if (player.shielded) {
            ctx.fillStyle = COLORS.playerShield;
            ctx.textAlign = 'right';
            ctx.font = `bold ${canvas.width * 0.025}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
            ctx.fillText(`SHIELD: ACTIVE`, canvas.width - 30, 90);
        }
        
        // Laser ready indicator
        if (player.laserReady) {
            ctx.fillStyle = COLORS.laser;
            ctx.textAlign = 'right';
            ctx.font = `bold ${canvas.width * 0.025}px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`;
            ctx.fillText(`LASER: READY`, canvas.width - 30, player.shielded ? 120 : 90);
        }
    }
    
    ctx.restore();
}

function restartGame() {
    // Reset game state
    state = 'playing';
    score = 0;
    gameSpeed = 300; // Default speed
    obstacles = [];
    powerUps = [];
    particles = [];
    stars = [];
    lasers = []; // Reset lasers
    
    // Reset player
    player.y = GROUND_Y - player.height;
    player.x = 100;
    player.velocityY = 0;
    player.rotation = 0;
    player.jumpsLeft = 2;
    player.history = [];
    player.shielded = false;
    player.laserReady = false;
    console.log('Game restarted - shield reset to false');
    
    // Reset spawning system
    currentChunk = null;
    chunkObstacleIndex = 0;
    obstacleSpawnTimer = 0;
    obstacleSpawnInterval = 2000;
    
    // Reset power-up effects
    slowMoActive = false;
    slowMoTimer = 0;
    
    // Reset visual effects
    screenShake = 0;
    
    // Hide all menus
    document.querySelectorAll('.menu-overlay').forEach(menu => {
        menu.style.display = 'none';
    });
    currentMenu = null;
    
    // Update donation visibility
    updateDonationVisibility();
    
    // Reset rotation notification for new session
    resetRotationNotification();
    
    // Add invulnerability briefly to prevent instant collision
    player._invulnerable = true;
    setTimeout(() => { player._invulnerable = false; }, 500);
    
    // Start background music
    audio.play('music');
}

// Reset rotation notification state for new game sessions
function resetRotationNotification() {
    // Reset the flag so notification can show again in new sessions
    rotationNotificationShown = false;
    if (rotationIndicatorTimeout) {
        clearTimeout(rotationIndicatorTimeout);
    }
    const indicator = document.getElementById('rotationIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function update(deltaTime) {
    if (state === 'playing') {
        if (slowMoActive) {
            slowMoTimer -= deltaTime;
            if (slowMoTimer <= 0) {
                gameSpeed /= SLOW_MO_FACTOR; // Restore speed
                slowMoActive = false;
            }
        }
        stars.forEach(star => star.update(deltaTime));
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0 || particle.radius <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update(deltaTime);
            }
        });
        player.update(deltaTime);
        updateObstacles(deltaTime);
        updatePowerUps(deltaTime);
        
        // Update lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
            const laser = lasers[i];
            laser.update(deltaTime);
            if (laser.timer <= 0) {
                lasers.splice(i, 1);
            }
        }
        
        // Reduced speed increase for a more gradual difficulty curve
        if (!slowMoActive) {
            gameSpeed += 0.2 * (deltaTime * 60);
        }
        // Add screen shake on high speeds
        if (gameSpeed > 500) {
            screenShake = Math.min(screenShake + 0.1, 0.5);
        }
    } else {
        // Only update visual effects and grid when not playing
        stars.forEach(star => star.update(deltaTime));
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0 || particle.radius <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update(deltaTime);
            }
        });
    }
    // Update visual effects
    updateVisualEffects(deltaTime);
    grid.update(deltaTime);
}

function updateSpawning() {
    if (state !== 'playing') return;
    spawnPowerUp(); // Attempt to spawn a power-up
    const lastObstacle = obstacles[obstacles.length - 1];
    const lastObstacleX = lastObstacle ? lastObstacle.x : 0;
    // Time to select a new chunk?
    if (!currentChunk || chunkObstacleIndex >= currentChunk.obstacles.length) {
        // Only if the coast is clear
        if (lastObstacleX < WORLD_WIDTH - 600) {
            currentChunk = LEVEL_CHUNKS[Math.floor(Math.random() * LEVEL_CHUNKS.length)];
            chunkObstacleIndex = 0;
        }
    }
    // If we have a chunk, spawn from it
    if (currentChunk) {
        // If it's a new chunk, spawn the first obstacle immediately.
        if (chunkObstacleIndex === 0 && obstacles.length === 0) {
            spawnObstacle(currentChunk.obstacles[0]);
            chunkObstacleIndex++;
            return; // Exit for this frame
        }
        const obstacleTemplate = currentChunk.obstacles[chunkObstacleIndex];
        if (obstacleTemplate) {
            const dynamicSpacing = Math.min(
                obstacleTemplate.baseSpacing + (gameSpeed * 0.4),
                WORLD_WIDTH - 100
            );
            if (lastObstacleX < WORLD_WIDTH - dynamicSpacing) {
                spawnObstacle(obstacleTemplate);
                chunkObstacleIndex++;
            }
        }
    }
}

function updateVisualEffects(deltaTime) {
    // Update pulse effect
    pulseEffect += deltaTime * 1000;
    
    // Update rainbow hue for disco effect
    rainbowHue = (rainbowHue + deltaTime * 200) % 360;

    // Update screen shake
    if (screenShake > 0) {
        cameraOffset.x = (Math.random() - 0.5) * screenShake * 20;
        cameraOffset.y = (Math.random() - 0.5) * screenShake * 20;
        screenShake -= deltaTime * 3;
    } else {
        cameraOffset.x = 0;
        cameraOffset.y = 0;
    }
    
    // Update glow intensity
    glowIntensity = 0.5 + Math.sin(pulseEffect * 0.01) * 0.3;
}

function draw() {
    ctx.save();

    // --- CAMERA TRANSFORM ---
    // Calculate the scale to fit the world width to the canvas width
    const scale = canvas.width / WORLD_WIDTH;
    ctx.scale(scale, scale);

    // Center horizontally if needed
    const offsetX = (canvas.width / scale - WORLD_WIDTH) / 2;
    // Correct vertical translation: anchor world bottom to canvas bottom
    const offsetY = (canvas.height / scale) - worldHeight;
    ctx.translate(offsetX, offsetY);

    // --- DRAW GAME WORLD (scaled) ---
    // Clear background
    const gradient = ctx.createLinearGradient(0, 0, 0, worldHeight);
    gradient.addColorStop(0, COLORS.background);
    gradient.addColorStop(1, COLORS.background2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WORLD_WIDTH, worldHeight);

    // Draw all game elements
    grid.draw();
    stars.forEach(star => star.draw());
    drawGround();
    particles.forEach(particle => particle.draw());
    drawObstacles();
    drawPowerUps();
    
    // Draw lasers
    lasers.forEach(laser => laser.draw());

    // Player
    player.draw();

    // Restore to the original, un-scaled context
    ctx.restore();

    // --- DRAW UI (not scaled) ---
    // The UI is drawn on top of the scaled game world,
    // using the original canvas coordinates.
    drawUI();
}

let obstacleSpawnTimer = 0;
let lastObstacleTime = 0;
let obstacleSpawnInterval = 2000;

function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000 || 0;
    lastTime = timestamp;

    update(deltaTime);
    updateSpawning();
    draw();

    requestAnimationFrame(gameLoop);
}

function handleInput() {
    if (state === 'playing') {
        player.jump();
    }
}

function resizeCanvas() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (window.visualViewport) {
        width = window.visualViewport.width;
        height = window.visualViewport.height;
    }
    canvas.width = width;
    canvas.height = height;

    // --- Dynamic World Sizing (Hor+ Scaling) ---
    // Use the scale to fit the world width to the canvas width
    const scale = canvas.width / WORLD_WIDTH;
    worldHeight = canvas.height / scale;

    // Ground is always 50px from the bottom of the world
    GROUND_Y = worldHeight - 50;

    // Only reset player Y position if they were on the ground
    if (player.y >= GROUND_Y - player.height) {
        player.y = GROUND_Y - player.height;
    }

    grid.init();

    stars = [];
    // Regenerate stars to fit the new world dimensions
    for(let i = 0; i < 30; i++) {
        stars.push(new Star(
            Math.random() * WORLD_WIDTH, 
            Math.random() * worldHeight, 
            Math.random() * 2 + 1, 
            COLORS.star, 
            3
        ));
    }
    for(let i = 0; i < 40; i++) {
        stars.push(new Star(
            Math.random() * WORLD_WIDTH, 
            Math.random() * worldHeight, 
            Math.random() * 1.5, 
            COLORS.starDim, 
            6
        ));
    }
    for(let i = 0; i < 20; i++) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        stars.push(new Star(
            Math.random() * WORLD_WIDTH, 
            Math.random() * worldHeight, 
            Math.random() * 1 + 0.5, 
            colors[Math.floor(Math.random() * colors.length)], 
            4
        ));
    }

    // Redraw the scene immediately after resizing
    if (state !== 'playing') {
        draw();
    }
}

// Improved rotation notification system
let rotationNotificationShown = false;
let rotationIndicatorTimeout = null;

function checkOrientation() {
    const indicator = document.getElementById('rotationIndicator');
    const isPortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    
    // Hide indicator when in landscape
    if (!isPortrait) {
        indicator.style.display = 'none';
        if (rotationIndicatorTimeout) {
            clearTimeout(rotationIndicatorTimeout);
        }
    }
}

// Function to show rotation notification when game starts
function showRotationNotification() {
    const indicator = document.getElementById('rotationIndicator');
    const isPortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    
    if (isPortrait && !rotationNotificationShown) {
        // Show subtle corner indicator
        indicator.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        if (rotationIndicatorTimeout) {
            clearTimeout(rotationIndicatorTimeout);
        }
        rotationIndicatorTimeout = setTimeout(() => {
            indicator.style.display = 'none';
        }, 5000);
        
        // Only set the flag, do not show toast
        rotationNotificationShown = true;
    }
}

// Toast notification system
function showToast(message, duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleInput();
    }
});
document.addEventListener('touchstart', handleInput);
window.addEventListener('resize', () => {
    resizeCanvas();
    checkOrientation();
});
window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvas, 100);
    setTimeout(checkOrientation, 100);
});

// Add rotation indicator close button functionality
document.addEventListener('DOMContentLoaded', () => {
    const rotationIndicator = document.getElementById('rotationIndicator');
    const closeBtn = rotationIndicator?.querySelector('.rotation-close-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            rotationIndicator.style.display = 'none';
            if (rotationIndicatorTimeout) {
                clearTimeout(rotationIndicatorTimeout);
            }
        });
    }
});

// Donation functionality
function initDonation() {
    const copyBtn = document.getElementById('copyBtn');
    const walletAddress = document.getElementById('walletAddress');
    const donationSection = document.getElementById('donationSection');
    const closeDonationBtn = document.getElementById('closeDonationBtn');
    
    // Prevent touch events in the donation section from starting the game
    if (donationSection) {
        donationSection.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        });
    }
    
    if (closeDonationBtn) {
        closeDonationBtn.addEventListener('click', () => {
            if (donationSection) {
                donationSection.style.display = 'none';
                donationSection.classList.remove('show');
            }
        });
    }
    
    if (copyBtn && walletAddress) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(walletAddress.value).then(() => {
                copyBtn.textContent = 'COPIED!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                copyBtn.textContent = 'FAILED';
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                }, 2000);
            });
        });
    }
}

function showNotification(message) {
    // Use the new toast system instead
    showToast(message, 2000);
}

function updateDonationVisibility() {
    const donationSection = document.getElementById('donationSection');
    if (donationSection) {
        // Show donation section only when game is not playing and on landing or main menu
        if (state !== 'playing' && (currentMenu === 'landing' || currentMenu === 'main')) {
            donationSection.classList.add('show');
        } else {
            donationSection.classList.remove('show');
        }
    }
}

function spawnPowerUp() {
    // Randomly decide whether to spawn a power-up
    if (Math.random() < 0.015 && powerUps.length === 0) { // 1.5% chance per frame, and only if no other power-up is on screen
        const size = 25; // Increased size
        const powerUpType = Math.random() < 0.33 ? 'shield' : (Math.random() < 0.5 ? 'slow-mo' : 'laser'); // 33% chance each
        const yPos = GROUND_Y - size - (Math.random() * 100 + 50);

        powerUps.push({
            x: WORLD_WIDTH + 50,
            y: yPos,
            baseY: yPos, // For floating animation
            width: size,
            height: size,
            type: powerUpType,
            animationTimer: Math.random() * Math.PI * 2 // Random start for animation
        });
    }
}

function updatePowerUps(deltaTime) {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        powerUp.x -= gameSpeed * deltaTime;

        // Animate floating
        powerUp.animationTimer += deltaTime * 3;
        powerUp.y = powerUp.baseY + Math.sin(powerUp.animationTimer) * 8; // Float up/down 8px

        // Collision with player
        if (
            player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y
        ) {
            console.log('Powerup collected! Type:', powerUp.type);
            audio.play('itemcollect');
            if (powerUp.type === 'shield') {
                console.log('Shield activated!');
                player.shielded = true;
                showToast('Shield activated!', 2000);
            } else if (powerUp.type === 'slow-mo') {
                activateSlowMo();
                showToast('Slow motion activated!', 2000);
            } else if (powerUp.type === 'laser') {
                player.laserReady = true;
                showToast('Laser ready! Land to activate!', 2000);
            }
            powerUps.splice(i, 1);
            // Powerup collection effect handled by visual feedback
        }

        // Remove if off-screen
        if (powerUp.x + powerUp.width < 0) {
            powerUps.splice(i, 1);
        }
    }
}

function drawPowerUps() {
    for (const powerUp of powerUps) {
        ctx.save();

        const isShield = powerUp.type === 'shield';
        const isLaser = powerUp.type === 'laser';
        let color;
        if (isShield) {
            color = `hsl(${rainbowHue}, 100%, 50%)`;
        } else if (isLaser) {
            color = COLORS.laser;
        } else {
            color = COLORS.slowMo;
        }
        
        // Pulsing glow
        const pulse = Math.sin(powerUp.animationTimer * 2) * 0.5 + 0.5;
        const glowSize = 10 + pulse * 10;
        
        ctx.shadowColor = color;
        ctx.shadowBlur = glowSize;

        // Translate to the power-up's position to make drawing self-contained
        ctx.translate(powerUp.x, powerUp.y);
        
        if (isShield) {
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
            ctx.strokeStyle = `hsl(${(rainbowHue + 180) % 360}, 100%, 90%)`;
            ctx.lineWidth = 2;
            ctx.stroke();

        } else if (powerUp.type === 'slow-mo') {
            const centerX = powerUp.width / 2;
            const centerY = powerUp.height / 2;
            const radius = powerUp.width / 2.5;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 3; // Thicker border
            
            // Clock face
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Clock hands
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.5, centerY); // Hour hand
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX, centerY - radius * 0.7); // Minute hand
            ctx.stroke();

            // Center dot
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (isLaser) {
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
            ctx.fillStyle = COLORS.laserGlow;
            ctx.fillRect(centerX - radius * 0.4, centerY - radius * 0.15, radius * 0.8, radius * 0.3);
        }
        
        ctx.restore();
    }
}

function activateSlowMo() {
    if (!slowMoActive) {
        gameSpeed *= SLOW_MO_FACTOR;
        slowMoActive = true;
        slowMoTimer = SLOW_MO_DURATION;
    }
}

function activateLaser() {
    // Clamp player.y to ground if very close
    const epsilon = 0.1;
    let playerY = player.y;
    if (Math.abs(player.y - (GROUND_Y - player.height)) < epsilon) {
        playerY = GROUND_Y - player.height;
    }
    const laserX = player.x + player.width / 2;
    const laserY = playerY + player.height / 2;
    lasers.push(new Laser(laserX, laserY));
    
    // Enhanced screen shake effect for electric laser
    screenShake = 1.0;
    
    // Create electric particle burst at player position
    for (let i = 0; i < 20; i++) {
        const speed = Math.random() * 200 + 100;
        const angle = Math.random() * Math.PI * 2;
        const color = Math.random() < 0.5 ? '#ffff44' : '#ff4444';
        particles.push(new Particle(laserX, laserY, Math.random() * 3 + 1, color, {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        }));
    }
    
    // Play laser sound for activation
    console.log('Attempting to play laser sound...'); // Debug log
    console.log('Audio enabled:', audio.enabled); // Debug log
    audio.play('laser');
    
    // Flash effect - briefly make the screen white
    setTimeout(() => {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'rgba(255, 255, 68, 0.3)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9999';
        flash.style.transition = 'opacity 0.1s ease-out';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 100);
        }, 50);
    }, 50);
}

// Initial setup
resizeCanvas();
audio.load(() => {
    // This callback runs when all audio files are loaded.
    // In a more complex game, you might show a "Click to Start" button here.
    console.log("Audio files loaded and ready.");
    audio.loadSettings(); // Load saved volume settings
});

// --- MENU SYSTEM ---
let currentMenu = 'landing'; // landing, main, help, gameOver
let gameSettings = {
    musicVolume: 40,
    sfxVolume: 80,
    visualEffects: true
};

// Load settings from localStorage and update UI
function loadSettingsToUI() {
    const savedMusicVolume = localStorage.getItem('slidingCubeMusicVolume');
    const savedSFXVolume = localStorage.getItem('slidingCubeSFXVolume');
    
    const musicSlider = document.getElementById('musicVolume');
    const sfxSlider = document.getElementById('sfxVolume');
    
    if (musicSlider && savedMusicVolume !== null) {
        musicSlider.value = savedMusicVolume;
        musicSlider.nextElementSibling.textContent = savedMusicVolume + '%';
        gameSettings.musicVolume = parseInt(savedMusicVolume);
    }
    
    if (sfxSlider && savedSFXVolume !== null) {
        sfxSlider.value = savedSFXVolume;
        sfxSlider.nextElementSibling.textContent = savedSFXVolume + '%';
        gameSettings.sfxVolume = parseInt(savedSFXVolume);
    }
}

// Save current settings
function saveSettings() {
    const musicSlider = document.getElementById('musicVolume');
    const sfxSlider = document.getElementById('sfxVolume');
    
    if (musicSlider) {
        gameSettings.musicVolume = parseInt(musicSlider.value);
        audio.setMusicVolume(gameSettings.musicVolume);
    }
    
    if (sfxSlider) {
        gameSettings.sfxVolume = parseInt(sfxSlider.value);
        audio.setSFXVolume(gameSettings.sfxVolume);
    }
    
    // Save to localStorage
    localStorage.setItem('slidingCubeGameSettings', JSON.stringify(gameSettings));
}

// Show menu
function showMenu(menuName) {
    // Hide all menus
    const menus = ['mainMenu', 'helpMenu', 'gameOverMenu', 'settingsMenu'];
    menus.forEach(menu => {
        const element = document.getElementById(menu);
        if (element) element.style.display = 'none';
    });
    
    // Move player to ground for menu consistency
    if (typeof GROUND_Y !== 'undefined' && typeof player !== 'undefined') {
        player.y = GROUND_Y - player.height;
        player.x = 100;
    }
    
    if (menuName) {
        // Show requested menu
        let targetMenu;
        if (menuName === 'main') {
            targetMenu = document.getElementById('mainMenu');
        } else {
            targetMenu = document.getElementById(menuName + 'Menu');
        }
        if (targetMenu) {
            targetMenu.style.display = 'flex';
            currentMenu = menuName;
        }
    } else {
        currentMenu = null; // No menu is active
    }
}

// Save score to recent scores
function saveScore(score) {
    const recentScores = JSON.parse(localStorage.getItem('slidingCubeRecentScores') || '[]');
    recentScores.push(score);
    recentScores.sort((a, b) => b - a); // Sort descending
    recentScores.splice(10); // Keep only top 10
    localStorage.setItem('slidingCubeRecentScores', JSON.stringify(recentScores));
    
    // Submit to Firebase leaderboard if available and wallet is connected
    if (window.leaderboardSystem && window.currentAccount) {
        window.leaderboardSystem.submitScore(score, window.currentAccount);
    } else if (window.leaderboardSystem) {
        // Submit anonymously if no wallet connected
        window.leaderboardSystem.submitScore(score, null, 'Anonymous');
    }
}

// Show game over menu
function showGameOverMenu() {
    const finalScoreElement = document.getElementById('finalScore');
    const gameOverHighScoreElement = document.getElementById('gameOverHighScore');
    const newRecordMessage = document.getElementById('newRecordMessage');
    
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }
    
    if (gameOverHighScoreElement) {
        gameOverHighScoreElement.textContent = highScore;
    }
    
    // Check if new record
    if (score > highScore) {
        if (newRecordMessage) {
            newRecordMessage.style.display = 'block';
        }
    } else {
        if (newRecordMessage) {
            newRecordMessage.style.display = 'none';
        }
    }
    
    showMenu('gameOver');
}

// Initialize menu system
function initMenuSystem() {
    // Main menu buttons
    document.getElementById('startGameBtn')?.addEventListener('click', () => {
        showMenu(null);
        state = 'playing';
        restartGame();
        // Show rotation notification if device is in portrait mode
        showRotationNotification();
    });

    document.getElementById('homeBtn')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('settingsBtn')?.addEventListener('click', () => {
        showMenu('settings');
        loadSettingsToUI();
    });

    document.getElementById('donationBtn')?.addEventListener('click', () => {
        const donationSection = document.getElementById('donationSection');
        if (donationSection) {
            donationSection.style.display = 'block';
            donationSection.classList.add('show');
        }
    });

    // Settings menu
    document.getElementById('closeSettingsBtn')?.addEventListener('click', () => {
        showMenu('main');
    });

    document.getElementById('backToMainBtn')?.addEventListener('click', () => {
        showMenu('main');
    });

    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
        saveSettings();
        showMenu('main');
        showToast('Settings saved!', 2000);
    });

    // Settings volume sliders
    document.getElementById('musicVolume')?.addEventListener('input', (e) => {
        const volume = e.target.value;
        e.target.nextElementSibling.textContent = volume + '%';
        audio.setMusicVolume(volume);
    });

    document.getElementById('sfxVolume')?.addEventListener('input', (e) => {
        const volume = e.target.value;
        e.target.nextElementSibling.textContent = volume + '%';
        audio.setSFXVolume(volume);
    });

    // Game over menu
    document.getElementById('playAgainBtn')?.addEventListener('click', () => {
        showMenu(null);
        state = 'playing';
        restartGame();
        // Show rotation notification if device is in portrait mode
        showRotationNotification();
    });

    document.getElementById('mainMenuBtn')?.addEventListener('click', () => {
        showMenu('main');
    });
}

// Initialize donation functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDonation();
    initMenuSystem();
    showMenu('main');
    updateDonationVisibility();
    checkOrientation();
});

requestAnimationFrame(gameLoop); 