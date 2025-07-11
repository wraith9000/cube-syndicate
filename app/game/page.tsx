"use client";

import { useState, useEffect } from "react";
import GameCanvas from "@/components/GameCanvas";
import ScriptHandler from "@/components/ScriptHandler";
import AudioManager from "@/components/AudioManager";
import "./game.css";

export default function GamePage() {
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [restartKey, setRestartKey] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showRotationIndicator, setShowRotationIndicator] = useState(false);
  const [musicVolume, setMusicVolume] = useState(40);
  const [sfxVolume, setSfxVolume] = useState(80);
  const [visualEffects, setVisualEffects] = useState(true);
  const [currentHighScore, setCurrentHighScore] = useState(0);
  const [scoreList, setScoreList] = useState<any[]>([]);

  useEffect(() => {
    // Load saved settings
    const savedMusicVolume = localStorage.getItem('slidingCubeMusicVolume');
    const savedSFXVolume = localStorage.getItem('slidingCubeSFXVolume');
    const savedVisualEffects = localStorage.getItem('slidingCubeVisualEffects');
    if (savedMusicVolume) setMusicVolume(parseInt(savedMusicVolume));
    if (savedSFXVolume) setSfxVolume(parseInt(savedSFXVolume));
    if (savedVisualEffects) setVisualEffects(savedVisualEffects === 'true');

    // Check for rotation indicator on mobile
    if (window.innerWidth < 768 && window.innerHeight < window.innerWidth) {
      setShowRotationIndicator(true);
    }
  }, []);

  const handleGameOver = (score: number, high: number) => {
    setFinalScore(score);
    setHighScore(high);
    setGameOver(true);
  };

  const handleRetry = () => {
    setGameOver(false);
    setRestartKey((k) => k + 1);
  };

  const handleMenu = () => {
    setGameOver(false);
    setShowMenu(true);
    setShowSettings(false);
    setShowLeaderboard(false);
  };

  const handleStartGame = () => {
    setGameOver(false);
    setShowMenu(false);
    setShowSettings(false);
    setShowLeaderboard(false);
    setRestartKey((k) => k + 1);
  };

  const handleSettings = () => {
    setShowSettings(true);
    setShowMenu(false);
    setShowLeaderboard(false);
  };

  const handleLeaderboard = () => {
    setShowLeaderboard(true);
    setShowMenu(false);
    setShowSettings(false);
  };

  const handleBackToMenu = () => {
    setShowSettings(false);
    setShowLeaderboard(false);
    setShowMenu(true);
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  const handleDonation = () => {
    setShowDonation(true);
  };

  const handleCloseDonation = () => {
    setShowDonation(false);
  };

  const handleCopyWallet = () => {
    const walletAddress = "0x922abf80ce0a08d17a0e308beb261e3c67eb0e1c";
    navigator.clipboard.writeText(walletAddress);
    showToast("Wallet address copied to clipboard!");
  };

  const handleCloseRotation = () => {
    setShowRotationIndicator(false);
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    const container = document.getElementById('toastContainer');
    if (container) {
      container.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('slidingCubeMusicVolume', musicVolume.toString());
    localStorage.setItem('slidingCubeSFXVolume', sfxVolume.toString());
    localStorage.setItem('slidingCubeVisualEffects', visualEffects.toString());
    handleBackToMenu();
  };

  const resetScores = () => {
    localStorage.removeItem('slidingCubeHighScore');
    localStorage.removeItem('slidingCubeScores');
    setCurrentHighScore(0);
    setScoreList([]);
    showToast("Scores reset successfully!");
  };

  return (
    <div className="game-page">
      <ScriptHandler />
      <canvas id="gameCanvas"></canvas>
      
      {/* Main Menu */}
      {showMenu && (
        <div id="mainMenu" className="menu-overlay">
          <div className="menu-container">
            <div className="menu-header">
              <h1 className="game-title">SLIDING CUBE</h1>
              <div className="title-glow"></div>
            </div>
            
            <div className="menu-options">
              <button id="startGameBtn" className="menu-btn primary-btn" onClick={handleStartGame}>
                <span className="btn-text">START GAME</span>
                <div className="btn-glow"></div>
              </button>
              
              <button id="homeBtn" className="menu-btn" onClick={handleHome}>
                <span className="btn-text">HOME</span>
                <div className="btn-glow"></div>
              </button>
              
              <button id="settingsBtn" className="menu-btn" onClick={handleSettings}>
                <span className="btn-text">SETTINGS</span>
                <div className="btn-glow"></div>
              </button>
              
              <button id="donationBtn" className="menu-btn" onClick={handleDonation}>
                <span className="btn-text">SUPPORT</span>
                <div className="btn-glow"></div>
              </button>
            </div>
            
            <div className="menu-footer">
              <p className="version-text">v1.0.0</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Menu */}
      {showSettings && (
        <div id="settingsMenu" className="menu-overlay">
          <div className="menu-container">
            <div className="menu-header">
              <h2 className="menu-title">SETTINGS</h2>
              <button id="closeSettingsBtn" className="close-menu-btn" onClick={handleBackToMenu}>&times;</button>
            </div>
            
            <div className="settings-content">
              <div className="setting-group">
                <label className="setting-label">MUSIC VOLUME</label>
                <input 
                  type="range" 
                  id="musicVolume" 
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
                  id="sfxVolume" 
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
                    id="visualEffects" 
                    className="toggle-input" 
                    checked={visualEffects}
                    onChange={(e) => setVisualEffects(e.target.checked)}
                  />
                  <label htmlFor="visualEffects" className="toggle-label"></label>
                </div>
              </div>
            </div>
            
            <div className="menu-actions">
              <button id="saveSettingsBtn" className="menu-btn primary-btn" onClick={saveSettings}>SAVE</button>
              <button id="backToMainBtn" className="menu-btn" onClick={handleBackToMenu}>BACK</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Leaderboard Menu */}
      {showLeaderboard && (
        <div id="leaderboardMenu" className="menu-overlay">
          <div className="menu-container">
            <div className="menu-header">
              <h2 className="menu-title">LEADERBOARD</h2>
              <button id="closeLeaderboardBtn" className="close-menu-btn" onClick={handleBackToMenu}>&times;</button>
            </div>
            <div className="high-score-content">
              <div className="score-display">
                <div className="current-score">
                  <span className="score-label">YOUR BEST SCORE</span>
                  <span id="currentHighScore" className="score-value">{currentHighScore}</span>
                </div>
              </div>
              <div className="score-history">
                <h3>RECENT SCORES</h3>
                <div id="scoreList" className="score-list">
                  {scoreList.map((score, index) => (
                    <div key={index} className="score-item">
                      <span className="score-value">{score.score}</span>
                      <span className="score-date">{score.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="menu-actions">
              <button id="resetScoresBtn" className="menu-btn danger-btn" onClick={resetScores}>RESET SCORES</button>
              <button id="backFromLeaderboardBtn" className="menu-btn" onClick={handleBackToMenu}>BACK</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Game Over Menu */}
      {gameOver && (
        <div id="gameOverMenu" className="menu-overlay">
          <div className="menu-container">
            <div className="menu-header">
              <h2 className="menu-title">GAME OVER</h2>
            </div>
            
            <div className="game-over-content">
              <div className="final-score">
                <span className="score-label">FINAL SCORE</span>
                <span id="finalScore" className="score-value">{finalScore}</span>
              </div>
              
              <div className="score-comparison">
                <div className="score-item">
                  <span className="score-label">HIGH SCORE</span>
                  <span id="gameOverHighScore" className="score-value">{highScore}</span>
                </div>
              </div>
              
              {finalScore > highScore && (
                <div id="newRecordMessage" className="new-record">
                  <span className="record-text">🎉 NEW RECORD! 🎉</span>
                </div>
              )}
            </div>
            
            <div className="menu-actions">
              <button id="playAgainBtn" className="menu-btn primary-btn" onClick={handleRetry}>PLAY AGAIN</button>
              <button id="mainMenuBtn" className="menu-btn" onClick={handleMenu}>MAIN MENU</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Donation Section */}
      <div id="donationSection" className={`donation-section ${showDonation ? 'show' : ''}`}>
        <div className="donation-content">
          <button id="closeDonationBtn" className="close-btn" onClick={handleCloseDonation}>&times;</button>
          <h3>Support the Developer</h3>
          <p>If you enjoy this game, consider supporting its development!</p>
          <div className="wallet-container">
            <label className="wallet-label">ARENA:</label>
            <input type="text" id="walletAddress" value="0x922abf80ce0a08d17a0e308beb261e3c67eb0e1c" readOnly />
            <button id="copyBtn" className="copy-btn" onClick={handleCopyWallet}>COPY</button>
          </div>
        </div>
      </div>
      
      {/* Subtle rotation indicator */}
      <div id="rotationIndicator" className={`rotation-indicator ${showRotationIndicator ? '' : 'hidden'}`}>
        <div className="rotation-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="rotation-text">Rotate for better view</span>
        <button className="rotation-close-btn" onClick={handleCloseRotation}>&times;</button>
      </div>

      {/* Toast notification system */}
      <div id="toastContainer" className="toast-container"></div>

      {/* Audio Manager */}
      <AudioManager
        musicVolume={musicVolume}
        sfxVolume={sfxVolume}
        isPlaying={!showMenu && !showSettings && !showLeaderboard && !gameOver}
      />

      {/* Game Canvas */}
      {!showMenu && !showSettings && !showLeaderboard && !gameOver && (
        <GameCanvas
          key={restartKey}
          onGameOver={handleGameOver}
          gameOver={gameOver}
        />
      )}
    </div>
  );
} 