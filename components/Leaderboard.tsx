'use client'

import { useState, useEffect } from 'react'

// Type declarations for global Firebase objects


interface LeaderboardEntry {
  id: string
  score: number
  playerName: string
  walletAddress: string
  timestamp: any
}

interface LeaderboardProps {
  onClose: () => void
}

export default function Leaderboard({ onClose }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)

      // Initialize Firebase if not already done
      if (!window.firebase) {
        await initializeFirebase()
      }

      // Fetch leaderboard data
      const scoresRef = window.collection(window.db, 'scores')
      const q = window.query(scoresRef, window.orderBy('score', 'desc'), window.limit(10))
      const snapshot = await window.getDocs(q)

      const data: LeaderboardEntry[] = []
      snapshot.forEach((doc: any) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setLeaderboardData(data)
    } catch (err) {
      console.error('Error loading leaderboard:', err)
      setError('Failed to load leaderboard data')
    } finally {
      setLoading(false)
    }
  }

  const initializeFirebase = async () => {
    // Check if Firebase is already initialized
    if (window.db) return

    try {
      // Import Firebase modules using npm package
      const { initializeApp } = await import('firebase/app')
      const { getFirestore, collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')

      // Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyB0jYBTBZvGZO5ewu4YhsB8z40mVh7GgPs",
        authDomain: "cube-syndicate-leaderboard.firebaseapp.com",
        projectId: "cube-syndicate-leaderboard",
        storageBucket: "cube-syndicate-leaderboard.firebasestorage.app",
        messagingSenderId: "671324641744",
        appId: "1:671324641744:web:433beef3f3d536dd07c1d5",
        measurementId: "G-YVG98S5JJV"
      }

      // Initialize Firebase
      const app = initializeApp(firebaseConfig)
      const db = getFirestore(app)

      // Make Firebase available globally
      window.firebase = { firestore: { FieldValue: { serverTimestamp: () => {} } } }
      window.db = db
      window.collection = collection
      window.query = query
      window.orderBy = orderBy
      window.limit = limit
      window.getDocs = getDocs
    } catch (err) {
      console.error('Error initializing Firebase:', err)
      throw err
    }
  }

  const formatWalletAddress = (address: string) => {
    if (!address || address === 'Anonymous') return 'Anonymous'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#ffd700' // Gold
      case 2: return '#c0c0c0' // Silver
      case 3: return '#cd7f32' // Bronze
      default: return '#ff00c1'
    }
  }

  if (loading) {
    return (
      <div className="menu-overlay">
        <div className="menu-container">
          <div className="menu-header">
            <h2 className="menu-title">
              <i className="fas fa-trophy"></i> LEADERBOARD
            </h2>
            <button className="close-menu-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="leaderboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="menu-overlay">
        <div className="menu-container">
          <div className="menu-header">
            <h2 className="menu-title">
              <i className="fas fa-trophy"></i> LEADERBOARD
            </h2>
            <button className="close-menu-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="leaderboard-error">
            <p>{error}</p>
            <button className="menu-btn" onClick={loadLeaderboard}>Retry</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-overlay">
      <div className="menu-container">
        <div className="menu-header">
          <h2 className="menu-title">
            <i className="fas fa-trophy"></i> LEADERBOARD
          </h2>
          <button className="close-menu-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="leaderboard-content">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => {
                const rank = index + 1
                const playerName = entry.playerName || 'Anonymous'
                const score = entry.score || 0
                const walletAddress = entry.walletAddress || 'Anonymous'
                
                return (
                  <tr key={entry.id}>
                    <td style={{ color: getRankColor(rank) }}>{rank}</td>
                    <td>
                      <div className="player-info">
                        <span className="player-name">{playerName}</span>
                        <span className="wallet-address">
                          {formatWalletAddress(walletAddress)}
                        </span>
                      </div>
                    </td>
                    <td>{score.toLocaleString()}</td>
                  </tr>
                )
              })}
              {/* Fill empty rows to always show 10 */}
              {Array.from({ length: Math.max(0, 10 - leaderboardData.length) }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>{leaderboardData.length + index + 1}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="menu-actions">
          <button className="menu-btn" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  )
} 