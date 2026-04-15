from fastapi import APIRouter, HTTPException, Query

from app.schemas import HealthResponse, SearchResult, StreamResponse
from app.services.search import search_tracks
from app.services.streams import get_stream_url

router = APIRouter()


@router.get("/", response_model=HealthResponse)
async def root() -> HealthResponse:
    return HealthResponse(status="ok", version="1.0.0")


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok", version="1.0.0")


@router.get("/search", response_model=list[SearchResult])
async def search(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=50),
) -> list[SearchResult]:
    return await search_tracks(q, limit)


@router.get("/stream/{video_id}", response_model=StreamResponse)
async def stream(video_id: str) -> StreamResponse:
    stream_url = await get_stream_url(video_id)
    if stream_url is None:
        raise HTTPException(status_code=422, detail="stream_unavailable")
    return stream_url
