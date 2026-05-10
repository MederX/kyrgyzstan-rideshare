# Quick Start Guide

## Prerequisites

- Go 1.22+
- Node.js 18+
- Firebase account
- Telegram account

## 1. Firebase Setup (5 minutes)

1. Go to https://console.firebase.google.com
2. Click "Add project" → Enter name → Continue
3. Disable Google Analytics (optional) → Create project
4. In left sidebar: Build → Firestore Database → Create database
5. Start in **test mode** → Select location → Enable
6. Go to Project Settings (gear icon) → Service Accounts tab
7. Click "Generate new private key" → Download JSON
8. Save as `backend/firebase-service-account.json`
9. Copy your Project ID (shown at top of page)

## 2. Telegram Bot Setup (3 minutes)

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Enter bot name (e.g., "Kyrgyzstan Rides")
4. Enter username (e.g., "kyrgyzstan_rides_bot")
5. **Copy the bot token** (looks like `1234567890:ABCdefGHI...`)
6. Send `/newapp` to BotFather
7. Select your bot
8. Enter app title and description
9. Upload app icon (optional)
10. For now, enter any URL (e.g., `https://example.com`) - we'll update this later

## 3. Backend Setup (2 minutes)

```bash
cd backend

# Create .env file
cp .env.example .env

# Edit .env and set:
# - TELEGRAM_BOT_TOKEN=<your-bot-token-from-step-2>
# - FIREBASE_PROJECT_ID=<your-project-id-from-step-1>
# - JWT_SECRET=<any-random-32-character-string>

# Install dependencies
go mod download

# Run backend
go run main.go
```

Backend should start on http://localhost:8080

## 4. Frontend Setup (2 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env:
# VITE_API_BASE_URL=http://localhost:8080

# Run frontend
npm run dev
```

Frontend should start on http://localhost:5173

## 5. Test Locally with Telegram (5 minutes)

Since Telegram Mini Apps only work with HTTPS URLs, you need to expose your local server:

### Option A: Using ngrok (recommended)

```bash
# Install ngrok from https://ngrok.com

# In terminal 1 - expose backend
ngrok http 8080

# In terminal 2 - expose frontend
ngrok http 5173

# Copy both HTTPS URLs (e.g., https://abc123.ngrok.io)
```

Update your `.env` files:
- `backend/.env`: Set `FRONTEND_URL=<frontend-ngrok-url>`
- `frontend/.env`: Set `VITE_API_BASE_URL=<backend-ngrok-url>`

Restart both servers.

### Update Telegram Bot

1. Go back to @BotFather in Telegram
2. Send `/myapps`
3. Select your app
4. Click "Edit" → "Web App URL"
5. Enter your **frontend ngrok URL**

### Test It!

1. Open your bot in Telegram
2. Click the menu button (bottom left)
3. Select your Mini App
4. The app should load and authenticate you automatically!

## 6. Verify Everything Works

- ✅ App loads in Telegram
- ✅ You see your Telegram name in the profile
- ✅ You can create a ride
- ✅ You can search for rides
- ✅ You can create cargo requests

## Troubleshooting

### "Invalid telegram data" error
- Check that `TELEGRAM_BOT_TOKEN` in backend/.env is correct
- Make sure backend is running and accessible

### Frontend can't connect to backend
- Check that `VITE_API_BASE_URL` points to your backend URL
- If using ngrok, make sure both tunnels are running
- Check browser console for CORS errors

### Firestore permission denied
- Make sure Firestore is in **test mode** (allows all reads/writes)
- Check that `firebase-service-account.json` is in the backend folder
- Verify `FIREBASE_PROJECT_ID` matches your Firebase project

### App doesn't load in Telegram
- Make sure you're using the HTTPS ngrok URL (not HTTP)
- Try closing and reopening the Mini App
- Check that the Web App URL in @BotFather is correct

## Next Steps

Once everything works locally:

1. **Deploy Backend** → See README.md for Heroku deployment
2. **Deploy Frontend** → See README.md for Render deployment
3. **Update Bot** → Set production URLs in @BotFather
4. **Add Firestore Security Rules** → Restrict access in production
5. **Test on Real Devices** → Share bot with friends

## Development Tips

- Use Chrome DevTools to debug the Mini App (right-click → Inspect)
- Check backend logs for API errors
- Firestore data is visible in Firebase Console
- Use test mode for rapid iteration, then add security rules for production

## Need Help?

Check the main README.md for:
- Full API documentation
- Deployment guides
- Architecture details
- Feature list
