import { useEffect, useRef, type FC, type Ref } from "react";
import { loadYoutubeIFrameScript } from "../lib/loadIFrameScript";
import { getYouTubeEmbedUrl } from "../lib/getEmbedUrl";

interface YoutubeFrameProps {
  ref?: Ref<YoutubeControls>;
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
}

const YoutubeFrame: FC<YoutubeFrameProps> = ({
  ref,
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
}) => {
  const playerRef = useRef<YT.Player | null>(null);

  const ytPlayerVars: YT.PlayerVars = {
    controls: hideControls ? 0 : 1,
    start: startTime,
    end: endTime,
    mute: mute ? 1 : 0,
  };

  const controls: YoutubeControls = {
    videoState: () => playerRef.current?.getPlayerState()!,
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    stop: playerRef.current?.stopVideo(),
    seekTo: (seconds: number, allowSeekAhead: boolean = true) =>
      playerRef.current?.seekTo(seconds, allowSeekAhead),
    setVolume: (volume: number) => playerRef.current?.setVolume(volume),
    getVolume: () => playerRef.current?.getVolume() ?? 0,
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    getDuration: () => playerRef.current?.getDuration() ?? 0,
    getPlayer: playerRef.current,
    loadVideoByUrl: (url: string) => playerRef.current?.loadVideoByUrl(url),
  };

  useEffect(() => {
    let isMounted = true;

    loadYoutubeIFrameScript().then((YT) => {
      if (isMounted) {
        const embedUrl = getYouTubeEmbedUrl(src);

        if (!embedUrl) {
          throw new Error(`Invalid URL provided: ${src}`);
        }

        if (ref) {
          if (typeof ref === "function") {
            ref(controls);
            return;
          }
          ref.current = controls;
        }

        playerRef.current = new YT.Player("player", {
          width: "600",
          height: "1200",
          videoId: embedUrl.id,
          playerVars: ytPlayerVars,
          events: {
            onReady: () => {
              onVideoReady?.();
            },
            onStateChange: (event) => {
              switch (event.data) {
                case YT.PlayerState.PAUSED: {
                  onVideoPause && onVideoPause();
                  break;
                }
                case YT.PlayerState.PLAYING: {
                  onVideoPlay && onVideoPlay();
                  break;
                }
                case YT.PlayerState.ENDED: {
                  onVideoEnd && onVideoEnd();
                  break;
                }
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

  return (
    <div
      id="player"
      className={`${containerClassNames}`}
    ></div>
  );
};

export default YoutubeFrame;
