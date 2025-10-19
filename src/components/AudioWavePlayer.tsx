import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AudioWavePlayer.module.css";
import { Howl } from "howler";

interface AudioWavePlayerProps {
  audioUrl: string;
  autoplay?: boolean;
  title?: string;
}

const AudioWavePlayer: React.FC<AudioWavePlayerProps> = ({
  audioUrl,
  autoplay = false,
  title = "",
}) => {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  // Initialize Howl instance when component mounts or audioUrl changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [audioUrl],
      loop: true,
      volume: volume,
      autoplay: autoplay,
      onload: () => {
        console.log("Audio loaded successfully");
      },
      onloaderror: (id: number, error: unknown) => {
        console.error("Audio load error:", error);
      },
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onstop: () => {
        setIsPlaying(false);
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
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [audioUrl, autoplay, volume]);

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
      sound.pause();
    } else {
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
      {title && <p className="text-sm text-gray-600 mb-2">{title}</p>}
      <div className="flex items-center gap-4 align-middle">
        <Image
          className={styles.playButton}
          src={isPlaying ? "/pause-button.png" : "/play-button.png"}
          alt={isPlaying ? "Pause Button" : "Play Button"}
          width={30}
          height={30}
          priority
          onClick={togglePlay}
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
          className={styles.volumeSlider}
        />
      </div>
    </div>
  );
};

export default AudioWavePlayer;
