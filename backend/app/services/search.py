from __future__ import annotations

import asyncio
from typing import Any

from ytmusicapi import YTMusic

from app.schemas import SearchResult


def _thumbnail(result: dict[str, Any]) -> str | None:
    thumbnails = result.get("thumbnails") or []
    if not thumbnails:
        return None
    return thumbnails[-1].get("url")


def _artist(result: dict[str, Any]) -> str:
    artists = result.get("artists") or []
    if artists:
        return ", ".join(artist.get("name", "") for artist in artists if artist.get("name"))
    return result.get("artist") or "Unknown Artist"


def _duration_ms(result: dict[str, Any]) -> int | None:
    seconds = result.get("duration_seconds")
    if seconds is None:
        return None
    return int(seconds) * 1000


def _search_sync(query: str, limit: int) -> list[SearchResult]:
    ytmusic = YTMusic()
    raw_results = ytmusic.search(query, filter="songs", limit=limit)
    tracks: list[SearchResult] = []

    for result in raw_results:
        video_id = result.get("videoId")
        title = result.get("title")
        if not video_id or not title:
            continue

        tracks.append(
            SearchResult(
                videoId=video_id,
                title=title,
                artist=_artist(result),
                album=(result.get("album") or {}).get("name"),
                duration_ms=_duration_ms(result),
                thumbnail_url=_thumbnail(result),
            )
        )

    return tracks


async def search_tracks(query: str, limit: int) -> list[SearchResult]:
    return await asyncio.to_thread(_search_sync, query, limit)
