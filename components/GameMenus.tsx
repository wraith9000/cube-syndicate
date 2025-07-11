'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Leaderboard from './Leaderboard'

interface GameMenusProps {
  showGameOver: boolean
  finalScore: number
  highScore: number
  onRetry: () => void
  onMenu: () => void
  showMenu: boolean
  onStartGame: () => void
  onSettings: () => void
  showSettings: boolean
  onLeaderboard: () => void
  showLeaderboard: boolean
  onBackToMenu: () => void
  onHome: () => void
}

export default function GameMenus({ showGameOver, finalScore, highScore, onRetry, onMenu, showMenu, onStartGame, onSettings, showSettings, onLeaderboard, showLeaderboard, onBackToMenu, onHome }: GameMenusProps) {
  const [musicVolume, setMusicVolume] = useState(40)
  const [sfxVolume, setSfxVolume] = useState(80)
  const [visualEffects, setVisualEffects] = useState(true)

  useEffect(() => {
    // Load saved settings
    const savedMusicVolume = localStorage.getItem('slidingCubeMusicVolume')
    const savedSFXVolume = localStorage.getItem('slidingCubeSFXVolume')
    const savedVisualEffects = localStorage.getItem('slidingCubeVisualEffects')
    if (savedMusicVolume) setMusicVolume(parseInt(savedMusicVolume))
    if (savedSFXVolume) setSfxVolume(parseInt(savedSFXVolume))
    if (savedVisualEffects) setVisualEffects(savedVisualEffects === 'true')
  }, [])

  const saveSettings = () => {
    localStorage.setItem('slidingCubeMusicVolume', musicVolume.toString())
    localStorage.setItem('slidingCubeSFXVolume', sfxVolume.toString())
    localStorage.setItem('slidingCubeVisualEffects', visualEffects.toString())
    onBackToMenu()
  }

  if (showSettings) {
    return (
      <div className="menu-overlay">
        <div className="menu-container">
          <div className="menu-header">
            <h2 className="menu-title">SETTINGS</h2>
            <button className="close-menu-btn" onClick={onBackToMenu}>&times;</button>
          </div>
          <div className="settings-content">
            <div className="setting-group">
              <label className="setting-label">MUSIC VOLUME</label>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseInt(e.target.value))}
              />
              <span className="volume-value">{musicVolume}%</span>
            </div>
            <div className="setting-group">
              <label className="setting-label">SFX VOLUME</label>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="100"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseInt(e.target.value))}
              />
              <span className="volume-value">{sfxVolume}%</span>
            </div>
            <div className="setting-group">
              <label className="setting-label">VISUAL EFFECTS</label>
              <div className="toggle-container">
                <input
                  type="checkbox"
                  className="toggle-input"
                  checked={visualEffects}
                  onChange={(e) => setVisualEffects(e.target.checked)}
                  id="visualEffects"
                />
                <label htmlFor="visualEffects" className="toggle-label"></label>
              </div>
            </div>
          </div>
          <div className="menu-actions">
            <button className="menu-btn primary-btn" onClick={saveSettings}>SAVE</button>
            <button className="menu-btn" onClick={onBackToMenu}>BACK</button>
          </div>
        </div>
      </div>
    )
  }

  if (showMenu) {
    return (
      <div className="menu-overlay">
        <div className="menu-container">
          <div className="menu-header">
            <h1 className="game-title">SLIDING CUBE</h1>
            <div className="title-glow"></div>
          </div>
          <div className="menu-options">
            <button className="menu-btn primary-btn" onClick={onStartGame}>
              <span className="btn-text">START GAME</span>
              <div className="btn-glow"></div>
            </button>
            <button className="menu-btn" onClick={onLeaderboard}>
              <span className="btn-text">LEADERBOARD</span>
              <div className="btn-glow"></div>
            </button>
            <button className="menu-btn" onClick={onSettings}>
              <span className="btn-text">SETTINGS</span>
              <div className="btn-glow"></div>
            </button>
            <button className="menu-btn" onClick={onHome}>
              <span className="btn-text">HOME</span>
              <div className="btn-glow"></div>
            </button>
          </div>
          <div className="menu-footer">
            <p className="version-text">v1.0.0</p>
          </div>
        </div>
      </div>
    )
  }

  if (showGameOver) {
    return (
      <div className="menu-overlay">
        <div className="menu-container">
          <div className="menu-header">
            <h2 className="menu-title">GAME OVER</h2>
          </div>
          <div className="game-over-content">
            <div className="final-score">
              <span className="score-label">FINAL SCORE</span>
              <span className="score-value">{finalScore}</span>
            </div>
            <div className="score-comparison">
              <div className="score-item">
                <span className="score-label">HIGH SCORE</span>
                <span className="score-value">{highScore}</span>
              </div>
            </div>
            {finalScore > highScore && (
              <div className="new-record">
                <span className="record-text">🎉 NEW RECORD! 🎉</span>
              </div>
            )}
          </div>
          <div className="menu-actions">
            <button className="menu-btn primary-btn" onClick={onRetry}>PLAY AGAIN</button>
            <button className="menu-btn" onClick={onMenu}>MENU</button>
          </div>
        </div>
      </div>
    )
  }

  if (showLeaderboard) {
    return <Leaderboard onClose={onBackToMenu} />
  }

  return null
} 