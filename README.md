# 🎬 react-youtube-light

**`react-youtube-light`** is a lightweight React wrapper around the YouTube IFrame API.  
It simplifies embedding and controlling YouTube videos via a declarative React component interface.

---

## 🚀 Features

- 🎥 Embed YouTube videos with ease
- 🎮 Control playback programmatically using `ref`
- ⏰ Set start/end times
- 🔇 Mute, pause, seek, and more
- 📡 Attach event listeners (play, pause, end, ready)
- 🪶 Lightweight and customizable
- 🎨 Fully customizable styling

---

## 📦 Installation

Install via **npm**:
```bash
npm install react-youtube-light
```

Or with **yarn**:
```bash
yarn add react-youtube-light
```

---

## 📖 Usage 

### Basic Example

```typescript
import YoutubeFrame from 'react-youtube-light';
import { useRef } from 'react';

function App() {
  const playerRef = useRef<YoutubeControls>(null);

  return (
    <div>
      <YoutubeFrame
        ref={playerRef}
        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        mute={true}
        startTime={10}
        endTime={60}
        hideControls={false}
        containerClassNames="my-custom-class"
        onVideoReady={() => console.log('Player is ready!')}
        onVideoPlay={() => console.log('Video is playing')}
        onVideoPause={() => console.log('Video is paused')}
        onVideoEnd={() => console.log('Video has ended')}
      />
    </div>
  );
}
```

### Advanced Usage with Controls

```typescript
import YoutubeFrame, { YoutubeControls } from 'react-youtube-light';
import { useRef } from 'react';

function VideoPlayer() {
  const playerRef = useRef<YoutubeControls>(null);

  const handlePlay = () => {
    playerRef.current?.play();
  };

  const handlePause = () => {
    playerRef.current?.pause();
  };

  const handleSeek = () => {
    playerRef.current?.seekTo(30);
  };

  return (
    <div>
      <YoutubeFrame
        ref={playerRef}
        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        containerClassNames="w-full h-96 rounded-lg"
      />
      
      <div className="mt-4 space-x-2">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleSeek}>Seek to 30s</button>
      </div>
    </div>
  );
}
```

---

## ⚙️ Props

| Prop                  | Type                   | Default | Description                                |
| --------------------- | ---------------------- | ------- | ------------------------------------------ |
| `ref`                 | `Ref<YoutubeControls>` | -       | Access to player controls programmatically |
| `src`                 | `string`               | -       | YouTube video URL (**required**)           |
| `mute`                | `boolean`              | `false` | Mute the video on start                    |
| `startTime`           | `number`               | `0`     | Start playback from this second            |
| `endTime`             | `number`               | -       | Stop playback at this second               |
| `hideControls`        | `boolean`              | `false` | Hide native YouTube controls               |
| `containerClassNames` | `string`               | `""`    | Extra CSS classes for container            |
| `onVideoReady`        | `() => void`           | -       | Callback when player is ready              |
| `onVideoPlay`         | `() => void`           | -       | Callback when video starts playing        |
| `onVideoPause`        | `() => void`           | -       | Callback when video is paused              |
| `onVideoEnd`          | `() => void`           | -       | Callback when video ends                   |

---

## 🎮 Player Controls via Ref

You can use the player ref to interact with the video programmatically:

```typescript
// Basic controls
playerRef.current?.play();
playerRef.current?.pause();
playerRef.current?.stop();

// Seeking and volume
playerRef.current?.seekTo(30);
playerRef.current?.setVolume(50);

// Get information
const currentTime = playerRef.current?.getCurrentTime();
const duration = playerRef.current?.getDuration();
const volume = playerRef.current?.getVolume();

// Load new video
playerRef.current?.loadVideoByUrl('https://www.youtube.com/watch?v=NEW_VIDEO_ID');
```

---

## 📋 Available Methods

### Control Methods
- `play()` - Start video playback
- `pause()` - Pause video playback
- `stop()` - Stop video playback
- `seekTo(seconds: number)` - Seek to specific time
- `setVolume(volume: number)` - Set volume (0-100)
- `loadVideoByUrl(url: string)` - Load a new video

### Information Methods
- `getVolume(): number` - Get current volume
- `getCurrentTime(): number` - Get current playback time
- `getDuration(): number` - Get video duration
- `getPlayer(): YT.Player | null` - Access raw YouTube player instance

### Properties
- `videoState: YT.PlayerState` - Current player state

**⚠️ Important:** Always check if `ref.current` is not null before calling methods.

```typescript
if (playerRef.current) {
  playerRef.current.play();
}
```

---

## 🖌 Styling

**By default, no styles are applied.** You can customize the appearance using CSS classes:

### With Tailwind CSS
```typescript
<YoutubeFrame 
  containerClassNames="w-full h-96 rounded-xl shadow-lg border-2 border-gray-200" 
  src="..." 
/>
```

### With Custom CSS
```css
.my-youtube-player {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

```typescript
<YoutubeFrame 
  containerClassNames="my-youtube-player" 
  src="..." 
/>
```

---

## 🎯 Player States

The `videoState` property can have the following values:

- `YT.PlayerState.UNSTARTED` (-1)
- `YT.PlayerState.ENDED` (0)
- `YT.PlayerState.PLAYING` (1)
- `YT.PlayerState.PAUSED` (2)
- `YT.PlayerState.BUFFERING` (3)
- `YT.PlayerState.CUED` (5)

---

## 🐛 Troubleshooting

### Common Issues

1. **Player not loading**: Make sure the YouTube URL is valid and the video is publicly accessible.
2. **Controls not working**: Ensure you're checking if `ref.current` exists before calling methods.
3. **Styling issues**: Remember that no default styles are applied - add your own CSS classes.

### TypeScript Support

This package includes TypeScript definitions. Import the types as needed:

```typescript
import YoutubeFrame, { YoutubeControls } from 'react-youtube-light';
```

---
