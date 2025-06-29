/**
 * AudioManager.js - Handles all audio functionality
 */

export class AudioManager {
    constructor() {
        this.files = {
            music: 'assets/audio/music.mp3',
            laser: 'assets/audio/laserbraam.mp3',
            itemcollect: 'assets/audio/itemcollect.mp3',
        };
        this.sounds = {};
        this.enabled = true;
        this.musicVolume = 0.4; // Default music volume (40%)
        this.sfxVolume = 0.8;   // Default SFX volume (80%)
        
        this.loadSettings();
    }

    /**
     * Load all audio files
     * @param {Function} callback - Called when loading is complete
     */
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
    }

    /**
     * Play a sound by name
     * @param {string} soundName - Name of the sound to play
     */
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
    }
    
    /**
     * Stop a sound by name
     * @param {string} soundName - Name of the sound to stop
     */
    stop(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Stop all sounds
     */
    stopAll() {
        for (const sound of Object.values(this.sounds)) {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        }
    }

    /**
     * Set music volume
     * @param {number} volume - Volume as percentage (0-100)
     */
    setMusicVolume(volume) {
        this.musicVolume = volume / 100; // Convert percentage to 0-1 range
        if (this.sounds.music) {
            this.sounds.music.volume = this.musicVolume;
        }
        // Save to localStorage
        localStorage.setItem('slidingCubeMusicVolume', volume);
    }

    /**
     * Set SFX volume
     * @param {number} volume - Volume as percentage (0-100)
     */
    setSFXVolume(volume) {
        this.sfxVolume = volume / 100; // Convert percentage to 0-1 range
        // Save to localStorage
        localStorage.setItem('slidingCubeSFXVolume', volume);
    }

    /**
     * Load saved volume settings
     */
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
    }

    /**
     * Toggle audio on/off
     */
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            // Stop all sounds when disabled
            this.stopAll();
        }
    }

    /**
     * Get music volume as percentage
     * @returns {number} Volume percentage
     */
    getMusicVolume() {
        return this.musicVolume * 100;
    }

    /**
     * Get SFX volume as percentage
     * @returns {number} Volume percentage
     */
    getSFXVolume() {
        return this.sfxVolume * 100;
    }

    /**
     * Check if audio is enabled
     * @returns {boolean} Audio enabled state
     */
    isEnabled() {
        return this.enabled;
    }
}

// Export singleton instance
export const audioManager = new AudioManager(); 