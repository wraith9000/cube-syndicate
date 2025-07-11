'use client'

import { useEffect, useRef } from 'react'

interface GameCanvasProps {
  onGameOver: (score: number, highScore: number) => void
  gameOver: boolean
}

export default function GameCanvas({ onGameOver, gameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Game variables
    let gameState = 'menu' // menu, playing, over
    let score = 0
    let highScore = parseInt(localStorage.getItem('slidingCubeHighScore') || '0')
    let gameOverCalled = false
    let framesSinceStart = 0 // For grace period

    // Player
    const player = {
      x: 150, // Start further from the left
      y: 0,
      width: 50,
      height: 50,
      velocityY: 0,
      isJumping: false,
      canDoubleJump: false,
      hasShield: false,
      slowMoActive: false,
      slowMoTimer: 0
    }

    // Game settings
    let gameSpeed = 300 // Base speed
    let currentSpeed = 300 // Dynamic speed that increases over time
    let speedIncreaseRate = 2.0 // Speed increase per second (increased from 1.2)
    let obstacles: any[] = []
    let particles: any[] = []
    let powerUps: any[] = []
    let laserBeams: any[] = [] // New: Laser beam effects
    let laserParticles: any[] = [] // New: Laser particle effects

    // Colors
    const colors = {
      background: '#0d0221',
      player: '#00f6ff',
      playerGlow: '#00d4ff',
      playerShield: '#ffd700',
      obstacle: '#ff00c1',
      obstacleGlow: '#ff0080',
      ground: '#00f6ff',
      groundGlow: '#00d4ff',
      ui: '#ffffff',
      uiGlow: 'rgba(255, 255, 255, 0.8)',
      laser: '#ff0000',
      laserGlow: '#ff4444',
      laserCore: '#ffffff'
    }

    // Game loop
    let lastTime = 0
    const gameLoop = (timestamp: number) => {
      if (gameOver) return // Stop updating if overlay is up
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      framesSinceStart++

      // Clear canvas
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (gameState === 'playing') {
        updateGame(deltaTime)
        drawGame()
      } else if (gameState === 'menu') {
        drawMenu()
      } else if (gameState === 'over') {
        drawGameOver()
      }

      requestAnimationFrame(gameLoop)
    }

    const updateGame = (deltaTime: number) => {
      // Update speed over time
      currentSpeed += (speedIncreaseRate * deltaTime) / 1000
      
      // Update player
      updatePlayer(deltaTime)
      
      // Update obstacles
      updateObstacles(deltaTime)
      
      // Update particles
      updateParticles(deltaTime)
      
      // Update power-ups
      updatePowerUps(deltaTime)
      
      // Update laser effects
      updateLaserBeams(deltaTime)
      updateLaserParticles(deltaTime)
      
      // Check collisions only when playing
      if (gameState === 'playing') {
        checkCollisions()
      }
      
      // Update score
      score += Math.floor(deltaTime / 16) // Roughly 60 FPS
    }

    const updatePlayer = (deltaTime: number) => {
      // Apply gravity
      player.velocityY += 0.8
      player.y += player.velocityY

      // Ground collision
      const groundY = canvas.height - 100
      if (player.y + player.height > groundY) {
        player.y = groundY - player.height
        player.velocityY = 0
        player.isJumping = false
        player.canDoubleJump = false
      }

      // Update slow motion
      if (player.slowMoActive) {
        player.slowMoTimer -= deltaTime
        if (player.slowMoTimer <= 0) {
          player.slowMoActive = false
        }
      }
    }

    const updateObstacles = (deltaTime: number) => {
      const speed = player.slowMoActive ? currentSpeed * 0.5 : currentSpeed
      
      obstacles.forEach((obstacle, index) => {
        obstacle.x -= (speed * deltaTime) / 1000
        
        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
          obstacles.splice(index, 1)
        }
      })

      // Only spawn obstacles after 60 frames (~1s at 60fps)
      if (framesSinceStart > 60 && Math.random() < 0.01) {
        spawnObstacle()
      }
    }

    const updateParticles = (deltaTime: number) => {
      particles.forEach((particle, index) => {
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.life -= deltaTime

        if (particle.life <= 0) {
          particles.splice(index, 1)
        }
      })
    }

    const updatePowerUps = (deltaTime: number) => {
      const speed = player.slowMoActive ? currentSpeed * 0.5 : currentSpeed
      
      powerUps.forEach((powerUp, index) => {
        powerUp.x -= (speed * deltaTime) / 1000
        
        if (powerUp.x + powerUp.width < 0) {
          powerUps.splice(index, 1)
        }
      })

      // Spawn power-ups
      if (Math.random() < 0.005) {
        spawnPowerUp()
      }
    }

    const updateLaserBeams = (deltaTime: number) => {
      laserBeams.forEach((beam, index) => {
        beam.life -= deltaTime
        
        // Move laser particles along the beam
        if (beam.life > 0) {
          for (let i = 0; i < 3; i++) {
            laserParticles.push({
              x: beam.startX + Math.random() * (beam.endX - beam.startX),
              y: beam.startY + Math.random() * (beam.endY - beam.startY),
              velocityX: (Math.random() - 0.5) * 2,
              velocityY: (Math.random() - 0.5) * 2,
              life: 500,
              color: colors.laser,
              size: Math.random() * 3 + 1
            })
          }
        }
        
        if (beam.life <= 0) {
          laserBeams.splice(index, 1)
        }
      })
    }

    const updateLaserParticles = (deltaTime: number) => {
      laserParticles.forEach((particle, index) => {
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.life -= deltaTime

        if (particle.life <= 0) {
          laserParticles.splice(index, 1)
        }
      })
    }

    const spawnObstacle = () => {
      const groundY = canvas.height - 100
      const height = Math.random() > 0.5 ? 60 : 30
      const y = groundY - height
      
      obstacles.push({
        x: canvas.width,
        y: y,
        width: 30,
        height: height,
        type: height > 40 ? 'tall' : 'low'
      })
    }

    const spawnPowerUp = () => {
      const groundY = canvas.height - 100
      const types = ['slowmo', 'shield', 'laser']
      const type = types[Math.floor(Math.random() * types.length)]
      
      powerUps.push({
        x: canvas.width,
        y: groundY - 50,
        width: 30,
        height: 30,
        type: type
      })
    }

    const checkCollisions = () => {
      // Player-Obstacle collisions
      obstacles.forEach((obstacle, index) => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
          
          if (player.hasShield) {
            player.hasShield = false
            obstacles.splice(index, 1)
            createShieldBreakEffect()
          } else {
            gameOverFn()
          }
        }
      })

      // Player-PowerUp collisions
      powerUps.forEach((powerUp, index) => {
        if (player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y) {
          
          activatePowerUp(powerUp.type)
          powerUps.splice(index, 1)
        }
      })
    }

    const activatePowerUp = (type: string) => {
      switch (type) {
        case 'slowmo':
          player.slowMoActive = true
          player.slowMoTimer = 5000 // 5 seconds
          break
        case 'shield':
          player.hasShield = true
          break
        case 'laser':
          // Create laser beam effect
          const beamStartX = player.x + player.width / 2
          const beamStartY = player.y + player.height / 2
          const beamEndX = canvas.width + 100 // Extend beyond screen
          const beamEndY = player.y + player.height / 2
          
          // Create laser beam
          laserBeams.push({
            startX: beamStartX,
            startY: beamStartY,
            endX: beamEndX,
            endY: beamEndY,
            life: 1000, // 1 second duration
            width: 8
          })
          
          // Destroy obstacles hit by laser
          const obstaclesToDestroy: number[] = []
          
          obstacles.forEach((obstacle, index) => {
            // Since laser beam is horizontal, use simpler collision detection
            const beamY = beamStartY // Same as beamEndY since it's horizontal
            const beamWidth = 8
            
            // Check if obstacle intersects with horizontal laser beam
            let hit = false
            
            // Check if obstacle is within laser beam's Y range (with tolerance)
            if (obstacle.y <= beamY + beamWidth/2 + 5 && 
                obstacle.y + obstacle.height >= beamY - beamWidth/2 - 5) {
              
              // Check if obstacle is in front of player (to the right)
              if (obstacle.x > player.x) {
                hit = true
              }
            }
            
            if (hit) {
              obstaclesToDestroy.push(index)
            }
          })
          
          // Remove obstacles in reverse order to avoid index shifting
          obstaclesToDestroy.reverse().forEach(index => {
            const obstacle = obstacles[index]
            
            // Create explosion particles for destroyed obstacles
            for (let i = 0; i < 15; i++) {
              particles.push({
                x: obstacle.x + obstacle.width / 2,
                y: obstacle.y + obstacle.height / 2,
                velocityX: (Math.random() - 0.5) * 15,
                velocityY: (Math.random() - 0.5) * 15,
                life: 1500,
                color: colors.obstacle
              })
            }
            
            obstacles.splice(index, 1)
          })
          
          // Play laser sound effect
          if ((window as any).playLaserSound) {
            (window as any).playLaserSound()
          }
          break
      }
      // Play collect sound for any power-up
      if ((window as any).playCollectSound) {
        (window as any).playCollectSound()
      }
    }

    const createShieldBreakEffect = () => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x: player.x + player.width / 2,
          y: player.y + player.height / 2,
          velocityX: (Math.random() - 0.5) * 10,
          velocityY: (Math.random() - 0.5) * 10,
          life: 1000,
          color: colors.playerShield
        })
      }
      // Play collect sound for shield break
      if ((window as any).playCollectSound) {
        (window as any).playCollectSound()
      }
    }

    async function submitScoreToFirebase(score: number, playerName = "Anonymous", walletAddress = "Anonymous") {
      // Initialize Firebase if not already done
      if (!(window as any).db) {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        const firebaseConfig = {
          apiKey: "AIzaSyB0jYBTBZvGZO5ewu4YhsB8z40mVh7GgPs",
          authDomain: "cube-syndicate-leaderboard.firebaseapp.com",
          projectId: "cube-syndicate-leaderboard",
          storageBucket: "cube-syndicate-leaderboard.firebasestorage.app",
          messagingSenderId: "671324641744",
          appId: "1:671324641744:web:433beef3f3d536dd07c1d5",
          measurementId: "G-YVG98S5JJV"
        };
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        (window as any).db = db;
        (window as any).collection = collection;
        (window as any).addDoc = addDoc;
        (window as any).serverTimestamp = serverTimestamp;
      }

      // Add the score to Firestore
      await (window as any).addDoc(
        (window as any).collection((window as any).db, 'scores'),
        {
          score,
          playerName,
          walletAddress,
          timestamp: (window as any).serverTimestamp()
        }
      );
    }

    const gameOverFn = () => {
      if (gameState !== 'playing') return // Only allow game over when actually playing
      gameState = 'over'
      if (score > highScore) {
        highScore = score
        localStorage.setItem('slidingCubeHighScore', highScore.toString())
        // Submit to Firebase
        submitScoreToFirebase(highScore, "Anonymous", "Anonymous")
      }
      if (!gameOverCalled) {
        onGameOver(score, highScore)
        gameOverCalled = true
      }
    }

    const drawGame = () => {
      // Draw ground
      const groundY = canvas.height - 100
      ctx.fillStyle = colors.ground
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY)
      
      // Draw glow effect
      ctx.shadowColor = colors.groundGlow
      ctx.shadowBlur = 20
      ctx.fillRect(0, groundY, canvas.width, 5)
      ctx.shadowBlur = 0

      // Draw player
      ctx.fillStyle = player.hasShield ? colors.playerShield : colors.player
      ctx.fillRect(player.x, player.y, player.width, player.height)
      
      // Player glow
      ctx.shadowColor = player.hasShield ? colors.playerShield : colors.playerGlow
      ctx.shadowBlur = 15
      ctx.fillRect(player.x, player.y, player.width, player.height)
      ctx.shadowBlur = 0

      // Draw obstacles
      obstacles.forEach(obstacle => {
        ctx.fillStyle = colors.obstacle
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        
        // Obstacle glow
        ctx.shadowColor = colors.obstacleGlow
        ctx.shadowBlur = 10
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        ctx.shadowBlur = 0
      })

      // Draw power-ups
      powerUps.forEach(powerUp => {
        let color = '#00f6ff'
        switch (powerUp.type) {
          case 'slowmo': color = '#4d94ff'; break
          case 'shield': color = '#ffd700'; break
          case 'laser': color = '#ff0000'; break
        }
        
        ctx.fillStyle = color
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
      })

      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 1000
        ctx.fillRect(particle.x, particle.y, 4, 4)
        ctx.globalAlpha = 1
      })

      // Draw laser beams
      laserBeams.forEach(beam => {
        const alpha = beam.life / 1000
        ctx.globalAlpha = alpha
        
        // Draw laser core (bright white center)
        ctx.strokeStyle = colors.laserCore
        ctx.lineWidth = beam.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(beam.startX, beam.startY)
        ctx.lineTo(beam.endX, beam.endY)
        ctx.stroke()
        
        // Draw laser glow (red outer glow)
        ctx.strokeStyle = colors.laser
        ctx.lineWidth = beam.width + 4
        ctx.shadowColor = colors.laserGlow
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.moveTo(beam.startX, beam.startY)
        ctx.lineTo(beam.endX, beam.endY)
        ctx.stroke()
        
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      // Draw laser particles
      laserParticles.forEach(particle => {
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 500
        ctx.shadowColor = colors.laserGlow
        ctx.shadowBlur = 10
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      // Draw UI
      drawUI()
    }

    const drawUI = () => {
      ctx.fillStyle = colors.ui
      ctx.font = '24px Inter'
      ctx.textAlign = 'left'
      ctx.fillText(`Score: ${score}`, 20, 40)
      ctx.fillText(`High Score: ${highScore}`, 20, 70)
      ctx.fillText(`Speed: ${Math.round(currentSpeed)}`, 20, 100)
      
      if (player.hasShield) {
        ctx.fillText('SHIELD ACTIVE', 20, 130)
      }
      if (player.slowMoActive) {
        ctx.fillText('SLOW MOTION', 20, 160)
      }
    }

    const drawMenu = () => {
      ctx.fillStyle = colors.ui
      ctx.font = '48px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('SLIDING CUBE', canvas.width / 2, canvas.height / 2 - 100)
      
      ctx.font = '24px Inter'
      ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2)
      ctx.fillText('Press SPACE to jump (double jump available)', canvas.width / 2, canvas.height / 2 + 40)
    }

    const drawGameOver = () => {
      ctx.fillStyle = colors.ui
      ctx.font = '48px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 100)
      
      ctx.font = '24px Inter'
      ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2)
      ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40)
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 80)
    }

    // Input handling
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        
        if (gameState === 'menu') {
          gameState = 'playing'
          // Play collect sound for game start
          if ((window as any).playCollectSound) {
            (window as any).playCollectSound()
          }
        } else if (gameState === 'playing') {
          if (!player.isJumping) {
            // First jump
            player.velocityY = -15
            player.isJumping = true
            player.canDoubleJump = true
          } else if (player.canDoubleJump) {
            // Double jump
            player.velocityY = -12
            player.canDoubleJump = false
          }
        } else if (gameState === 'over') {
          // Reset game
          gameState = 'playing'
          score = 0
          currentSpeed = gameSpeed // Reset speed to base
          obstacles = []
          particles = []
          powerUps = []
          laserBeams = []
          laserParticles = []
          player.x = 150
          player.y = 0
          player.velocityY = 0
          player.isJumping = false
          player.canDoubleJump = false
          player.hasShield = false
          player.slowMoActive = false
          player.slowMoTimer = 0
          gameOverCalled = false
          framesSinceStart = 0
        }
      }
    }

    // Touch handling for mobile
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
      
      if (gameState === 'menu') {
        gameState = 'playing'
        // Play collect sound for game start
        if ((window as any).playCollectSound) {
          (window as any).playCollectSound()
        }
      } else if (gameState === 'playing') {
        if (!player.isJumping) {
          // First jump
          player.velocityY = -15
          player.isJumping = true
          player.canDoubleJump = true
        } else if (player.canDoubleJump) {
          // Double jump
          player.velocityY = -12
          player.canDoubleJump = false
        }
      } else if (gameState === 'over') {
        // Reset game
        gameState = 'playing'
        score = 0
        currentSpeed = gameSpeed // Reset speed to base
        obstacles = []
        particles = []
        powerUps = []
        laserBeams = []
        laserParticles = []
        player.x = 150
        player.y = 0
        player.velocityY = 0
        player.isJumping = false
        player.hasShield = false
        player.slowMoActive = false
        player.slowMoTimer = 0
        gameOverCalled = false
        framesSinceStart = 0
      }
    }

    // Event listeners
    document.addEventListener('keydown', handleKeyPress)
    canvas.addEventListener('touchstart', handleTouch)

    // Start game loop
    gameLoop(0)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      canvas.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [onGameOver, gameOver])

  return (
    <canvas
      ref={canvasRef}
      id="gameCanvas"
      style={{ display: 'block' }}
    />
  )
} 