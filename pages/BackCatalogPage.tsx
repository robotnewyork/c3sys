import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TrackList } from '../components/TrackList';
import { HtmlDescription } from '../components/ui/html-description';
import { StreamingLinks } from '../components/ui/streaming-links';
import { GearList } from '../components/ui/gear-list';
import { Credits } from '../components/ui/credits';
import { useAudio } from '../contexts/AudioContext';
import { Heart, Users, Music, Play, Pause } from 'lucide-react';

import { backCatalogData } from '../data/back-catalog.ts';

interface BackCatalogPageProps {
  onNavigate: (page: string) => void;
}

export function BackCatalogPage({ onNavigate }: BackCatalogPageProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setPlaylist } = useAudio();
  
  const formatDate = (dateString: string) => {
    // Parse date components directly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle track play functionality
  const handlePlayTrack = (track: any, item: any) => {
    const trackForPlayer = {
      id: track.id,
      title: track.title,
      artist: item.artist,
      audioUrl: track.audioUrl,
      duration: track.duration,
      trackNumber: track.trackNumber,
      description: track.description,
      artwork: track.artwork
    };

    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      // Set the playlist to all back catalog tracks and play the selected one
      setPlaylist(backCatalogTracks);
      playTrack(trackForPlayer);
    }
  };

  // Convert back catalog data to track format for the audio player
  const backCatalogTracks = backCatalogData.flatMap(item => 
    item.tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: item.artist,
      audioUrl: track.audioUrl,
      duration: track.duration,
      trackNumber: track.trackNumber,
      description: track.description,
      artwork: track.artwork
    }))
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl">Back Catalog</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Music released prior to C3.SYS under other artist names and labels, as well as releases made by friends and collaborators.
          </p>
        </div>

       

        {/* Detailed Back Catalog Items */}
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Featured Back Catalog Releases</h2>
          
          {backCatalogData
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
            .map((item) => (
            <Card key={item.id} id={item.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                {/* Artwork */}
                <div className="lg:col-span-1">
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={item.artwork}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Track Info */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl mb-2">{item.title}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{item.artist}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="text-sm text-muted-foreground">
                          <span className="block">Release Date</span>
                          <span className="text-foreground">{formatDate(item.releaseDate)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="block">Tracks</span>
                          <span className="text-foreground">{item.tracks.length}</span>
                        </div>
                      </div>

                      <HtmlDescription 
                        content={item.description}
                        className="text-muted-foreground leading-relaxed mb-6"
                      />

                      {/* Genre and Format Badges */}
                      {item.genre && item.genre.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {item.genre.map((genre) => (
                            <Badge key={genre} variant="secondary">{genre}</Badge>
                          ))}
                        </div>
                      )}

                      {/* Credits */}
                      {item.credits && item.credits.length > 0 && (
                        <Credits 
                          credits={item.credits}
                          className="mb-6"
                        />
                      )}

                      {/* Gear Used */}
                      {item.gear && item.gear.length > 0 && (
                        <GearList 
                          gearIds={item.gear}
                          onNavigate={onNavigate}
                          className="mb-6"
                        />
                      )}

                      {/* Streaming Links */}
                      {item.streamingLinks && (
                        <StreamingLinks 
                          links={item.streamingLinks}
                          className="pb-6"
                        />
                      )}

                      {/* Track Listing */}
                      <div className="mb-6">
                        <h4 className="text-lg mb-3">Tracks</h4>
                        <div>
                          {item.tracks.map((track) => (
                            <div key={track.id} className="bg-muted/30 rounded-lg p-1">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                      {track.trackNumber}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handlePlayTrack(track, item)}
                                      className="p-1 h-6 w-6"
                                    >
                                      {currentTrack?.id === track.id && isPlaying ? (
                                        <Pause className="h-3 w-3" />
                                      ) : (
                                        <Play className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <h5 className="font-medium">{track.title}</h5>
                                  </div>
                                  {track.description && (
                                    <HtmlDescription 
                                      content={track.description}
                                      className="text-sm text-muted-foreground mb-2"
                                    />
                                  )}
                                  {track.streamingLinks && (
                                    <StreamingLinks 
                                      links={track.streamingLinks}
                                      size="sm"
                                      className="mt-2 mb-2"
                                    />
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground ml-4">
                                  {track.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      
                    </div>

                   
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

       

       
      </div>
    </div>
  );
}