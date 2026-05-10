# Deployment Checklist

## Pre-Deployment

- [ ] Test all features locally
- [ ] Verify Telegram authentication works
- [ ] Test ride creation and search
- [ ] Test passenger requests
- [ ] Test cargo requests
- [ ] Verify notifications are sent

## Backend Deployment (Heroku)

- [ ] Create Heroku account
- [ ] Install Heroku CLI
- [ ] Create new Heroku app: `heroku create your-app-backend`
- [ ] Set environment variables:
  ```bash
  heroku config:set JWT_SECRET=<32-char-random-string>
  heroku config:set TELEGRAM_BOT_TOKEN=<your-bot-token>
  heroku config:set FIREBASE_PROJECT_ID=<your-project-id>
  heroku config:set GOOGLE_CREDENTIALS="$(cat firebase-service-account.json)"
  ```
- [ ] Deploy: `git push heroku main`
- [ ] Verify deployment: `heroku logs --tail`
- [ ] Test API endpoint: `curl https://your-app-backend.herokuapp.com/`

## Frontend Deployment (Render)

- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Create new Static Site
- [ ] Connect GitHub repository
- [ ] Set build command: `cd frontend && npm install && npm run build`
- [ ] Set publish directory: `frontend/dist`
- [ ] Add environment variable: `VITE_API_BASE_URL=https://your-app-backend.herokuapp.com`
- [ ] Deploy
- [ ] Verify site loads

## Update Telegram Bot

- [ ] Open @BotFather
- [ ] Send `/myapps`
- [ ] Select your app
- [ ] Edit → Web App URL
- [ ] Set to: `https://your-app.onrender.com`
- [ ] Test bot in Telegram

## Firestore Security (Production)

Replace test mode rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read active rides
    match /rides/{rideId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.driver_id == request.auth.uid;
    }
    
    // Ride requests
    match /ride_requests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        resource.data.passenger_id == request.auth.uid ||
        get(/databases/$(database)/documents/rides/$(resource.data.ride_id)).data.driver_id == request.auth.uid
      );
    }
    
    // Passenger posts
    match /passenger_posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        resource.data.passenger_id == request.auth.uid;
    }
    
    // Cargo requests
    match /cargo_requests/{cargoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
  }
}
```

## Post-Deployment Testing

- [ ] Open bot in Telegram
- [ ] Verify authentication works
- [ ] Create a test ride
- [ ] Search for rides
- [ ] Request a seat (use second account)
- [ ] Accept/reject request
- [ ] Verify notifications arrive
- [ ] Test on mobile device
- [ ] Test on desktop Telegram

## Monitoring

- [ ] Check Heroku logs: `heroku logs --tail`
- [ ] Monitor Render deployment logs
- [ ] Check Firebase Console for Firestore usage
- [ ] Monitor Firebase Authentication (if enabled)

## Optional Enhancements

- [ ] Add custom domain to Render
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Create bot commands (/start, /help)
- [ ] Add rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Add automated tests
- [ ] Create admin panel

## Scaling Considerations

- [ ] Monitor Firestore read/write quotas
- [ ] Consider Firestore indexes for complex queries
- [ ] Upgrade Heroku dyno if needed
- [ ] Add Redis for caching (optional)
- [ ] Consider CDN for static assets

## Maintenance

- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Schedule regular backups
- [ ] Monitor error rates
- [ ] Update dependencies regularly
- [ ] Review and update security rules

## Launch

- [ ] Announce in target communities
- [ ] Share bot link
- [ ] Gather user feedback
- [ ] Monitor for issues
- [ ] Iterate based on feedback
