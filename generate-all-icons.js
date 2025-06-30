const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#0d0221';
    ctx.fillRect(0, 0, size, size);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#00f6ff');
    gradient.addColorStop(1, '#ff00c1');
    
    // Draw cube
    const center = size / 2;
    const cubeSize = size * 0.25;
    
    // Front face
    ctx.fillStyle = gradient;
    ctx.fillRect(center - cubeSize/2, center - cubeSize/2, cubeSize, cubeSize);
    ctx.strokeStyle = '#00f6ff';
    ctx.lineWidth = Math.max(2, size * 0.008);
    ctx.strokeRect(center - cubeSize/2, center - cubeSize/2, cubeSize, cubeSize);
    
    // Top face
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(center - cubeSize/2, center - cubeSize/2);
    ctx.lineTo(center + cubeSize/2, center - cubeSize/2);
    ctx.lineTo(center + cubeSize/3, center - cubeSize/3);
    ctx.lineTo(center - cubeSize/3, center - cubeSize/3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Right face
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(center + cubeSize/2, center - cubeSize/2);
    ctx.lineTo(center + cubeSize/2, center + cubeSize/2);
    ctx.lineTo(center + cubeSize/3, center + cubeSize/3);
    ctx.lineTo(center + cubeSize/3, center - cubeSize/3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Add glow effect
    ctx.shadowColor = '#00f6ff';
    ctx.shadowBlur = size * 0.05;
    ctx.strokeRect(center - cubeSize/2, center - cubeSize/2, cubeSize, cubeSize);
    ctx.shadowBlur = 0;
    
    // Add text (only for larger icons)
    if (size >= 144) {
        ctx.fillStyle = '#00f6ff';
        ctx.font = `bold ${size * 0.06}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('CUBE', center, center + cubeSize/2 + size * 0.12);
    }
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`assets/icons/icon-${size}.png`, buffer);
    console.log(`Generated icon-${size}.png`);
}

// Generate all icon sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Generating PWA icons...');
sizes.forEach(size => {
    generateIcon(size);
});

console.log('All icons generated successfully!');
console.log('Generated sizes:', sizes.join(', ')); 