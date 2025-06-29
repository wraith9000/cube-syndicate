// Game link - Update this to your actual game URL
const GAME_URL = 'game.html';

// Wallet Connection State
let walletConnected = false;
let currentAccount = null;
let currentProvider = null;

// Make wallet state globally accessible for game integration
window.walletConnected = walletConnected;
window.currentAccount = currentAccount;
window.currentProvider = currentProvider;

// Wallet Connection Functions
async function connectWallet() {
    const walletBtn = document.getElementById('wallet-connect-btn');
    const walletText = document.getElementById('wallet-text');
    
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                currentProvider = 'MetaMask';
                walletConnected = true;
                
                // Update UI
                walletBtn.classList.add('connected');
                walletText.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
                
                // Show success message
                showNotification('Wallet connected successfully!', 'success');
                
                // Listen for account changes
                window.ethereum.on('accountsChanged', handleAccountChange);
                
                // Listen for chain changes
                window.ethereum.on('chainChanged', handleChainChange);
                
                return true;
            }
        } else {
            // Check for other wallet providers
            const otherWallets = await detectOtherWallets();
            if (otherWallets.length > 0) {
                showWalletSelectionModal(otherWallets);
                return false;
            } else {
                // No wallets found, show instructions
                showNotification('No wallet found. Please install MetaMask or another Web3 wallet.', 'error');
                openMetaMaskInstallation();
                return false;
            }
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        
        if (error.code === 4001) {
            showNotification('Wallet connection rejected by user.', 'error');
        } else {
            showNotification('Failed to connect wallet. Please try again.', 'error');
        }
        return false;
    }
}

async function detectOtherWallets() {
    const wallets = [];
    
    // Check for Coinbase Wallet
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet) {
        wallets.push({ name: 'Coinbase Wallet', provider: 'coinbase' });
    }
    
    // Check for Trust Wallet
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isTrust) {
        wallets.push({ name: 'Trust Wallet', provider: 'trust' });
    }
    
    // Check for Binance Wallet
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isBinanceWallet) {
        wallets.push({ name: 'Binance Wallet', provider: 'binance' });
    }
    
    // Check for WalletConnect
    if (typeof window.WalletConnect !== 'undefined') {
        wallets.push({ name: 'WalletConnect', provider: 'walletconnect' });
    }
    
    return wallets;
}

