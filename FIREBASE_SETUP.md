# Firebase Leaderboard Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "cube-syndicate-leaderboard")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "cube-syndicate-web")
6. Copy the firebaseConfig object

## Step 4: Update Configuration

Replace the placeholder config in `assets/js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Step 5: Set Up Security Rules (Optional)

In Firestore Database > Rules, you can set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scores/{document} {
      allow read: if true;  // Anyone can read scores
      allow write: if true; // Anyone can write scores (for demo)
    }
  }
}
```

## Step 6: Test the Leaderboard

1. Open your game in a browser
2. Play the game and achieve a score
3. Check if the score appears in the Firebase console
4. Open the leaderboard modal to see real-time updates

## Features Implemented

✅ **Real-time Leaderboard**: Updates instantly when new scores are submitted
✅ **Wallet Integration**: Uses connected wallet addresses as user identifiers
✅ **Anonymous Play**: Players without wallets can still submit scores
✅ **Player Names**: Generates consistent player names from wallet addresses
✅ **Score Tracking**: Stores score, timestamp, and game version
✅ **Fallback System**: Shows static data if Firebase is unavailable

## Cost Information

- **Free Tier**: 1GB storage, 10GB/month bandwidth, 50,000 reads/day
- **Perfect for**: Small to medium games with up to 1000 daily players
- **No fees**: Completely free for reasonable usage

## Troubleshooting

### Firebase not loading
- Check if Firebase SDK scripts are loaded correctly
- Verify your configuration in the browser console
- Ensure your project is in the correct region

### Scores not submitting
- Check browser console for errors
- Verify Firestore is enabled in your Firebase project
- Check if security rules allow writes

### Leaderboard not updating
- Ensure real-time updates are enabled
- Check if the leaderboard modal is properly connected
- Verify the Firebase configuration is correct

## Next Steps

1. **Customize Player Names**: Modify the `generatePlayerName` function
2. **Add Score Validation**: Implement server-side score verification
3. **Add User Profiles**: Store additional player information
4. **Implement Score Limits**: Add rate limiting for score submissions
5. **Add Score Categories**: Separate leaderboards for different game modes

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure all scripts are loading correctly
4. Test with a simple score submission first 