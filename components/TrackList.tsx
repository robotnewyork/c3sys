import React from 'react';
import { useAudio } from '../contexts/AudioContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { StreamingLinks } from './ui/streaming-links';
import { Play, Pause } from 'lucide-react';

interface StreamingLinksData {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  audioUrl?: string;
  trackNumber?: number;
  streamingLinks?: StreamingLinksData;
}

interface TrackListProps {
  tracks: Track[];
  showArtist?: boolean;
  showTrackNumber?: boolean;
  title?: string;
}

export function TrackList({ tracks, showArtist = true, showTrackNumber = true, title }: TrackListProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setPlaylist } = useAudio();

  React.useEffect(() => {
    if (tracks.length > 0) {
      setPlaylist(tracks.filter(track => track.audioUrl));
    }
  }, [tracks, setPlaylist]);

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  if (tracks.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No tracks available</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {title && <h3 className="mb-4">{title}</h3>}
      <div className="space-y-0">
        {tracks.map((track) => (
          <div key={track.id} className="px-2 py-1 rounded hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-center space-x-2">
                {track.audioUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlay(track)}
                    className="p-1"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {showTrackNumber && track.trackNumber != null && track.trackNumber > 0 && (
                      <span className="text-sm font-mono font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded min-w-[2rem] text-center">
                        {track.trackNumber.toString().padStart(2, '0')}.
                      </span>
                    )}
                    <span className={`min-w-0 break-words ${currentTrack?.id === track.id ? 'text-electric-pink font-medium' : 'font-medium'}`}>
                      {track.title}
                    </span>
                  </div>
                  {showArtist && (
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  )}
                </div>
              </div>

              {track.duration && (
                <div className="shrink-0 text-sm text-muted-foreground">
                  {track.duration}
                </div>
              )}

              {track.streamingLinks && (
                <StreamingLinks links={track.streamingLinks} size="sm" iconOnly className={track.duration ? 'ml-2' : undefined} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}