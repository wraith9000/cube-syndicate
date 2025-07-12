'use client'

import { useState, useEffect } from 'react'
import ScriptHandler from '@/components/ScriptHandler'
import LeaderboardModal from '@/components/LeaderboardModal'
import WalletConnect from '@/components/WalletConnect'
import { useWallet } from '@/lib/useWallet'

export default function Home() {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const { address, isConnected, formatAddress } = useWallet()

  const startGame = () => {
    window.location.href = '/game'
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLeaderboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLeaderboard(true)
  }

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-cube"></i>
            <span>SLIDING CUBE</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#gameplay">How to Play</a></li>
            <li><a href="#leaderboard" onClick={handleLeaderboardClick}>Leaderboard</a></li>
            <li className="wallet-connect">
              <WalletConnect />
            </li>
          </ul>
          <div className="hamburger" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Leaderboard Modal - use modal wrapper for popup effect */}
      <LeaderboardModal isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              SLIDING
              <span className="gradient-text">CUBE</span>
            </h1>
            <p className="hero-description">
              Navigate your neon cube through an endless cyberpunk world. Jump over obstacles, collect power-ups, and survive as long as possible in this addictive runner game.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={startGame} aria-label="Start playing the game">
                <i className="fas fa-play" aria-hidden="true"></i>
                START GAME
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('gameplay')} aria-label="Learn how to play">
                <i className="fas fa-info-circle" aria-hidden="true"></i>
                HOW TO PLAY
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="cube-animation" aria-label="Animated 3D cube">
              <div className="cube">
                <div className="face front" aria-hidden="true"></div>
                <div className="face back" aria-hidden="true"></div>
                <div className="face right" aria-hidden="true"></div>
                <div className="face left" aria-hidden="true"></div>
                <div className="face top" aria-hidden="true"></div>
                <div className="face bottom" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">GAME FEATURES</h2>
          <div className="features-grid">
            <div className="feature-card" tabIndex={0} role="button" aria-label="Endless runner feature">
              <div className="feature-icon">
                <i className="fas fa-running" aria-hidden="true"></i>
              </div>
              <h3>Endless Runner</h3>
              <p>Navigate through procedurally generated obstacles in an infinite cyberpunk world. How far can you go?</p>
            </div>
            <div className="feature-card" tabIndex={0} role="button" aria-label="Power-ups feature">
              <div className="feature-icon">
                <i className="fas fa-bolt" aria-hidden="true"></i>
              </div>
              <h3>Power-Ups</h3>
              <p>Collect Slow Motion and Shield power-ups to help you survive longer and achieve higher scores.</p>
            </div>
            <div className="feature-card" tabIndex={0} role="button" aria-label="Leaderboards feature">
              <div className="feature-icon">
                <i className="fas fa-trophy" aria-hidden="true"></i>
              </div>
              <h3>Leaderboards</h3>
              <p>Track your high scores and compete with yourself. Beat your personal best with each run!</p>
            </div>
            <div className="feature-card" tabIndex={0} role="button" aria-label="Cyberpunk aesthetic feature">
              <div className="feature-icon">
                <i className="fas fa-palette" aria-hidden="true"></i>
              </div>
              <h3>Cyberpunk Aesthetic</h3>
              <p>Immerse yourself in a neon-lit world with stunning visual effects and smooth animations.</p>
            </div>
            <div className="feature-card" tabIndex={0} role="button" aria-label="Mobile optimization feature">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt" aria-hidden="true"></i>
              </div>
              <h3>Mobile Optimized</h3>
              <p>Play anywhere! Touch controls for mobile devices, keyboard controls for desktop.</p>
            </div>
            <div className="feature-card" tabIndex={0} role="button" aria-label="Immersive audio feature">
              <div className="feature-icon">
                <i className="fas fa-music" aria-hidden="true"></i>
              </div>
              <h3>Immersive Audio</h3>
              <p>Custom sound effects and background music enhance the cyberpunk atmosphere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="gameplay">
        <div className="container">
          <div className="gameplay-content">
            <div className="gameplay-text">
              <h2>HOW TO PLAY</h2>
              <div className="gameplay-steps">
                <div className="step">
                  <div className="step-number" aria-label="Step 1">1</div>
                  <div className="step-content">
                    <h3>JUMP OVER OBSTACLES</h3>
                    <p>Press SPACE or tap the screen to make your cube jump over incoming obstacles. Timing is everything!</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number" aria-label="Step 2">2</div>
                  <div className="step-content">
                    <h3>COLLECT POWER-UPS</h3>
                    <p>Grab Slow Motion (blue clock) to slow down time, Shield (rainbow) to protect against one hit, or Laser (red beam) to destroy obstacles when you land.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number" aria-label="Step 3">3</div>
                  <div className="step-content">
                    <h3>SURVIVE & SCORE</h3>
                    <p>Survive as long as possible to build your score. The longer you last, the higher your score!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gameplay-visual">
              <div className="game-demo">
                <div className="demo-grid" aria-label="Game demo grid">
                  <div className="demo-cube active" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                  <div className="demo-cube" aria-hidden="true"></div>
                </div>
                <div className="powerup-demo">
                  <div className="powerup slowmo" tabIndex={0} role="button" aria-label="Slow Motion power-up">
                    <div className="icon-glow"><i className="fas fa-clock" aria-hidden="true"></i></div>
                    <span>Slow-MO</span>
                  </div>
                  <div className="powerup shield" tabIndex={0} role="button" aria-label="Shield power-up">
                    <div className="icon-glow"><i className="fas fa-shield-alt" aria-hidden="true"></i></div>
                    <span>Shield</span>
                  </div>
                  <div className="powerup laser" tabIndex={0} role="button" aria-label="Laser power-up">
                    <div className="icon-glow"><i className="fas fa-bolt" aria-hidden="true"></i></div>
                    <span>Laser</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <i className="fas fa-cube" aria-hidden="true"></i>
                <span>SLIDING CUBE</span>
              </div>
              <p>Navigate through the cyberpunk world in this addictive endless runner game.</p>
            </div>
            <div className="footer-section">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#gameplay">How to Play</a></li>
                <li><a href="#leaderboard" onClick={handleLeaderboardClick}>Leaderboard</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>CONNECT</h4>
              <div className="social-links">
                <a href="https://x.com/Wraith9000" aria-label="Follow us on X" target="_blank" rel="noopener">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', fontSize: '1.5rem', fontWeight: 'bold', color: '#00f6ff', fontFamily: "'Inter', Arial, sans-serif", letterSpacing: '2px', lineHeight: 1 }}>
                    X
                  </span>
                </a>
                <a href="https://arena.social/Wraith9000" aria-label="Join us on Arena.social" target="_blank" rel="noopener">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', marginBottom: '4px' }}>
                    <svg width="28" height="28" viewBox="0 2 32 28" fill="none" style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M16 24 V12" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M12 24 V14" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M20 24 V14" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M8 24 V16" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M24 24 V16" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M6 24 Q16 4 26 24" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <path d="M10 24 Q16 8 22 24" stroke="#00f6ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      </g>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Sliding Cube. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScriptHandler />
    </>
  )
} 