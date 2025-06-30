const fs = require('fs');
const path = require('path');

// Audio optimization script
console.log('Audio optimization script started...');

// Check if audio files exist and get their sizes
const audioDir = path.join(__dirname, 'assets', 'audio');
const audioFiles = ['music.mp3', 'laserbraam.mp3', 'itemcollect.mp3'];

console.log('\nCurrent audio file sizes:');
audioFiles.forEach(file => {
    const filePath = path.join(audioDir, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`${file}: ${sizeInMB} MB`);
    } else {
        console.log(`${file}: Not found`);
    }
});

console.log('\nRecommendations for audio optimization:');
console.log('1. music.mp3 (5.9MB) - Consider converting to:');
console.log('   - AAC format with 128kbps bitrate (~1.5MB)');
console.log('   - MP3 with 128kbps bitrate (~1.5MB)');
console.log('   - OGG format for better compression (~1.2MB)');

console.log('\n2. laserbraam.mp3 (402KB) - This is already reasonable size');
console.log('3. itemcollect.mp3 (35KB) - This is already optimized');

console.log('\nTo optimize manually:');
console.log('1. Use online tools like:');
console.log('   - https://www.onlinevideoconverter.com/');
console.log('   - https://convertio.co/mp3-converter/');
console.log('   - https://www.audacityteam.org/ (desktop app)');

console.log('\n2. Recommended settings:');
console.log('   - Format: MP3 or AAC');
console.log('   - Bitrate: 128kbps for music, 96kbps for SFX');
console.log('   - Sample rate: 44.1kHz');
console.log('   - Channels: Stereo for music, Mono for SFX');

console.log('\n3. After optimization, replace the files and update references if needed.'); 