import { useQuery } from "@tanstack/react-query";

import { mockTracks } from "../data/mockTracks";
import { searchTracks } from "../lib/api";

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    enabled: query.trim().length > 1,
    queryFn: async () => {
      try {
        return await searchTracks(query.trim());
      } catch {
        const normalized = query.trim().toLowerCase();
        return mockTracks.filter((track) => {
          return (
            track.title.toLowerCase().includes(normalized) ||
            track.artist.toLowerCase().includes(normalized) ||
            track.album?.toLowerCase().includes(normalized)
          );
        });
      }
    }
  });
}
