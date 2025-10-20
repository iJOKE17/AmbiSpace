"use client";

import React, { useState } from "react";
import AudioWavePlayer from "../../components/AudioWavePlayer";

export default function CoffeeShopAtmosphere() {
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presetVolumes, setPresetVolumes] = useState({
    focusMode: {
      "Rainy Windows": 0.05,
      "Barista Craft": 0.02,
      "Gentle Mug Stir": 0.1,
      "Flipping Pages": 0.3,
    },
    readingMood: {
      "Rainy Windows": 0.15,
      "Barista Craft": 0.05,
      "Gentle Mug Stir": 0.05,
      "Flipping Pages": 0.6,
    },
    midnightVibes: {
      "Rainy Windows": 0.2,
      "Barista Craft": 0.0,
      "Gentle Mug Stir": 0.02,
      "Flipping Pages": 0.1,
    },
  });
  const [currentPreset, setCurrentPreset] = useState("focusMode");

  const enableAutoplay = () => {
    setAutoplayEnabled(true);
    setIsPlaying(true);
  };

  const toggleAllSounds = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!autoplayEnabled) enableAutoplay();
    setIsPlaying(!isPlaying);
  };

  const handlePresetClick =
    (presetType: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      // Update the current preset
      setCurrentPreset(presetType);

      // Update preset volumes state with new values
      const newPresetVolumes = {
        focusMode: {
          "Rainy Windows":
            presetType === "focusMode"
              ? 0.05
              : presetVolumes.focusMode["Rainy Windows"],
          "Barista Craft":
            presetType === "focusMode"
              ? 0.02
              : presetVolumes.focusMode["Barista Craft"],
          "Gentle Mug Stir":
            presetType === "focusMode"
              ? 0.1
              : presetVolumes.focusMode["Gentle Mug Stir"],
          "Flipping Pages":
            presetType === "focusMode"
              ? 0.3
              : presetVolumes.focusMode["Flipping Pages"],
        },
        readingMood: {
          "Rainy Windows":
            presetType === "readingMood"
              ? 0.15
              : presetVolumes.readingMood["Rainy Windows"],
          "Barista Craft":
            presetType === "readingMood"
              ? 0.05
              : presetVolumes.readingMood["Barista Craft"],
          "Gentle Mug Stir":
            presetType === "readingMood"
              ? 0.05
              : presetVolumes.readingMood["Gentle Mug Stir"],
          "Flipping Pages":
            presetType === "readingMood"
              ? 0.6
              : presetVolumes.readingMood["Flipping Pages"],
        },
        midnightVibes: {
          "Rainy Windows":
            presetType === "midnightVibes"
              ? 0.2
              : presetVolumes.midnightVibes["Rainy Windows"],
          "Barista Craft":
            presetType === "midnightVibes"
              ? 0.0
              : presetVolumes.midnightVibes["Barista Craft"],
          "Gentle Mug Stir":
            presetType === "midnightVibes"
              ? 0.02
              : presetVolumes.midnightVibes["Gentle Mug Stir"],
          "Flipping Pages":
            presetType === "midnightVibes"
              ? 0.1
              : presetVolumes.midnightVibes["Flipping Pages"],
        },
      };

      setPresetVolumes(newPresetVolumes);

      console.log(
        `Applying ${presetType} preset:`,
        newPresetVolumes[presetType as keyof typeof newPresetVolumes]
      );

      // For now, enable autoplay if not already enabled
      if (!autoplayEnabled) {
        setAutoplayEnabled(true);
      }
      setIsPlaying(true);
    };
  return (
    <main
      className="min-h-screen p-8 "
      onClick={autoplayEnabled ? undefined : enableAutoplay}
    >
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: 'url("/coffee-shop-atmosphere/bar.png")' }}
      />

      {/* Soft cozy blur overlay for edges */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/5 to-black/40" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/5 to-black/30" />
      {/* Gentle corner vignette effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black/20 via-transparent to-transparent" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-bl from-black/20 via-transparent to-transparent" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-tl from-black/20 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto  text-white">
        <h1 className="text-4xl font-bold mb-6 text-center ">The cozy cafe</h1>

        <section className="mb-8 text-center  text-white">
          <h2 className="text-2xl font-semibold mb-4">Ambient Sounds</h2>
        </section>

        <section className="mb-8">
          <div className="flex justify-center">
            <button
              onClick={toggleAllSounds}
              className="px-6 py-3 bg-[#6F4E37] text-white rounded-lg hover:bg-[#5C4033] duration-200 shadow-md"
            >
              {isPlaying ? "Pause your session" : "Start your session"}
            </button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs">
              (Click anywhere on the page to enable audio playback)
            </p>
          </div>
        </section>

        {/* short description of this pages */}
        <section className="mb-8">
          <div className="flex justify-center mb-6">
            <p className="max-w-2xl text-center text-gray-200">
              Immerse yourself in the comforting ambiance of a cozy cafe. Blend
              the soothing sounds of rain, coffee-making, gentle mug stirring,
              and page flipping to create your perfect background atmosphere for
              work, study, or relaxation.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Mixed your perfect blend
              </h2>

              <div className="flex flex-row">
                <div>
                  <div className="p-4 mb-2 cozy-cafe">
                    <AudioWavePlayer
                      title="Rainy Windows"
                      audioUrl="/coffee-shop-atmosphere/erarly-morning-rainfalls.wav"
                      autoplay={autoplayEnabled && isPlaying}
                      defaultVolume={
                        presetVolumes[
                          currentPreset as keyof typeof presetVolumes
                        ]["Rainy Windows"]
                      }
                      delayEachLoopMs={0}
                    />
                  </div>

                  <div className="p-4 mb-2 cozy-cafe">
                    <AudioWavePlayer
                      title="Barista Craft"
                      audioUrl="/coffee-shop-atmosphere/makeing-an-espresso-americano-coffee.wav"
                      autoplay={autoplayEnabled && isPlaying}
                      defaultVolume={
                        presetVolumes[
                          currentPreset as keyof typeof presetVolumes
                        ]["Barista Craft"]
                      }
                      delayEachLoopMs={5000}
                    />
                  </div>

                  <div className="p-4 mb-2 cozy-cafe">
                    <AudioWavePlayer
                      title="Gentle Mug Stir"
                      audioUrl="/coffee-shop-atmosphere/stirring-cup.wav"
                      autoplay={autoplayEnabled && isPlaying}
                      defaultVolume={
                        presetVolumes[
                          currentPreset as keyof typeof presetVolumes
                        ]["Gentle Mug Stir"]
                      }
                      delayEachLoopMs={7000}
                    />
                  </div>

                  <div className="p-4 mb-2 cozy-cafe">
                    <AudioWavePlayer
                      title="Flipping Pages"
                      audioUrl="/coffee-shop-atmosphere/page-flip.wav"
                      autoplay={autoplayEnabled && isPlaying}
                      defaultVolume={
                        presetVolumes[
                          currentPreset as keyof typeof presetVolumes
                        ]["Flipping Pages"]
                      }
                      delayEachLoopMs={4000}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Preset soundscape
                  </h2>
                  <div className="p-4 mb-2 cozy-cafe">
                    <div className="flex flex-col gap-3">
                      <button
                        className="px-6 py-2 rounded-full border-2 border-[#6F4E37] bg-transparent text-white hover:bg-[#6F4E37] hover:bg-opacity-20 transition-all duration-200"
                        onClick={handlePresetClick("focusMode")}
                      >
                        Focus Mode
                      </button>
                      <button
                        className="px-6 py-2 rounded-full border-2 border-[#6F4E37] bg-transparent text-white hover:bg-[#6F4E37] hover:bg-opacity-20 transition-all duration-200"
                        onClick={handlePresetClick("readingMood")}
                      >
                        Reading Mood
                      </button>
                      <button
                        className="px-6 py-2 rounded-full border-2 border-[#6F4E37] bg-transparent text-white hover:bg-[#6F4E37] hover:bg-opacity-20 transition-all duration-200"
                        onClick={handlePresetClick("midnightVibes")}
                      >
                        Midnight Vibes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
