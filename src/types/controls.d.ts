interface YoutubeControls {
  videoState: () => YT.PlayerState;
  play: () => void;
  pause: () => void;
  stop: void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayer: YT.Player | null;
  loadVideoByUrl: (url: string) => void;
}
