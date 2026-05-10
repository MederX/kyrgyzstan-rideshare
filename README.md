# Kyrgyzstan Ride-Share & Cargo MVP

Full-stack ride-sharing platform for Kyrgyzstan built as a Telegram Mini App.

## Stack

- **Frontend**: React + TypeScript + TailwindCSS + Telegram Mini App SDK
- **Backend**: Go + Gin + Firebase Firestore
- **Deployment**: Heroku (backend) + Render (frontend)

## Project Structure

```
.
├── backend/          # Go API server
│   ├── config/       # Configuration
│   ├── firebase/     # Firestore client
│   ├── handlers/     # HTTP handlers
│   ├── middleware/   # Auth middleware
│   ├── models/       # Data models
│   ├── utils/        # Helpers
│   └── main.go       # Entry point
│
└── frontend/         # React app
    └── src/
        ├── api/      # API client
        ├── components/
        ├── pages/
        ├── store/    # Zustand state
        ├── types/
        └── utils/
```

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database (start in test mode for development)
4. Go to Project Settings → Service Accounts
5. Click "Generate new private key"
6. Save the JSON file as `backend/firebase-service-account.json`

### 2. Telegram Bot Setup

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow instructions
3. Copy the bot token
4. Send `/newapp` to create a Mini App
5. Set the Web App URL (will be your frontend URL after deployment)

### 3. Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your values:
# - TELEGRAM_BOT_TOKEN (from BotFather)
# - FIREBASE_PROJECT_ID (from Firebase Console)
# - JWT_SECRET (generate a random 32-char string)

# Install dependencies
go mod download

# Run locally
go run main.go
```

Backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env:
# VITE_API_BASE_URL=http://localhost:8080

# Run locally
npm run dev
```

Frontend will start on `http://localhost:5173`

### 5. Testing Locally

For local development with Telegram Mini App:

1. Use [ngrok](https://ngrok.com) to expose your local servers:
   ```bash
   ngrok http 8080  # Backend
   ngrok http 5173  # Frontend
   ```

2. Update `.env` files with ngrok URLs

3. Set the ngrok frontend URL in @BotFather as your Mini App URL

4. Open your bot in Telegram and launch the Mini App

## Deployment

### Backend to Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create your-app-name-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret-here
heroku config:set TELEGRAM_BOT_TOKEN=your-token
heroku config:set FIREBASE_PROJECT_ID=your-project-id

# For Firebase credentials (paste JSON content):
heroku config:set GOOGLE_CREDENTIALS="$(cat firebase-service-account.json)"

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Frontend to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new "Static Site"
4. Connect your GitHub repository
5. Set build settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
6. Add environment variable:
   - `VITE_API_BASE_URL` = your Heroku backend URL
7. Deploy

### Update Telegram Bot

In @BotFather:
1. Send `/myapps`
2. Select your app
3. Edit → Web App URL
4. Set to your Render frontend URL

## API Endpoints

### Auth
- `POST /auth/telegram` - Authenticate with Telegram

### Rides
- `GET /rides` - List rides (query: from, to, date)
- `POST /rides` - Create ride
- `GET /rides/:id` - Get ride details
- `PUT /rides/:id` - Update ride
- `DELETE /rides/:id` - Delete ride
- `PATCH /rides/:id/complete` - Mark completed

### Ride Requests
- `POST /rides/:id/requests` - Request a seat
- `GET /rides/:id/requests` - List requests (driver only)
- `PATCH /rides/:id/requests/:reqId` - Accept/reject request

### Passenger Posts
- `GET /passenger-posts` - List passenger posts
- `POST /passenger-posts` - Create post
- `DELETE /passenger-posts/:id` - Delete post

### Cargo
- `GET /cargo` - List cargo requests
- `POST /cargo` - Create cargo request
- `DELETE /cargo/:id` - Delete cargo request

### Users
- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile

## Features

✅ Telegram authentication (no passwords needed)  
✅ Create and browse rides  
✅ Request seats as passenger  
✅ Accept/reject ride requests as driver  
✅ Post passenger requests  
✅ Cargo delivery requests  
✅ Real-time Telegram notifications  
✅ City-based search and filtering  
✅ Profile management with role switching  

## Development Notes

- All dates are stored as strings in `YYYY-MM-DD` format
- Times are stored as strings in `HH:MM` format
- Currency is hardcoded to KGS (Kyrgyz Som)
- Firestore indexes may be needed for complex queries (Firebase will prompt you)

## License

MIT
