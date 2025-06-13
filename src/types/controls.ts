/// <reference types="youtube" />

export interface YoutubeControls {
  videoState: () => YT.PlayerState | undefined;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number | undefined;
  getCurrentTime: () => number | undefined;
  getDuration: () => number | undefined;
  getPlayer: () => YT.Player | null;
  loadVideoByUrl: (url: string) => void;
  mute: () => void;
  unmute: () => void;
  isPlayerReady: () => boolean;
}
