'use client'

import React, { useEffect, useRef, useState } from 'react';

export default function CoffeeShopAtmosphere() {
  const rainAudioRef = useRef<HTMLAudioElement>(null);
  const coffeeAudioRef = useRef<HTMLAudioElement>(null);
  const stirringCupAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const playAllSounds = async () => {
    try {
      // Try to play all sounds
      if (rainAudioRef.current) await rainAudioRef.current.play();
      if (coffeeAudioRef.current) await coffeeAudioRef.current.play();
      if (stirringCupAudioRef.current) await stirringCupAudioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play sounds:', error);
      // If autoplay fails, we'll wait for user interaction
      setHasInteracted(false);
    }
  };

  const toggleAllSounds = async () => {
    if (isPlaying) {
      // Pause all sounds
      if (rainAudioRef.current) rainAudioRef.current.pause();
      if (coffeeAudioRef.current) coffeeAudioRef.current.pause();
      if (stirringCupAudioRef.current) stirringCupAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play all sounds
      await playAllSounds();
    }
  };

  useEffect(() => {
    // Set initial volume for all audio elements to 80%
    const setupAudio = (audio: HTMLAudioElement | null) => {
      if (audio) {
        audio.volume = 0.8; // 80% volume
      }
    };
    
    setupAudio(rainAudioRef.current);
    setupAudio(coffeeAudioRef.current);
    setupAudio(stirringCupAudioRef.current);

    // Try to play sounds on mount
    playAllSounds();

    // Cleanup function to pause all sounds when component unmounts
    return () => {
      if (rainAudioRef.current) rainAudioRef.current.pause();
      if (coffeeAudioRef.current) coffeeAudioRef.current.pause();
      if (stirringCupAudioRef.current) stirringCupAudioRef.current.pause();
    };
  }, []);

  // Handle user interaction
  const handleUserInteraction = async () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      await playAllSounds();
    }
  };

  return (
    <main className="min-h-screen p-8" onClick={handleUserInteraction}>
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url("/coffee-shop-atmosphere/bar.png")' }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Coffee Shop Atmosphere</h1>
        
        {!hasInteracted && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Click anywhere on the page to start playing the ambient sounds.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ambient Sounds</h2>
          <p className="text-gray-700 mb-4">
            Immerse yourself in the authentic atmosphere of a cozy coffee shop. 
            Our carefully curated ambient sounds will help you focus, relax, or create 
            the perfect background for your work.
          </p>
        </section>

        <section className="mb-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleAllSounds}
            className="px-6 py-3 bg-[#6F4E37] text-white rounded-lg hover:bg-[#5C4033] duration-200 shadow-md"
          >
            {isPlaying ? 'Pause All Sounds' : 'Play All Sounds'}
          </button>
        </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Featured Sounds</h2>

              <div className="p-4 mb-2">
                <p className="text-sm text-gray-600">Clear Rain</p>
                <audio 
                  ref={rainAudioRef}
                  controls
                  className="w-full mt-2"
                  preload="auto"
                  loop
                  src="/coffee-shop-atmosphere/erarly-morning-rainfalls.wav"
                />
              </div>
              
              <div className="p-4 mb-2">
                <p className="text-sm text-gray-600">Making an Coffee</p>
                <audio 
                  ref={coffeeAudioRef}
                  controls
                  className="w-full mt-2"
                  preload="auto"
                  loop
                  src="/coffee-shop-atmosphere/makeing-an-espresso-americano-coffee.wav"
                />
              </div>
              
              <div className="p-4 mb-2">
                <p className="text-sm text-gray-600">Stirring Cup</p>
                <audio 
                  ref={stirringCupAudioRef}
                  controls
                  className="w-full mt-2"
                  preload="auto"
                  loop
                  src="/coffee-shop-atmosphere/stirring-cup.wav"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}