# Cube Syndicate - Integrated Game & Landing Page

A complete web application featuring a modern, responsive landing page and an integrated sliding cube game. This project combines a beautiful landing page with a fully functional browser-based game in one cohesive experience.

## 🎮 Features

### Landing Page
- **Modern Design**: Cyberpunk-themed with neon effects and smooth animations
- **Wallet Integration**: Full Web3 wallet support (MetaMask, Coinbase Wallet, Trust Wallet, etc.)
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Animated cubes, particle effects, and smooth scrolling
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support

### Sliding Cube Game
- **Endless Runner**: Navigate your neon cube through an endless cyberpunk world
- **Power-ups**: Collect shields, slow-motion, and laser power-ups
- **Visual Effects**: Particle systems, screen shake, and neon glow effects
- **Sound System**: Background music and sound effects with volume controls
- **Score System**: Local high score tracking and recent scores
- **Mobile Optimized**: Touch controls and orientation detection

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cube-syndicate.git
   cd cube-syndicate
   ```

2. **Open the landing page**:
   - Simply open `index.html` in your web browser
   - Or serve it locally: `python -m http.server 8000`

3. **Start playing**:
   - Click "Start Game" on the landing page
   - The game will open in the same window
   - Use SPACE or tap to jump over obstacles
   - Collect power-ups to enhance your gameplay

## 📁 Project Structure

```
cube-syndicate/
├── index.html          # Main landing page
├── styles.css          # Landing page styles
├── script.js           # Landing page functionality
├── game.html           # Game page
├── game.css            # Game styles
├── game.js             # Game logic and mechanics
├── sfx/                # Sound effects and music
│   ├── music.mp3
│   ├── laserbraam.mp3
│   └── itemcollect.mp3
├── manifest.json       # PWA manifest
└── README.md           # This file
```

## 🎯 How It Works

1. **Landing Page** (`index.html`): 
   - Showcases the game with beautiful animations
   - Provides wallet connection functionality
   - Contains game information and features

2. **Game Integration**:
   - Clicking "Start Game" navigates to `game.html`
   - The game loads with all assets and sound effects
   - "Home" button in the game returns to the landing page

3. **Seamless Experience**:
   - No external dependencies or separate projects
   - Everything runs locally in the browser
   - Smooth transitions between landing page and game

## 🎮 Game Controls

- **Desktop**: SPACE to jump
- **Mobile**: Tap screen to jump
- **Power-ups**: 
  - Shield: Protects from one collision
  - Slow-mo: Slows down time for easier navigation
  - Laser: Destroys obstacles in your path

## 🔧 Customization

### Landing Page
- Update `script.js` to modify wallet connection behavior
- Edit `styles.css` to change the visual theme
- Modify `index.html` to update content and links

### Game
- Adjust game speed and difficulty in `game.js`
- Modify visual effects and colors
- Add new power-ups or obstacles
- Update sound effects in the `sfx/` directory

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Drag and drop the folder
- **Netlify**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Any web server**: Upload all files to your server

## 📱 PWA Features

The project includes Progressive Web App features:

- Installable on mobile devices
- Offline capability (with service worker)
- App-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Ready to Play?

The integrated Cube Syndicate project is now ready! The landing page provides a beautiful introduction to your game, and clicking "Start Game" seamlessly transitions to the full gaming experience. All in one project, no external dependencies needed.

**Enjoy playing!** 🎮✨ 