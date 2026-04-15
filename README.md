# SoundFree

SoundFree is a personal React Native music streaming app backed by a FastAPI service.

## Repository Layout

- `mobile/` - Expo React Native Android app
- `backend/` - FastAPI API service for search, stream URLs, lyrics, metadata, and library features
- `source/` - Product, design, tech stack, and roadmap source documents
- `docker/` - Local infrastructure support files

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Mobile

```bash
cd mobile
npm install
npm run start
```

Use Expo Go or an Android emulator to open the app.
