import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HtmlDescription } from './ui/html-description';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1 } from 'lucide-react';

export function AudioPlayer() {
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    playlist
  } = useAudio();

  // Close volume control when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeControl(false);
      }
    };

    if (showVolumeControl) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVolumeControl]);

  // Reset description expansion when track changes
  useEffect(() => {
    setShowFullDescription(false);
  }, [currentTrack?.id]);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleVolumeClick = (event: React.MouseEvent) => {
    if (event.shiftKey || event.ctrlKey) {
      // Mute/unmute when holding modifier key
      if (volume > 0) {
        setPreviousVolume(volume);
        setVolume(0);
      } else {
        setVolume(previousVolume);
      }
    } else {
      // Toggle volume control visibility
      setShowVolumeControl(!showVolumeControl);
    }
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 gradient-metal border-t border-neon-cyan/30 p-4 md:p-6 rounded-t-lg rounded-b-none shadow-brutal">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Track Info */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-start gap-3">
              {/* Artwork Thumbnail */}
              {currentTrack.artwork && (
                <div className="flex-shrink-0">
                  <ImageWithFallback
                    src={currentTrack.artwork}
                    alt={`${currentTrack.title} artwork`}
                    className="w-20 max-h-20 object-cover"
                  />
                </div>
              )}
              
              {/* Track Details */}
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium">{currentTrack.title}</div>
                <div className="text-muted-foreground text-sm truncate">{currentTrack.artist}</div>
                {currentTrack.description && (
                  <div className="text-xs text-muted-foreground mt-1 max-w-md">
                    <HtmlDescription 
                      content={showFullDescription 
                        ? currentTrack.description 
                        : currentTrack.description.length > 80 
                          ? currentTrack.description.substring(0, 80) + '...' 
                          : currentTrack.description
                      }
                      className=""
                    />
                    {currentTrack.description.length > 80 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-xs text-white hover:text-gray-200 underline mt-1"
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousTrack}
              disabled={playlist.length <= 1}
              className="p-2"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={togglePlayPause}
              className="p-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              disabled={playlist.length <= 1}
              className="p-2"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex-2 flex items-center gap-2 md:gap-4 w-full md:w-auto min-w-0">
            <span className="text-xs text-muted-foreground hidden md:block whitespace-nowrap">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 min-w-[200px] md:min-w-[300px]">
              <Slider
                value={[progress]}
                onValueChange={([value]) => {
                  const newTime = (value / 100) * duration;
                  seekTo(newTime);
                }}
                max={100}
                step={0.1}
                className="cursor-pointer audio-slider"
              />
            </div>
            <span className="text-xs text-muted-foreground hidden md:block whitespace-nowrap">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume */}
          <div className="relative flex items-center gap-2" ref={volumeControlRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVolumeClick}
              className="p-2 hover:bg-muted/50"
              title="Click to show volume control, Shift+Click to mute/unmute"
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              ) : volume < 0.5 ? (
                <Volume1 className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            {showVolumeControl && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-gray-900 border border-gray-200 rounded-lg p-3 shadow-lg z-10 min-w-[140px]" style={{backgroundColor: '#ffffff'}}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setVolume(0)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Mute"
                  >
                    <VolumeX className="h-3 w-3 text-gray-600 flex-shrink-0" />
                  </button>
                  <div className="flex-1">
                    <Slider
                      value={[volume * 100]}
                      onValueChange={([value]) => setVolume(value / 100)}
                      max={100}
                      step={1}
                      className="cursor-pointer audio-slider"
                    />
                  </div>
                  <button
                    onClick={() => setVolume(1)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Max Volume"
                  >
                    <Volume2 className="h-3 w-3 text-gray-600 flex-shrink-0" />
                  </button>
                </div>
                <div className="text-center text-xs text-gray-600 mt-2">
                  {Math.round(volume * 100)}%
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}