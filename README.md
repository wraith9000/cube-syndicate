# Cube Slider - Landing Page

A modern, responsive landing page for your sliding cube puzzle web app. This landing page features beautiful animations, interactive elements, and a professional design that showcases your browser-based game effectively.

## Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Animated cube, smooth scrolling, and interactive play buttons
- **Web App Ready**: Optimized for browser-based games with play buttons and browser compatibility
- **Performance Optimized**: Smooth animations and efficient code

## File Structure

```
landingpage/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Open the landing page**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML file to match your game's specific features
3. **Update styling**: Modify `styles.css` to change colors, fonts, or layout
4. **Add functionality**: Enhance `script.js` with additional interactive features
5. **Connect to your game**: Update the play button URLs to point to your actual game

## Customization Guide

### Updating Game Information

Edit the following sections in `index.html`:

- **Hero Section**: Update the main title and description
- **Features**: Modify the 6 feature cards to match your game's features
- **Gameplay**: Update the 3 gameplay steps to reflect your game's mechanics
- **Play Links**: Replace the play button URLs with actual links to your game

### Changing Colors and Styling

The main color scheme is defined in `styles.css`:

- **Primary Gradient**: `#667eea` to `#764ba2` (hero background)
- **Accent Colors**: `#6366f1` (primary), `#ffd700` (gold), `#ff6b6b` (coral)
- **Text Colors**: `#1e293b` (dark), `#64748b` (medium), `#cbd5e1` (light)

### Connecting to Your Game

1. **Update JavaScript URLs**: In `script.js`, replace the placeholder URLs:
   ```javascript
   // Replace these with your actual game URLs
   window.open('https://your-game-url.com', '_blank');
   window.open('https://your-game-url.com/challenge', '_blank');
   window.open('https://your-game-url.com/multiplayer', '_blank');
   ```

2. **Add your game URL**: Replace `https://your-game-url.com` with your actual game's URL

## Sections Overview

### 1. Navigation
- Fixed navigation bar with smooth scrolling
- Mobile-responsive hamburger menu
- Logo and navigation links

### 2. Hero Section
- Eye-catching gradient background
- Animated 3D cube
- Call-to-action play buttons
- Typing effect on title

### 3. Features Section
- 6 feature cards with icons
- Hover animations
- Responsive grid layout

### 4. Gameplay Section
- Step-by-step gameplay instructions
- Interactive demo grid
- Visual explanations

### 5. Play Section
- Three play modes (Start Game, Challenge Mode, Multiplayer)
- Browser compatibility information
- Interactive play buttons

### 6. Footer
- Social media links
- Quick navigation
- Copyright information

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Minimize HTTP Requests**: Combine CSS and JS files for production
3. **Enable Compression**: Use gzip compression on your web server
4. **Cache Static Assets**: Set appropriate cache headers

## Deployment

### Local Development
Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Web Hosting
Upload all files to your web hosting provider:
- Shared hosting: Upload via FTP/cPanel
- VPS: Use nginx or Apache
- CDN: Use services like Netlify, Vercel, or GitHub Pages

## Customization Examples

### Adding a Video Background
```html
<!-- Add to hero section -->
<video autoplay muted loop class="hero-video">
    <source src="gameplay.mp4" type="video/mp4">
</video>
```

### Adding a Newsletter Signup
```html
<!-- Add before footer -->
<section class="newsletter">
    <div class="container">
        <h2>Stay Updated</h2>
        <form class="newsletter-form">
            <input type="email" placeholder="Enter your email">
            <button type="submit">Subscribe</button>
        </form>
    </div>
</section>
```

### Adding Social Proof
```html
<!-- Add after features section -->
<section class="testimonials">
    <div class="container">
        <h2>What Players Say</h2>
        <div class="testimonials-grid">
            <!-- Add testimonial cards here -->
        </div>
    </div>
</section>
```

### Adding Game Statistics
```html
<!-- Add after hero section -->
<section class="stats">
    <div class="container">
        <div class="stats-grid">
            <div class="stat">
                <h3 class="counter" data-target="10000">0</h3>
                <p>Active Players</p>
            </div>
            <div class="stat">
                <h3 class="counter" data-target="100">0</h3>
                <p>Levels Completed</p>
            </div>
            <div class="stat">
                <h3 class="counter" data-target="5000">0</h3>
                <p>Puzzles Solved</p>
            </div>
        </div>
    </div>
</section>
```

## Support

If you need help customizing the landing page:

1. Check the browser console for any JavaScript errors (F12 → Console)
2. Validate your HTML using the W3C validator
3. Test responsiveness using browser developer tools
4. Ensure all file paths are correct
5. Verify your game URLs are working properly

## License

This landing page template is free to use and modify for your projects.

---

**Ready to launch your web app?** Customize this landing page with your specific content and deploy it to showcase your sliding cube game to the world! 