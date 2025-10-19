"use client";

import React, { useState } from "react";
import AudioWavePlayer from "../../components/AudioWavePlayer";

export default function CoffeeShopAtmosphere() {
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const enableAutoplay = () => {
    setAutoplayEnabled(true);
    setIsPlaying(true);
  };

  const toggleAllSounds = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <main
      className="min-h-screen p-8"
      onClick={!autoplayEnabled ? enableAutoplay : undefined}
    >
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url("/coffee-shop-atmosphere/bar.png")' }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Coffee Shop Atmosphere
        </h1>

        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ambient Sounds</h2>
          <p className="text-gray-700 mb-4">
            Immerse yourself in the authentic atmosphere of a cozy coffee shop.
            Our carefully curated ambient sounds will help you focus, relax, or
            create the perfect background for your work.
          </p>
        </section>

        <section className="mb-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleAllSounds}
              className="px-6 py-3 bg-[#6F4E37] text-white rounded-lg hover:bg-[#5C4033] duration-200 shadow-md"
            >
              {isPlaying ? "Pause All Sounds" : "Play All Sounds"}
            </button>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col w-1/4">
              <h2 className="text-2xl font-semibold mb-4">Featured Sounds</h2>

              <div className="p-4 mb-2">
                <AudioWavePlayer
                  title="Clear Rain"
                  audioUrl="/coffee-shop-atmosphere/erarly-morning-rainfalls.wav"
                  autoplay={autoplayEnabled && isPlaying}
                />
              </div>

              <div className="p-4 mb-2">
                <AudioWavePlayer
                  title="Making an Coffee"
                  audioUrl="/coffee-shop-atmosphere/makeing-an-espresso-americano-coffee.wav"
                  autoplay={autoplayEnabled && isPlaying}
                />
              </div>

              <div className="p-4 mb-2">
                <AudioWavePlayer
                  title="Stirring Cup"
                  audioUrl="/coffee-shop-atmosphere/stirring-cup.wav"
                  autoplay={autoplayEnabled && isPlaying}
                />
              </div>
            </div>
          </div>
        </section>

        {!autoplayEnabled && (
          <div className="flex flex-col items-center mb-8">
            <p className="text-xs">
              (Click anywhere on the page to enable audio playback)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
