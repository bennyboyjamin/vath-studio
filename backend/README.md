# Vath Studio Backend API

Backend server for Vath Studio AI music generator.

## 🚀 Setup

### Prerequisites
- Node.js 16+
- MongoDB
- Redis (optional, for job queue)

### Installation

```bash
cd backend
npm install
cp .env.example .env
```

### Environment Variables

Edit `.env` with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vath-studio
JWT_SECRET=your_secret_key
SUNO_API_KEY=your_suno_api_key
FRONTEND_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get user's songs (protected)
- `GET /api/songs/:id` - Get single song (protected)
- `PATCH /api/songs/:id` - Update song (protected)
- `DELETE /api/songs/:id` - Delete song (protected)

### Generation
- `POST /api/generate/generate` - Start song generation (protected)
- `GET /api/generate/status/:songId` - Check generation status (protected)

### Users
- `GET /api/users/me` - Get profile (protected)
- `PATCH /api/users/me` - Update profile (protected)
- `GET /api/users/stats` - Get user statistics (protected)

## 🎵 AI Music Generation

### Supported Providers
1. **Suno AI** (Recommended)
   - Get API key at https://suno.ai
   - Set `SUNO_API_KEY` in .env

2. **Stability AI**
   - Get API key at https://stability.ai
   - Set `STABILITY_API_KEY` in .env

### Generation Flow

1. User sends generation request with prompt, genre, mood
2. System creates Song record with `pending` status
3. Async worker calls AI API to generate music
4. Status updated to `generating` (progress 10-90%)
5. On completion, audio URL and metadata saved
6. Frontend polls `/api/generate/status/:songId` for updates

## 🔐 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

## 📦 Database Models

### User
- username, email, password (hashed)
- firstName, lastName, avatar
- language preference (lo, en, th)
- subscription type and limits
- songsGenerated count

### Song
- title, prompt, genre, mood
- status (pending, generating, completed, failed)
- audioUrl, duration
- generationModel (suno, stability, custom)
- progress (0-100)
- isPublic flag

### Generation
- userId, prompt, genre, mood
- status (queued, processing, completed, failed)
- externalJobId from API provider
- result metadata

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### API Key Issues
- Verify Suno/Stability API key is valid
- Check API rate limits

### CORS Errors
- Verify FRONTEND_URL in .env matches frontend origin

## 📝 Example Usage

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user","email":"user@example.com","password":"pass123","language":"lo"}'
```

### Generate Song
```bash
curl -X POST http://localhost:5000/api/generate/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Upbeat pop song about love","genre":"pop","mood":"happy"}'
```

## 🚢 Deployment

### Deploy to Heroku
```bash
heroku create vath-studio-api
heroku config:set MONGODB_URI=<your_mongodb_url>
heroku config:set SUNO_API_KEY=<your_api_key>
git push heroku main
```

## 📄 License

MIT
