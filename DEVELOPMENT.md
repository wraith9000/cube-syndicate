# Cube Syndicate - Development Guide

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Local web server (optional but recommended)

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cube-syndicate.git
   cd cube-syndicate
   ```

2. **Start local server** (recommended)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Or simply open `index.html` directly

## Project Structure

```
cube-syndicate/
├── 📄 Core Files
│   ├── index.html          # Landing page
│   ├── game.html           # Game interface
│   └── manifest.json       # PWA configuration
│
├── 📁 assets/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript modules
│   └── audio/              # Audio files
│
└── 📄 Documentation
    ├── README.md           # Main documentation
    ├── FIREBASE_SETUP.md   # Firebase guide
    ├── PROJECT_STRUCTURE.md # This file
    └── DEVELOPMENT.md      # Development guide
```

## Development Workflow

### 1. Code Organization
- **HTML**: Structure and content
- **CSS**: Styling and animations
- **JavaScript**: Functionality and game logic
- **Assets**: Images, audio, and other resources

### 2. File Naming Conventions
- Use kebab-case for file names: `my-file.js`
- Use camelCase for JavaScript variables: `myVariable`
- Use PascalCase for classes: `MyClass`
- Use UPPER_CASE for constants: `MY_CONSTANT`

### 3. Code Style
- Indent with 2 spaces
- Use semicolons in JavaScript
- Add comments for complex logic
- Keep functions focused and small

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Firestore Database
4. Get configuration details

### 2. Update Configuration
Replace the Firebase config in `game.html`:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    // ... other config
};
```

### 3. Test Integration
1. Play the game
2. Submit a score
3. Check Firebase console for data

## Game Development

### Core Components

#### 1. Game Engine (`game.js`)
- **Game Loop**: 60fps rendering
- **Physics**: Player movement, collision detection
- **Audio**: Sound effects and music
- **UI**: Menus and overlays

#### 2. Player System
```javascript
class Player {
    constructor() {
        this.x = 100;
        this.y = GROUND_Y;
        this.velocity = 0;
        this.isJumping = false;
    }
    
    jump() {
        if (!this.isJumping) {
            this.velocity = -15;
            this.isJumping = true;
        }
    }
}
```

#### 3. Obstacle System
```javascript
function spawnObstacle(template) {
    const obstacle = {
        x: canvas.width,
        y: GROUND_Y - template.height,
        width: 50,
        height: template.height,
        type: template.type
    };
    obstacles.push(obstacle);
}
```

### Adding New Features

#### 1. New Power-up
1. Add to `powerUps` array in `game.js`
2. Create spawn logic
3. Add collection handling
4. Implement effect
5. Add visual effects

#### 2. New Obstacle Type
1. Add to `LEVEL_CHUNKS` array
2. Create rendering logic
3. Add collision detection
4. Test difficulty balance

#### 3. New Visual Effect
1. Create effect class
2. Add to particles array
3. Implement update/draw methods
4. Trigger at appropriate times

## Testing

### Manual Testing
1. **Cross-browser testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

2. **Device testing**
   - Desktop (keyboard controls)
   - Mobile (touch controls)
   - Tablet (both orientations)

3. **Feature testing**
   - Game mechanics
   - Audio system
   - Wallet integration
   - Leaderboard functionality

### Performance Testing
1. **Frame rate**: Should maintain 60fps
2. **Memory usage**: Check for leaks
3. **Audio loading**: Test with slow connections
4. **Asset loading**: Optimize file sizes

## Debugging

### Common Issues

#### 1. Audio Not Playing
```javascript
// Check browser console for errors
// Ensure user interaction before playing
document.addEventListener('click', () => {
    audio.play('music');
});
```

#### 2. Canvas Not Rendering
```javascript
// Check canvas size
console.log(canvas.width, canvas.height);
// Ensure context is available
console.log(ctx);
```

#### 3. Firebase Connection Issues
```javascript
// Check configuration
console.log(firebaseConfig);
// Test connection
db.collection('test').add({test: true});
```

### Debug Tools
- **Browser DevTools**: Console, Network, Performance
- **Firebase Console**: Real-time database monitoring
- **Audio Context**: Web Audio API debugging

## Deployment

### Production Checklist
- [ ] Optimize images and audio files
- [ ] Minify CSS and JavaScript
- [ ] Test PWA functionality
- [ ] Verify Firebase configuration
- [ ] Check all links and assets
- [ ] Test on multiple devices

### Deployment Options
1. **Vercel**: Drag and drop deployment
2. **Netlify**: Connect GitHub repository
3. **GitHub Pages**: Enable in repository settings
4. **Traditional hosting**: Upload via FTP

## Contributing

### Code Review Process
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### Commit Messages
- Use conventional commits: `feat: add new power-up`
- Be descriptive and concise
- Reference issues when applicable

## Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Firebase Documentation](https://firebase.google.com/docs)

### Tools
- [Favicon Generator](https://favicon.io/)
- [Audio Converter](https://convertio.co/audio-converter/)
- [Image Optimizer](https://tinypng.com/)
- [Code Formatter](https://prettier.io/)

### Game Development
- [Game Development Patterns](https://gameprogrammingpatterns.com/)
- [Canvas Game Development](https://developer.mozilla.org/en-US/docs/Games/Tutorials)
- [Web Audio for Games](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API) 