// Firebase Configuration and Leaderboard System
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0jYBTBZvGZO5ewu4YhsB8z40mVh7GgPs",
    authDomain: "cube-syndicate-leaderboard.firebaseapp.com",
    projectId: "cube-syndicate-leaderboard",
    storageBucket: "cube-syndicate-leaderboard.firebasestorage.app",
    messagingSenderId: "671324641744",
    appId: "1:671324641744:web:433beef3f3d536dd07c1d5",
    measurementId: "G-YVG98S5JJV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Leaderboard System
class LeaderboardSystem {
    constructor() {
        this.isInitialized = false;
        this.currentLeaderboard = [];
        this.unsubscribe = null;
    }

    // Initialize the leaderboard system
    async init() {
        if (this.isInitialized) return;
        
        try {
            // Load initial leaderboard
            await this.loadLeaderboard();
            this.isInitialized = true;
            console.log('Leaderboard system initialized');
        } catch (error) {
            console.error('Error initializing leaderboard:', error);
        }
    }

    // Submit a new score
    async submitScore(score, walletAddress = null, playerName = null) {
        try {
            const scoreData = {
                score: score,
                walletAddress: walletAddress || 'Anonymous',
                playerName: playerName || this.generatePlayerName(walletAddress),
                timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
                gameVersion: '1.0.0'
            };

            await addDoc(collection(window.db, 'scores'), scoreData);
            console.log('Score submitted successfully:', scoreData);
            
            // Show success notification
            if (typeof showNotification === 'function') {
                showNotification(`Score of ${score} submitted to leaderboard!`, 'success');
            }
            
            return true;
        } catch (error) {
            console.error('Error submitting score:', error);
            if (typeof showNotification === 'function') {
                showNotification('Failed to submit score. Please try again.', 'error');
            }
            return false;
        }
    }

    // Load leaderboard data
    async loadLeaderboard() {
        try {
            const scoresRef = collection(window.db, 'scores');
            const q = query(scoresRef, orderBy('score', 'desc'), limit(10));
            const snapshot = await getDocs(q);

            this.currentLeaderboard = [];
            snapshot.forEach((doc) => {
                this.currentLeaderboard.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return this.currentLeaderboard;
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return [];
        }
    }

    // Set up real-time leaderboard updates
    setupRealtimeUpdates() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        const scoresRef = collection(window.db, 'scores');
        const q = query(scoresRef, orderBy('score', 'desc'), limit(10));
        
        this.unsubscribe = onSnapshot(q, (snapshot) => {
            this.currentLeaderboard = [];
            snapshot.forEach((doc) => {
                this.currentLeaderboard.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Update UI if leaderboard modal is open
            this.updateLeaderboardUI();
        }, (error) => {
            console.error('Error in real-time updates:', error);
        });
    }

    // Update the leaderboard UI
    updateLeaderboardUI() {
        const leaderboardBody = document.getElementById('leaderboard-body');
        if (!leaderboardBody) return;

        leaderboardBody.innerHTML = this.currentLeaderboard.map((entry, index) => {
            const rank = index + 1;
            const playerName = entry.playerName || 'Anonymous';
            const score = entry.score || 0;
            const walletAddress = entry.walletAddress || 'Anonymous';
            
            return `
                <tr>
                    <td>${rank}</td>
                    <td>
                        <div class="player-info">
                            <span class="player-name">${playerName}</span>
                            <span class="wallet-address">${this.formatWalletAddress(walletAddress)}</span>
                        </div>
                    </td>
                    <td>${score.toLocaleString()}</td>
                </tr>
            `;
        }).join('');

        // Add empty rows if less than 10 entries
        const emptyRows = 10 - this.currentLeaderboard.length;
        for (let i = 0; i < emptyRows; i++) {
            leaderboardBody.innerHTML += `
                <tr>
                    <td>${this.currentLeaderboard.length + i + 1}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `;
        }
    }

    // Generate a player name from wallet address
    generatePlayerName(walletAddress) {
        if (!walletAddress || walletAddress === 'Anonymous') {
            return 'Anonymous';
        }
        
        // Use first 6 characters of wallet address
        const shortAddress = walletAddress.slice(0, 6);
        const playerNames = [
            'CubeMaster', 'NeonRunner', 'PixelHero', 'CyberAce', 'Glitchy',
            'RunnerX', 'SynthWave', 'BitCrusher', 'Quantum', 'VaporCube',
            'CyberNinja', 'NeonGhost', 'PixelPunk', 'DigitalDragon', 'SynthSlayer'
        ];
        
        // Generate consistent name based on wallet address
        const hash = this.simpleHash(walletAddress);
        const nameIndex = hash % playerNames.length;
        return playerNames[nameIndex];
    }

    // Simple hash function for consistent name generation
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Format wallet address for display
    formatWalletAddress(address) {
        if (!address || address === 'Anonymous') {
            return 'Anonymous';
        }
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Get user's best score
    async getUserBestScore(walletAddress) {
        if (!walletAddress) return 0;
        
        try {
            const scoresRef = collection(window.db, 'scores');
            const q = query(scoresRef, where('walletAddress', '==', walletAddress), orderBy('score', 'desc'), limit(1));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                return snapshot.docs[0].data().score;
            }
            return 0;
        } catch (error) {
            console.error('Error getting user best score:', error);
            return 0;
        }
    }

    // Check if score is a new personal best
    async isNewPersonalBest(score, walletAddress) {
        if (!walletAddress) return false;
        
        const bestScore = await this.getUserBestScore(walletAddress);
        return score > bestScore;
    }

    // Cleanup
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }
}

// Global leaderboard instance
const leaderboardSystem = new LeaderboardSystem();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    leaderboardSystem.init();
    leaderboardSystem.setupRealtimeUpdates();
});

// Export for use in other files
window.leaderboardSystem = leaderboardSystem; 