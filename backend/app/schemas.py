from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    version: str


class SearchResult(BaseModel):
    video_id: str = Field(alias="videoId")
    title: str
    artist: str
    album: str | None = None
    duration_ms: int | None = None
    thumbnail_url: str | None = None


class StreamResponse(BaseModel):
    stream_url: str
    format: str
    expires_at: str | None = None
