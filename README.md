# Sliding Cube - Next.js Version

A cyberpunk-themed endless runner game built with Next.js, React, and TypeScript.

## 🎮 Game Features

- **Endless Runner Gameplay**: Navigate your neon cube through procedurally generated obstacles
- **Power-ups**: Collect Slow Motion, Shield, and Laser power-ups to enhance your gameplay
- **Cyberpunk Aesthetic**: Immersive neon visuals with stunning effects and animations
- **Mobile Optimized**: Touch controls for mobile, keyboard controls for desktop
- **Web3 Integration**: Connect your wallet and track scores
- **Responsive Design**: Works perfectly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
cube-syndicate/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (landing)
│   ├── game/              # Game page
│   │   ├── page.tsx       # Game component
│   │   └── game.css       # Game-specific styles
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Navbar with wallet integration
│   ├── Hero.tsx          # Landing page hero section
│   ├── Features.tsx       # Game features showcase
│   ├── Gameplay.tsx       # How to play instructions
│   ├── GameCanvas.tsx     # Game canvas and logic
│   └── GameMenus.tsx      # Game menus and overlays
├── public/               # Static assets
│   ├── assets/           # Audio, icons, etc.
│   ├── favicon.ico       # Site favicon
│   └── manifest.json     # PWA manifest
└── package.json          # Dependencies and scripts
```

## 🎯 Key Transformations from Original

### 1. **Next.js App Router Structure**
- Converted from static HTML to Next.js App Router
- Proper routing with `/` (home) and `/game` (game page)
- Server-side rendering capabilities

### 2. **React Components**
- **Navigation**: Handles wallet connection and mobile menu
- **Hero**: Landing page with animated cube and call-to-action
- **Features**: Showcases game features in a responsive grid
- **Gameplay**: Interactive how-to-play section
- **GameCanvas**: Full game implementation with canvas API
- **GameMenus**: All game menus (main, settings, leaderboard, etc.)

### 3. **TypeScript Integration**
- Full TypeScript support for better development experience
- Type-safe props and state management
- Proper type definitions for all components

### 4. **Enhanced Styling**
- Converted CSS to work with Next.js
- Maintained all original cyberpunk styling
- Responsive design preserved
- CSS modules support ready

### 5. **Game Logic**
- Canvas-based game engine
- Collision detection
- Power-up system
- Score tracking
- Local storage for high scores

### 6. **Web3 Integration**
- MetaMask wallet connection
- Account management
- Transaction support ready

## 🎮 How to Play

1. **Start the Game**: Click "START GAME" on the home page
2. **Jump**: Press SPACE or tap the screen to jump over obstacles
3. **Collect Power-ups**:
   - **Slow Motion** (blue): Slows down time
   - **Shield** (gold): Protects against one hit
   - **Laser** (red): Destroys all obstacles
4. **Survive**: Avoid obstacles and survive as long as possible
5. **Score**: Your score increases the longer you survive

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any API keys or configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Game Settings
Game settings are stored in localStorage:
- Music volume
- SFX volume  
- Visual effects toggle
- High scores

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Structure

- **Components**: Reusable React components
- **Pages**: Next.js pages with routing
- **Styles**: CSS files for styling
- **Public**: Static assets and files

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Edit `app/game/game.css` for game-specific styles
- Update component-specific styles in each component

### Game Logic
- Modify `components/GameCanvas.tsx` for game mechanics
- Update `components/GameMenus.tsx` for menu functionality

### Content
- Edit component files to change text content
- Update metadata in `app/layout.tsx`

## 🔮 Future Enhancements

- [ ] Firebase integration for online leaderboards
- [ ] Multiplayer support
- [ ] Additional power-ups and obstacles
- [ ] Sound effects and background music
- [ ] Progressive Web App (PWA) features
- [ ] NFT integration for achievements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Canvas not rendering**: Ensure the canvas element is properly mounted
2. **Audio not working**: Check browser autoplay policies
3. **Wallet connection issues**: Verify MetaMask is installed and unlocked
4. **Build errors**: Clear `.next` folder and reinstall dependencies

### Performance Tips

- Use React.memo for expensive components
- Optimize canvas rendering with requestAnimationFrame
- Implement proper cleanup in useEffect hooks
- Use Next.js Image component for optimized images

---

**Enjoy playing Sliding Cube! 🎮✨** 