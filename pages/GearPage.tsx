import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ExternalLink, Cpu, Monitor, Check, X, Play, Pause, ChevronDown, ChevronRight } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

import { gearData } from '../data/gear';
import { releasesData } from '../data/releases';
import { tracksData } from '../data/tracks';
import { backCatalogData } from '../data/back-catalog';

interface GearPageProps {
  onNavigate?: (page: string) => void;
}

export function GearPage({ onNavigate }: GearPageProps) {
  const [filter, setFilter] = useState('all');
  const [expandedDemoTracks, setExpandedDemoTracks] = useState<Set<string>>(new Set());
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setPlaylist } = useAudio();

  const filteredGear = gearData
    .filter(gear => {
      if (filter === 'all') return true;
      if (filter === 'current') return gear.current;
      if (filter === 'historical') return !gear.current;
      if (filter === 'hardware') return gear.type === 'Hardware';
      if (filter === 'software') return gear.type === 'Software';
      return true;
    })
    .sort((a, b) => {
      // Sort by current status first (current gear before historical)
      if (a.current !== b.current) {
        return b.current ? 1 : -1; // current (true) comes first
      }
      // Then sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  const categories = [...new Set(gearData.map(gear => gear.category))];

  const toggleDemoTracks = (gearId: string) => {
    const newExpanded = new Set(expandedDemoTracks);
    if (newExpanded.has(gearId)) {
      newExpanded.delete(gearId);
    } else {
      newExpanded.add(gearId);
    }
    setExpandedDemoTracks(newExpanded);
  };

  const getUsedOnReleases = (gearItem: any) => {
    // Search through releases data
    const releases = releasesData.filter(release => 
      release.gear && release.gear.includes(gearItem.id)
    );
    
    // Search through back catalog data
    const backCatalogReleases = backCatalogData.filter(item => 
      item.gear && item.gear.includes(gearItem.id)
    );
    
    // Combine both arrays and return
    return [...releases, ...backCatalogReleases];
  };

  const getReleasedTracks = (gearItem: any) => {
    return tracksData.filter(track => 
      track.gear && track.gear.includes(gearItem.id) && track.releaseId !== null
    );
  };

  const getUnreleasedTracks = (gearItem: any) => {
    return tracksData.filter(track => 
      track.gear && track.gear.includes(gearItem.id) && track.releaseId === null
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Studio Gear</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools and instruments that shape our sound. From vintage analog synthesizers to modern software plugins, 
            explore the gear behind our releases.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-lg font-medium mb-2">Filter Gear</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredGear.length} of {gearData.length} items
              {filter !== 'all' && (
                <span className="ml-1 text-primary font-medium">
                  ({filter === 'current' ? 'Currently Used' : 
                    filter === 'historical' ? 'Historical Items' : 
                    filter === 'hardware' ? 'Hardware Only' : 
                    filter === 'software' ? 'Software Only' : filter})
                </span>
              )}
            </p>
          </div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Gear
              </TabsTrigger>
              <TabsTrigger 
                value="current"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Current
              </TabsTrigger>
              <TabsTrigger 
                value="historical"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Historical
              </TabsTrigger>
              <TabsTrigger 
                value="hardware"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Hardware
              </TabsTrigger>
              <TabsTrigger 
                value="software"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Software
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

       

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGear.map((gear) => {
            const usedOnReleases = getUsedOnReleases(gear);
            
            return (
              <Card key={gear.id} id={gear.id} className="overflow-hidden scroll-mt-8">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={gear.image}
                    alt={gear.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={gear.current ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}>
                      {gear.current ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Current
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 mr-1" />
                          Historical
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={gear.type === 'Hardware' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'}>
                      {gear.type === 'Hardware' ? (
                        <Cpu className="h-3 w-3 mr-1" />
                      ) : (
                        <Monitor className="h-3 w-3 mr-1" />
                      )}
                      {gear.type}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{gear.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {gear.category}
                      </Badge>
                    </div>
                    {gear.url && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 pt-[0.4rem] h-auto hover:text-foreground transition-colors flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(gear.url, '_blank', 'noopener,noreferrer');
                        }}
                        title={`Visit ${gear.name} page`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {gear.description}
                  </p>

                  {usedOnReleases.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm mb-2">Used On:</h4>
                      <div className="space-y-1">
                        {usedOnReleases.map((release) => {
                          // Determine if this is a regular release or back catalog item
                          const isBackCatalog = !('catalogNumber' in release);
                          const targetPage = isBackCatalog ? 'back-catalog' : 'releases';
                          
                          return (
                            <button
                              key={release.id}
                              onClick={() => onNavigate && onNavigate(`${targetPage}#${release.id}`)}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left block w-full"
                            >
                              {release.title} ({new Date(release.releaseDate).getFullYear()})
                              {isBackCatalog && <span className="ml-1 text-xs opacity-70">(Back Catalog)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {getUnreleasedTracks(gear).length > 0 && (
                    <div className="mb-4">
                      <div 
                        className="flex items-center cursor-pointer hover:text-primary transition-colors mb-2"
                        onClick={() => toggleDemoTracks(gear.id)}
                      >
                        <h4 className="text-sm mr-2">Demo Tracks:</h4>
                        {expandedDemoTracks.has(gear.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                      {expandedDemoTracks.has(gear.id) && (
                        <div className="space-y-1">
                          {getUnreleasedTracks(gear).map((track) => {
                          const handlePlay = () => {
                            if (currentTrack?.id === track.id) {
                              togglePlayPause();
                            } else {
                              // Set playlist to all unreleased tracks and play the selected one
                              const unreleasedTracks = tracksData.filter(t => t.releaseId === null);
                              setPlaylist(unreleasedTracks);
                              playTrack(track);
                            }
                          };

                          return (
                            <div key={track.id} className="flex items-center justify-between h-4">
                              <span className="text-xs text-muted-foreground flex-grow">
                                {track.title}
                                <span className="ml-1 text-xs opacity-70">(Demo)</span>
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-4 w-4 hover:bg-transparent group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlay();
                                }}
                                title={currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play demo'}
                              >
                                {currentTrack?.id === track.id && isPlaying ? (
                                  <Pause className="h-4 w-4 group-hover:text-primary transition-colors" />
                                ) : (
                                  <Play className="h-4 w-4 group-hover:text-primary transition-colors" />
                                )}
                              </Button>
                            </div>
                          );
                        })}
                        </div>
                      )}
                    </div>
                  )}

                  
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredGear.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No gear found for the selected filter.</p>
          </div>
        )}

       
      </div>
    </div>
  );
}