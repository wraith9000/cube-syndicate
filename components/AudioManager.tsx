'use client';

import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  musicVolume: number;
  sfxVolume: number;
  isPlaying: boolean;
}

export default function AudioManager({ musicVolume, sfxVolume, isPlaying }: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const laserSoundRef = useRef<HTMLAudioElement | null>(null);
  const collectSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Initialize audio elements
    if (!musicRef.current) {
      musicRef.current = new Audio('/assets/audio/music.mp3');
      musicRef.current.loop = true;
      musicRef.current.preload = 'auto';
    }

    if (!laserSoundRef.current) {
      laserSoundRef.current = new Audio('/assets/audio/laserbraam.mp3');
      laserSoundRef.current.preload = 'auto';
    }

    if (!collectSoundRef.current) {
      collectSoundRef.current = new Audio('/assets/audio/itemcollect.mp3');
      collectSoundRef.current.preload = 'auto';
    }

    // Set initial volumes
    if (musicRef.current) {
      musicRef.current.volume = musicVolume / 100;
    }
    if (laserSoundRef.current) {
      laserSoundRef.current.volume = sfxVolume / 100;
    }
    if (collectSoundRef.current) {
      collectSoundRef.current.volume = sfxVolume / 100;
    }

    // Start/stop music based on game state
    if (isPlaying && musicRef.current) {
      musicRef.current.play().catch(error => {
        // Audio autoplay prevented
      });
    } else if (!isPlaying && musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  }, [isPlaying, musicVolume, sfxVolume]);

  // Update volumes when they change
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = musicVolume / 100;
    }
    if (laserSoundRef.current) {
      laserSoundRef.current.volume = sfxVolume / 100;
    }
    if (collectSoundRef.current) {
      collectSoundRef.current.volume = sfxVolume / 100;
    }
  }, [musicVolume, sfxVolume]);

  // Expose audio functions to window for use in game
  useEffect(() => {
    (window as any).playLaserSound = () => {
      if (laserSoundRef.current && sfxVolume > 0) {
        laserSoundRef.current.currentTime = 0;
        laserSoundRef.current.play().catch(error => {
          // Laser sound play failed
        });
      }
    };

    (window as any).playCollectSound = () => {
      if (collectSoundRef.current && sfxVolume > 0) {
        collectSoundRef.current.currentTime = 0;
        collectSoundRef.current.play().catch(error => {
          // Collect sound play failed
        });
      }
    };

    return () => {
      delete (window as any).playLaserSound;
      delete (window as any).playCollectSound;
    };
  }, [sfxVolume]);

  return null; // This component doesn't render anything
} 