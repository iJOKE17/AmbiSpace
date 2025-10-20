import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioWavePlayer.module.css";
import { Howl } from "howler";
import { CloudHail, CirclePlay, CirclePause } from "lucide-react";

interface AudioWavePlayerProps {
  audioUrl: string;
  autoplay?: boolean;
  title?: string;
  name?: string;
  defaultVolume?: number;
  delayEachLoopMs?: number;
}

const AudioWavePlayer: React.FC<AudioWavePlayerProps> = ({
  audioUrl,
  autoplay = false,
  title = "",
  name = "",
  defaultVolume = 1,
  delayEachLoopMs = 2000,
}) => {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldLoopRef = useRef<boolean>(false);


  // Initialize Howl instance when component mounts or audioUrl changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [audioUrl],
      loop: false, // Disable automatic looping to handle manual delay
      volume: volume,
      autoplay: autoplay,
      onload: () => {
        // console.log("Audio loaded successfully");
      },
      onloaderror: (id: number, error: unknown) => {
        console.error("Audio load error:", error);
      },
      onplay: () => {
        setIsPlaying(true);
        shouldLoopRef.current = true;
      },
      onpause: () => {
        setIsPlaying(false);
        shouldLoopRef.current = false;
      },
      onstop: () => {
        setIsPlaying(false);
        shouldLoopRef.current = false;
      },
      onend: () => {
        // Handle loop with delay
        if (shouldLoopRef.current) {
          loopTimeoutRef.current = setTimeout(() => {
            if (soundRef.current && shouldLoopRef.current) {
              soundRef.current.play();
            }
          }, delayEachLoopMs);
        }
      },
      onplayerror: (id: number, error: unknown) => {
        console.error("Audio play error:", error);
        // Try to unlock audio on mobile devices
        sound.once("unlock", () => {
          sound.play();
        });
      },
    });

    soundRef.current = sound;

    return () => {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [audioUrl, autoplay, volume, delayEachLoopMs]);

  // Update volume when defaultVolume prop changes
  useEffect(() => {
    setVolume(defaultVolume);
    if (soundRef.current) {
      soundRef.current.volume(defaultVolume);
    }
  }, [defaultVolume]);

  // Set initial slider value
  useEffect(() => {
    if (volumeSliderRef.current) {
      const percentage = volume * 100;
      volumeSliderRef.current.style.setProperty(
        "--slider-value",
        `${percentage}%`
      );
    }
  }, [volume]);

  const togglePlay = () => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isPlaying) {
      shouldLoopRef.current = false;
      // Clear any pending loop timeout
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      sound.pause();
    } else {
      shouldLoopRef.current = true;
      sound.play();
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);

    if (soundRef.current) {
      soundRef.current.volume(vol);
    }

    // Update CSS custom property for the slider fill
    const slider = e.target;
    const percentage = vol * 100;
    slider.style.setProperty("--slider-value", `${percentage}%`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4 gap-2 align-middle">
        <span className="font-medium text-lg">
          <CloudHail aria-hidden width={18} height={18} color="white" />
        </span>
        <div>{title && <p className="text-sm">{title}</p>}</div>
      </div>
      <div className="flex items-center gap-4 align-middle">
        <CirclePlay
          className={`${styles.playButton} ${isPlaying ? "hidden" : "block"}`}
          onClick={togglePlay}
          width={32}
          height={32}
        />
        <CirclePause
          className={`${styles.playButton} ${isPlaying ? "block" : "hidden"}`}
          onClick={togglePlay}
          width={32}
          height={32}
        />

        <input
          ref={volumeSliderRef}
          type="range"
          min="0"
          max="1"
          step="0.01"
          title="Volume Control"
          value={volume}
          onChange={handleVolume}
          className={name ? `${name}-volumeSlider` : "volumeSlider"}
        />
      </div>
    </div>
  );
};

export default AudioWavePlayer;
