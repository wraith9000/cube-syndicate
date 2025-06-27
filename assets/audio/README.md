# Audio Files Directory

This directory contains the audio files for the Cube Syndicate game:

## Current Audio Files

- `music.mp3` - Background music for the game (5.9MB)
- `itemcollect.mp3` - Sound effect for collecting power-ups (35KB)
- `laserbraam.mp3` - Sound effect for laser power-up activation (402KB)

## Audio System Features

- **Background Music**: Looping cyberpunk-themed music
- **Sound Effects**: Power-up collection and laser activation sounds
- **Volume Controls**: Separate controls for music and SFX
- **Error Handling**: Graceful fallback if audio files fail to load

## Adding New Audio Files

1. Place your audio files in this directory
2. Supported formats: MP3, WAV, OGG
3. Keep file sizes reasonable for web loading (under 1MB each recommended)
4. Update the audio configuration in `assets/js/game.js` if adding new sounds

## Audio Configuration

The audio system is configured in `assets/js/game.js` with:
- Default music volume: 40%
- Default SFX volume: 80%
- Automatic volume adjustment for different sound types
- Local storage for user preferences

## Troubleshooting

If audio doesn't work:
1. Check browser autoplay policies
2. Ensure audio files are accessible
3. Check browser console for loading errors
4. Verify file paths in the game configuration 