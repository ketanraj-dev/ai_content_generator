# ContentAI — YouTube to LinkedIn Post Generator

Turn any YouTube video into a polished, ready-to-publish LinkedIn post in seconds. Paste a link, let AI do the writing, and publish with one click.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)
![OpenAI](https://img.shields.io/badge/GPT--4.1--mini-412991?logo=openai)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- **AI-Powered Writing** — GPT-4.1-mini analyzes the video transcript and generates a LinkedIn-ready post with hooks, structure, and hashtags
- **Custom Tone & Length** — Choose professional, casual, or storytelling tone with short, medium, or long post length
- **1-Click Publish** — Connect your LinkedIn account via OAuth and publish directly from the dashboard
- **Edit Before Publishing** — Review and tweak AI-generated content before it goes live
- **Post History** — All generated and published posts saved per user
- **Auto Hashtags** — Set default hashtags or let AI pick relevant ones
- **Multi-User Support** — Each user gets their own LinkedIn connection, preferences, and post history
- **Usage Limits** — Free tier (3 posts/month) and Pro tier (unlimited)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL (Supabase) |
| AI | OpenAI GPT-4.1-mini |
| Auth | JWT (HttpOnly cookies), LinkedIn OAuth 2.0 |
| Deployment | Render (backend), Vercel (frontend) |

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── api/
│   │   │   ├── auth.py          # Login, register, logout
│   │   │   ├── linkedin_auth.py # LinkedIn OAuth flow
│   │   │   ├── routes.py        # Generate & publish endpoints
│   │   │   └── user.py          # User profile & preferences
│   │   ├── core/
│   │   │   ├── config.py        # Environment settings
│   │   │   ├── dependencies.py  # Auth dependency injection
│   │   │   └── security.py      # Password hashing, JWT
│   │   ├── db/
│   │   │   ├── database.py      # SQLAlchemy engine & session
│   │   │   ├── models.py        # Post model
│   │   │   └── user_models.py   # User model
│   │   ├── models/
│   │   │   └── schemas.py       # Pydantic request/response schemas
│   │   └── services/
│   │       ├── ai_service.py    # OpenAI post generation
│   │       ├── linkedin_service.py  # LinkedIn API publishing
│   │       └── youtube_service.py   # YouTube transcript extraction
│   ├── requirement.txt
│   ├── Procfile
│   └── runtime.txt
├── frontend/
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   ├── layout.tsx           # Root layout
│   │   ├── login/page.tsx       # Login page
│   │   ├── register/page.tsx    # Register page
│   │   └── dashboard/
│   │       ├── page.tsx         # Main dashboard
│   │       ├── history/page.tsx # Post history
│   │       └── settings/page.tsx # User settings
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Sidebar, Header
│   │   └── dashboard/           # Dashboard-specific components
│   └── lib/
│       ├── api.ts               # API client functions
│       └── types.ts             # TypeScript interfaces
└── prototype/                   # LangGraph prototype (reference)
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL database (or [Supabase](https://supabase.com) free tier)
- OpenAI API key
- LinkedIn Developer App (for OAuth)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirement.txt

# Create .env from template
cp .env.example .env
# Fill in your API keys and database URL

uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`. API docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```

Frontend runs at `http://localhost:3000`.

## Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | Random string for JWT signing |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth app client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth app client secret |
| `LINKEDIN_REDIRECT_URI` | OAuth callback URL |
| `FRONTEND_URL` | Frontend URL (for redirects) |
| `ALLOWED_ORIGINS` | CORS allowed origins |
| `ENVIRONMENT` | `development` or `production` |
| `PROXY_URL` | *(Optional)* HTTP proxy for YouTube transcript fetching |

### Frontend (.env.local)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

## Deployment

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo, set root directory to `backend`
3. Build command: `pip install -r requirement.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add all environment variables from the table above
6. Set `ENVIRONMENT=production`

### Frontend → Vercel

1. Import your repo on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add `NEXT_PUBLIC_API_URL` pointing to your Render backend URL
4. Deploy

### YouTube Transcript on Cloud

YouTube blocks transcript requests from cloud provider IPs. To fix this, use a residential proxy:

1. Sign up at [Webshare.io](https://www.webshare.io/) (free tier available)
2. Get your proxy URL
3. Add `PROXY_URL=http://user:pass@host:port` to Render env vars

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Login (sets cookie) |
| POST | `/auth/logout` | Logout (clears cookie) |
| GET | `/auth/linkedin/login` | Start LinkedIn OAuth |
| GET | `/auth/linkedin/callback` | LinkedIn OAuth callback |
| POST | `/generate` | Generate post from YouTube URL |
| POST | `/publish` | Publish post to LinkedIn |
| PUT | `/update-draft` | Edit a draft |
| GET | `/linkedin-status` | Check LinkedIn connection |
| GET | `/user/me` | Get user profile & usage |
| GET | `/user/preferences` | Get content preferences |
| PUT | `/user/preferences` | Update preferences |
| DELETE | `/user/account` | Delete account |

## License

MIT
