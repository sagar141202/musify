from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta

import yt_dlp

from app.schemas import StreamResponse


def _extract_stream_sync(video_id: str) -> StreamResponse | None:
    url = f"https://www.youtube.com/watch?v={video_id}"
    ydl_opts = {
        "format": "bestaudio[ext=webm]/bestaudio[ext=m4a]/bestaudio",
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except yt_dlp.utils.DownloadError:
        return None

    stream_url = info.get("url")
    if not stream_url:
        return None

    expires_at = datetime.now(UTC) + timedelta(hours=5)
    return StreamResponse(
        stream_url=stream_url,
        format=info.get("ext") or "audio",
        expires_at=expires_at.isoformat(),
    )


async def get_stream_url(video_id: str) -> StreamResponse | None:
    return await asyncio.to_thread(_extract_stream_sync, video_id)
