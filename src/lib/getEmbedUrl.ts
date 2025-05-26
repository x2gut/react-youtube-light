export function getYouTubeEmbedUrl(url: string): {
  embedUrl: string;
  id: string;
} | null {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          id: videoId,
        };
      }
    } else if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          id: videoId,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}
