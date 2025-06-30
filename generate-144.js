const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(144, 144);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0d0221';
ctx.fillRect(0, 0, 144, 144);

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, 144, 144);
gradient.addColorStop(0, '#00f6ff');
gradient.addColorStop(1, '#ff00c1');

// Draw cube
const center = 72;
const cubeSize = 36;

// Front face
ctx.fillStyle = gradient;
ctx.fillRect(center - cubeSize/2, center - cubeSize/2, cubeSize, cubeSize);
ctx.strokeStyle = '#00f6ff';
ctx.lineWidth = 2;
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

// Add text
ctx.fillStyle = '#00f6ff';
ctx.font = 'bold 9px Arial';
ctx.textAlign = 'center';
ctx.fillText('CUBE', center, center + cubeSize/2 + 17);

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/icons/icon-144.png', buffer);
console.log('Generated icon-144.png'); 