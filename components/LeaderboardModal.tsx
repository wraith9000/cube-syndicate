'use client'

import { useState, useEffect } from 'react'
import Leaderboard from './Leaderboard'

interface LeaderboardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Leaderboard onClose={onClose} />
      </div>
    </div>
  )
} 