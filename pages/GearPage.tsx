import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ExternalLink, Cpu, Monitor, Check, X, Play, Pause, ChevronDown, ChevronRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

import { gearData } from '../data/gear';
import { releasesData } from '../data/releases';
import { tracksData } from '../data/tracks';
import { backCatalogData } from '../data/back-catalog';

interface GearPageProps {
  onNavigate?: (page: string) => void;
}

const statuses = ['Current', 'Historical'];
const gearTypes = [...new Set(gearData.map(gear => gear.type))].sort();
const categories = [...new Set(gearData.map(gear => gear.category))].sort();

export function GearPage({ onNavigate }: GearPageProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(gearTypes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [expandedDemoTracks, setExpandedDemoTracks] = useState<Set<string>>(new Set());
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setPlaylist } = useAudio();

  const filteredGear = gearData
    .filter(gear => {
      return selectedStatuses.includes(gear.current ? 'Current' : 'Historical') &&
        selectedTypes.includes(gear.type) &&
        selectedCategories.includes(gear.category);
    })
    .sort((a, b) => {
      // Sort by current status first (current gear before historical)
      if (a.current !== b.current) {
        return b.current ? 1 : -1; // current (true) comes first
      }
      // Then sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  const hasActiveFilters = selectedStatuses.length !== statuses.length ||
    selectedTypes.length !== gearTypes.length || selectedCategories.length !== categories.length;

  const resetFilters = () => {
    setSelectedStatuses(statuses);
    setSelectedTypes(gearTypes);
    setSelectedCategories(categories);
  };

  const toggleFilter = (value: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelected(selected => selected.includes(value)
      ? selected.filter(option => option !== value)
      : [...selected, value]);
  };

  const filterGroups = [
    { label: 'Status', options: statuses, selected: selectedStatuses, setSelected: setSelectedStatuses },
    { label: 'Type', options: gearTypes, selected: selectedTypes, setSelected: setSelectedTypes },
    { label: 'Categories', options: categories, selected: selectedCategories, setSelected: setSelectedCategories },
  ];

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
          <h1 className="text-4xl md:text-5xl mb-4">Gear List</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gear that has been used in our releases and recordings.
          </p>
        </div>

        {/* Filter Controls */}
        <section className="mb-8 border-y py-3" aria-labelledby="gear-filter-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="gear-filter-heading" className="sr-only">Filter Gear</h2>
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
                Showing {filteredGear.length} of {gearData.length} items
              </p>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                  Reset filters
                </Button>
              )}
              <Button
                variant={filtersOpen ? 'secondary' : 'ghost'}
                size="icon"
                className="relative h-11 w-11 shrink-0"
                onClick={() => setFiltersOpen(open => !open)}
                aria-label={`${filtersOpen ? 'Hide' : 'Show'} filters${hasActiveFilters ? ' (filters active)' : ''}`}
                aria-expanded={filtersOpen}
                aria-controls="gear-filter-options"
                title={filtersOpen ? 'Hide filters' : 'Show filters'}
              >
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                {hasActiveFilters && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
              </Button>
            </div>
          </div>
          <div
            id="gear-filter-options"
            hidden={!filtersOpen}
            className={filtersOpen ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5' : 'hidden'}
          >
            {filterGroups.map(group => (
              <fieldset key={group.label} className={group.label === 'Categories' ? 'min-w-0 sm:col-span-2' : 'min-w-0'}>
                <legend className="text-sm font-medium mb-2">{group.label}</legend>
                {group.label === 'Categories' && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategories(categories)}
                      disabled={selectedCategories.length === categories.length}
                    >
                      <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                      Select all
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategories([])}
                      disabled={selectedCategories.length === 0}
                    >
                      <X className="h-4 w-4 mr-2" aria-hidden="true" />
                      Select none
                    </Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {group.options.map(option => (
                    <label key={option} className="flex items-center gap-2 min-h-[44px] max-w-full cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={group.selected.includes(option)}
                        onChange={() => toggleFilter(option, group.setSelected)}
                        className="h-4 w-4 shrink-0 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      />
                      <span className="break-words min-w-0">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>

       

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
                              const unreleasedTracks = tracksData.filter(track => track.releaseId === null && track.audioUrl);
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
                              {track.audioUrl && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-4 w-4 hover:bg-transparent group"
                                  onClick={(event) => {
                                    event.stopPropagation();
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
                              )}
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
            <p className="text-muted-foreground text-lg mb-4">No gear matches the selected filters.</p>
            <Button variant="outline" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Reset filters
            </Button>
          </div>
        )}

       
      </div>
    </div>
  );
}