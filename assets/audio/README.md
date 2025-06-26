 # Audio Files Directory

This directory should contain the following audio files for the game:

- `jump.wav` - Sound effect for player jumping
- `land.wav` - Sound effect for player landing
- `explosion.wav` - Sound effect for explosions/collisions
- `music.mp3` - Background music for the game

## Adding Audio Files

1. Place your audio files in this directory with the exact names listed above
2. Supported formats: WAV for sound effects, MP3 for music
3. Keep file sizes reasonable for web loading (under 1MB each recommended)

## Current Status

The game will work without these audio files - it will simply play silently.
The audio system includes error handling to gracefully handle missing files.

## Alternative

If you don't have audio files, you can:
1. Use free sound effects from sites like freesound.org
2. Create simple audio files using online tools
3. Leave the directory empty - the game will work fine without audio 