function showWalletSelectionModal(wallets) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'wallet-modal';
    modal.innerHTML = `
        <div class="wallet-modal-content">
            <div class="wallet-modal-header">
                <h3>Choose Your Wallet</h3>
                <button class="wallet-modal-close" onclick="this.closest('.wallet-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="wallet-modal-body">
                <div class="wallet-options">
                    ${wallets.map(wallet => `
                        <button class="wallet-option" onclick="connectSpecificWallet('${wallet.provider}')">
                            <i class="fas fa-wallet"></i>
                            <span>${wallet.name}</span>
                        </button>
                    `).join('')}
                    <button class="wallet-option wallet-option-install" onclick="openMetaMaskInstallation()">
                        <i class="fas fa-download"></i>
                        <span>Install MetaMask</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

async function connectSpecificWallet(provider) {
    // Remove modal
    const modal = document.querySelector('.wallet-modal');
    if (modal) modal.remove();
    
    try {
        switch (provider) {
            case 'coinbase':
            case 'trust':
            case 'binance':
                // These use the same ethereum provider
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                if (accounts.length > 0) {
                    handleSuccessfulConnection(accounts[0], provider);
                }
                break;
            case 'walletconnect':
                // WalletConnect implementation would go here
                showNotification('WalletConnect support coming soon!', 'info');
                break;
            default:
                showNotification('Unsupported wallet provider.', 'error');
        }
    } catch (error) {
        console.error('Error connecting specific wallet:', error);
        showNotification('Failed to connect wallet.', 'error');
    }
}

function handleSuccessfulConnection(account, provider) {
    currentAccount = account;
    currentProvider = provider;
    walletConnected = true;
    
    // Update global variables for game integration
    window.currentAccount = currentAccount;
    window.currentProvider = currentProvider;
    window.walletConnected = walletConnected;
    
    const walletBtn = document.getElementById('wallet-connect-btn');
    const walletText = document.getElementById('wallet-text');
    
    // Update UI
    walletBtn.classList.add('connected');
    walletText.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
    
    // Show success message
    showNotification(`${provider} wallet connected successfully!`, 'success');
    
    // Set up event listeners
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountChange);
        window.ethereum.on('chainChanged', handleChainChange);
    }
}

function disconnectWallet() {
    const walletBtn = document.getElementById('wallet-connect-btn');
    const walletText = document.getElementById('wallet-text');
    
    walletConnected = false;
    currentAccount = null;
    currentProvider = null;
    
    // Clear global variables for game integration
    window.walletConnected = false;
    window.currentAccount = null;
    window.currentProvider = null;
    
    // Update UI
    walletBtn.classList.remove('connected');
    walletText.textContent = 'Connect Wallet';
    
    // Remove event listeners
    if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleChainChange);
    }
    
    showNotification('Wallet disconnected.', 'info');
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
    } else {
        // User switched accounts
        currentAccount = accounts[0];
        window.currentAccount = currentAccount; // Update global variable
        
        const walletText = document.getElementById('wallet-text');
        walletText.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
        showNotification('Account changed.', 'info');
    }
}

function handleChainChange(chainId) {
    // Reload the page when chain changes
    window.location.reload();
}

function openMetaMaskInstallation() {
    const installUrl = 'https://metamask.io/download/';
    const confirmed = confirm('MetaMask is required to connect your wallet. Would you like to install it now?');
    if (confirmed) {
        window.open(installUrl, '_blank');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Check if wallet is already connected on page load
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_accounts' 
            });
            
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                currentProvider = 'MetaMask';
                walletConnected = true;
                
                // Update global variables for game integration
                window.currentAccount = currentAccount;
                window.currentProvider = currentProvider;
                window.walletConnected = walletConnected;
                
                const walletBtn = document.getElementById('wallet-connect-btn');
                const walletText = document.getElementById('wallet-text');
                
                walletBtn.classList.add('connected');
                walletText.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
                
                // Set up event listeners
                window.ethereum.on('accountsChanged', handleAccountChange);
                window.ethereum.on('chainChanged', handleChainChange);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Game start function - directly opens the game
function startGame() {
    // Add a small delay for better UX
    setTimeout(() => {
        window.location.href = GAME_URL;
    }, 100);
}

// Device detection and optimization
const deviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent),
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isLandscape: window.innerWidth > window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
};

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check wallet connection on page load
    checkWalletConnection();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 2, 33, 0.98)';
            navbar.style.boxShadow = '0 0 30px rgba(0, 246, 255, 0.4)';
        } else {
            navbar.style.background = 'rgba(13, 2, 33, 0.95)';
            navbar.style.boxShadow = '0 0 20px rgba(0, 246, 255, 0.3)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .play-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Demo cube animation
    const demoCubes = document.querySelectorAll('.demo-cube');
    let currentCube = 0;

    function animateDemoCubes() {
        demoCubes.forEach((cube, index) => {
            cube.classList.remove('active');
        });
        
        demoCubes[currentCube].classList.add('active');
        currentCube = (currentCube + 1) % demoCubes.length;
    }

    // Start demo animation
    setInterval(animateDemoCubes, 1000);

    // Play button functionality
    const playButtons = document.querySelectorAll('.btn-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // The click is handled by the onclick functions above
            // This is just for additional styling if needed
        });
    });

    // Wallet button click handler
    const walletBtn = document.getElementById('wallet-connect-btn');
    if (walletBtn) {
        walletBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (walletConnected) {
                disconnectWallet();
            } else {
                connectWallet();
            }
        });
    }

    // Parallax effect for hero section (disabled on mobile for performance)
    if (!deviceInfo.isMobile) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const cube = document.querySelector('.cube');
            
            if (hero && cube) {
                const rate = scrolled * -0.5;
                cube.style.transform = `rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg) translateZ(${rate}px)`;
            }
        });
    }

    // Counter animation for features
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation when features section is visible
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        const featuresObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    featuresObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        featuresObserver.observe(featuresSection);
    }

    // Smooth reveal animation for sections
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Add reveal class to sections except the hero section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('reveal');
        }
    });

    // Initialize tooltips for play buttons (desktop only)
    if (!deviceInfo.isTouch) {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                this.addEventListener('mouseleave', function() {
                    tooltip.remove();
                });
            });
        });
    }

    // Add CSS for tooltips
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
        .tooltip {
            position: absolute;
            background: #0d0221;
            color: #00f6ff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
            border: 1px solid #00f6ff;
            box-shadow: 0 0 20px rgba(0, 246, 255, 0.4);
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(tooltipStyle);

    // Add cyberpunk particle effects (reduced on mobile for performance)
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particlesContainer);

        // Reduce particle count on mobile devices
        const particleCount = deviceInfo.isMobile ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00f6ff;
                border-radius: 50%;
                box-shadow: 0 0 10px #00f6ff;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add floating animation
    const floatAnimation = document.createElement('style');
    floatAnimation.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatAnimation);

    // Start particle effects
    createParticles();

    // Touch-friendly interactions
    if (deviceInfo.isTouch) {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn, .feature-card, .play-card, .browser, .powerup');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // Orientation change handling
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layout after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });

    // Resize handling
    window.addEventListener('resize', function() {
        // Update device info on resize
        deviceInfo.isLandscape = window.innerWidth > window.innerHeight;
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 767) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Performance optimizations for mobile
    if (deviceInfo.isMobile) {
        // Reduce animation complexity on mobile
        const reducedAnimations = document.createElement('style');
        reducedAnimations.textContent = `
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(reducedAnimations);
    }

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Create 3D cube loading screen with progress bar
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-container">
            <div class="loading-cube">
                <div class="cube-face front"></div>
                <div class="cube-face back"></div>
                <div class="cube-face right"></div>
                <div class="cube-face left"></div>
                <div class="cube-face top"></div>
                <div class="cube-face bottom"></div>
            </div>
            <div class="loading-text">SLIDING CUBE</div>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Add CSS for the new loading screen
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0d0221 0%, #1a0033 50%, #0d0221 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease-out;
        }

        #loading-screen.fade-out {
            opacity: 0;
        }

        .loading-container {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        .loading-cube {
            width: 80px;
            height: 80px;
            position: relative;
            transform-style: preserve-3d;
            animation: cubeRotate 2s infinite linear;
        }

        .cube-face {
            position: absolute;
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #00f6ff, #ff00c1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 20px rgba(0, 246, 255, 0.5);
        }

        .cube-face.front { transform: rotateY(0deg) translateZ(40px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(40px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(40px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(40px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(40px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(40px); }

        @keyframes cubeRotate {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        .loading-text {
            color: #00f6ff;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 20px rgba(0, 246, 255, 0.8);
            letter-spacing: 3px;
            animation: textGlow 2s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
            0% { text-shadow: 0 0 20px rgba(0, 246, 255, 0.8); }
            100% { text-shadow: 0 0 30px rgba(0, 246, 255, 1), 0 0 40px rgba(0, 246, 255, 0.6); }
        }

        .loading-progress {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 300px;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid rgba(0, 246, 255, 0.3);
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00f6ff, #ff00c1);
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 246, 255, 0.6);
        }

        .progress-text {
            color: #ffffff;
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        body:not(.loaded) {
            overflow: hidden;
        }

        body.loaded #loading-screen {
            opacity: 0;
            pointer-events: none;
        }

        @media (max-width: 768px) {
            .loading-cube {
                width: 60px;
                height: 60px;
            }
            
            .cube-face {
                width: 60px;
                height: 60px;
            }
            
            .cube-face.front { transform: rotateY(0deg) translateZ(30px); }
            .cube-face.back { transform: rotateY(180deg) translateZ(30px); }
            .cube-face.right { transform: rotateY(90deg) translateZ(30px); }
            .cube-face.left { transform: rotateY(-90deg) translateZ(30px); }
            .cube-face.top { transform: rotateX(90deg) translateZ(30px); }
            .cube-face.bottom { transform: rotateX(-90deg) translateZ(30px); }
            
            .loading-text {
                font-size: 1.5rem;
                letter-spacing: 2px;
            }
            
            .loading-progress {
                width: 250px;
            }
        }
    `;
    document.head.appendChild(loadingStyle);

    // Simulate loading progress (slower version)
    setTimeout(() => {
        let progress = 0;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const loadingInterval = setInterval(() => {
                // Slower progress increments
                progress += Math.random() * 8 + 2; // Between 2-10% per step
                if (progress > 100) progress = 100;
                
                progressFill.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
                
                if (progress >= 100) {
                    clearInterval(loadingInterval);
                    // Longer delay before hiding
                    setTimeout(() => {
                        document.body.classList.add('loaded');
                        setTimeout(() => {
                            const loadingScreen = document.getElementById('loading-screen');
                            if (loadingScreen) {
                                loadingScreen.remove();
                            }
                        }, 800); // Longer fade-out
                    }, 1000); // Longer delay before starting fade
                }
            }, 200); // Slower update interval (200ms instead of 100ms)
        }
    }, 10);

    // Real loading progress based on actual page resources
    setTimeout(() => {
        let progress = 0;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            // Track loading of different resources
            let loadedResources = 0;
            let totalResources = 0;
            
            // Count images
            const images = document.querySelectorAll('img');
            totalResources += images.length;
            
            // Count CSS files
            const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
            totalResources += cssFiles.length;
            
            // Count JavaScript files
            const scripts = document.querySelectorAll('script[src]');
            totalResources += scripts.length;
            
            // Add minimum resources to ensure progress
            totalResources = Math.max(totalResources, 5);
            
            // Track image loading
            images.forEach(img => {
                if (img.complete) {
                    loadedResources++;
                } else {
                    img.addEventListener('load', () => {
                        loadedResources++;
                        updateProgress();
                    });
                    img.addEventListener('error', () => {
                        loadedResources++; // Count errors as loaded
                        updateProgress();
                    });
                }
            });
            
            // Track CSS loading
            cssFiles.forEach(link => {
                if (link.sheet) {
                    loadedResources++;
                } else {
                    link.addEventListener('load', () => {
                        loadedResources++;
                        updateProgress();
                    });
                    link.addEventListener('error', () => {
                        loadedResources++; // Count errors as loaded
                        updateProgress();
                    });
                }
            });
            
            // Track script loading
            scripts.forEach(script => {
                if (script.complete || script.readyState === 'complete') {
                    loadedResources++;
                } else {
                    script.addEventListener('load', () => {
                        loadedResources++;
                        updateProgress();
                    });
                    script.addEventListener('error', () => {
                        loadedResources++; // Count errors as loaded
                        updateProgress();
                    });
                }
            });
            
            // Initial progress update
            updateProgress();
            
            // Fallback: if no resources to track, use DOMContentLoaded
            if (totalResources === 0) {
                document.addEventListener('DOMContentLoaded', () => {
                    progress = 100;
                    updateProgress();
                });
            }
            
            // Also listen for window load event
            window.addEventListener('load', () => {
                progress = 100;
                updateProgress();
            });
            
            function updateProgress() {
                // Calculate progress based on loaded resources
                const resourceProgress = (loadedResources / totalResources) * 80; // Max 80% from resources
                
                // Add some smooth progression
                if (progress < resourceProgress) {
                    progress = Math.min(progress + 5, resourceProgress);
                }
                
                // Ensure minimum progress
                progress = Math.max(progress, 10);
                
                progressFill.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
                
                // If everything is loaded, complete the progress
                if (loadedResources >= totalResources && progress >= 80) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    progressText.textContent = '100%';
                    
                    // Wait a moment then fade out
                    setTimeout(() => {
                        document.body.classList.add('loaded');
                        setTimeout(() => {
                            const loadingScreen = document.getElementById('loading-screen');
                            if (loadingScreen) {
                                loadingScreen.remove();
                            }
                        }, 800);
                    }, 500);
                }
            }
            
            // Fallback timer to ensure loading completes
            setTimeout(() => {
                if (progress < 100) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    progressText.textContent = '100%';
                    
                    setTimeout(() => {
                        document.body.classList.add('loaded');
                        setTimeout(() => {
                            const loadingScreen = document.getElementById('loading-screen');
                            if (loadingScreen) {
                                loadingScreen.remove();
                            }
                        }, 800);
                    }, 500);
                }
            }, 8000); // Maximum 8 seconds fallback
        }
    }, 10);

    // Leaderboard Modal Logic
    const leaderboardLinks = document.querySelectorAll('a[href="#leaderboard"]');
    const leaderboardModal = document.getElementById('leaderboard-modal');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard');
    const leaderboardBody = document.getElementById('leaderboard-body');

    function openLeaderboardModal() {
        if (window.leaderboardSystem && window.leaderboardSystem.isInitialized) {
            window.leaderboardSystem.updateLeaderboardUI();
        }
        leaderboardModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLeaderboardModal() {
        leaderboardModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    leaderboardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openLeaderboardModal();
        });
    });

    closeLeaderboardBtn.addEventListener('click', closeLeaderboardModal);
    window.addEventListener('click', function(event) {
        if (event.target === leaderboardModal) {
            closeLeaderboardModal();
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations here
}, 16)); // ~60fps

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add to home screen functionality
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if needed
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.className = 'btn btn-primary';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '20px';
    installButton.style.right = '20px';
    installButton.style.zIndex = '1000';
    
    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            installButton.remove();
        });
    });
    
    document.body.appendChild(installButton);
}); 