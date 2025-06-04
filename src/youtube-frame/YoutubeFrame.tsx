import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { loadYoutubeIFrameScript } from "../lib/loadIFrameScript";
import { getYouTubeEmbedUrl } from "../lib/getEmbedUrl";
import type { YoutubeControls } from "../types/controls";
import { YoutubeFrameOptions } from "@/types/youtubeFrameOptions";

interface YoutubeFrameProps {
  mute?: boolean;
  startTime?: number;
  endTime?: number;
  onVideoPause?: (...args: any[]) => any;
  onVideoReady?: (...args: any[]) => any;
  onVideoPlay?: (...args: any[]) => any;
  onVideoEnd?: (...args: any[]) => any;
  hideControls?: boolean;
  containerClassNames?: string;
  src: string;
  options?: YoutubeFrameOptions;
}

const YoutubeFrame = forwardRef<YoutubeControls, YoutubeFrameProps>(
  (
    {
      containerClassNames,
      src,
      onVideoPause,
      onVideoReady,
      onVideoPlay,
      onVideoEnd,
      hideControls,
      startTime,
      endTime,
      mute,
      options,
    },
    ref
  ) => {
    const playerRef = useRef<YT.Player | null>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const ytPlayerVars: YT.PlayerVars = {
      controls: hideControls ? 0 : 1,
      start: startTime,
      end: endTime,
      mute: mute ? 1 : 0,
      modestbranding: options?.modestbranding ? 1 : 0,
      loop: options?.loop ? 1 : 0,
      autoplay: options?.autoplay ? 1 : 0,
      rel: options?.rel ? 1 : 0,
      playsinline: options?.playsinline ? 1 : 0,
      color: options?.color,
    };

    const controls: YoutubeControls = {
      videoState: () => playerRef.current?.getPlayerState(),
      play: () => playerRef.current?.playVideo(),
      pause: () => playerRef.current?.pauseVideo(),
      stop: () => playerRef.current?.stopVideo(),
      seekTo: (seconds: number, allowSeekAhead: boolean = true) =>
        playerRef.current?.seekTo(seconds, allowSeekAhead),
      setVolume: (volume: number) => playerRef.current?.setVolume(volume),
      getVolume: () => playerRef.current?.getVolume() ?? 0,
      getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
      getDuration: () => playerRef.current?.getDuration() ?? 0,
      getPlayer: () => playerRef.current,
      loadVideoByUrl: (url: string) => playerRef.current?.loadVideoByUrl(url),
      mute: () => playerRef.current?.mute(),
      unmute: () => playerRef.current?.unMute(),
      isPlayerReady: () => isPlayerReady
    };

    useImperativeHandle(ref, () => controls);

    useEffect(() => {
      let isMounted = true;

      loadYoutubeIFrameScript().then((YT) => {
        if (isMounted) {
          const embedUrl = getYouTubeEmbedUrl(src);

          if (!embedUrl) {
            throw new Error(`Invalid URL provided: ${src}`);
          }

          playerRef.current = new YT.Player("player", {
            width: "600",
            height: "1200",
            videoId: embedUrl.id,
            playerVars: ytPlayerVars,
            events: {
              onReady: () => {
                onVideoReady?.();
                setIsPlayerReady(true);
              },
              onStateChange: (event) => {
                switch (event.data) {
                  case YT.PlayerState.PAUSED:
                    onVideoPause?.();
                    break;
                  case YT.PlayerState.PLAYING:
                    onVideoPlay?.();
                    break;
                  case YT.PlayerState.ENDED:
                    onVideoEnd?.();
                    break;
                }
              },
            },
          });
        }
      });

      return () => {
        isMounted = false;
        playerRef.current?.destroy();
      };
    }, [src]);

    return <div id="player" className={containerClassNames}></div>;
  }
);

export default YoutubeFrame;
