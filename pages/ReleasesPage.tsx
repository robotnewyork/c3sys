import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TrackList } from '../components/TrackList';
import { HtmlDescription } from '../components/ui/html-description';
import { GearList } from '../components/ui/gear-list';
import { Credits } from '../components/ui/credits';
import { StreamingLinks } from '../components/ui/streaming-links';
import { Calendar, Disc, Music } from 'lucide-react';

import { releasesData } from '../data/releases';
import { tracksData } from '../data/tracks';

interface ReleasesPageProps {
  onNavigate: (page: string) => void;
}

export function ReleasesPage({ onNavigate }: ReleasesPageProps) {
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterFormat, setFilterFormat] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');

  const allFormats = [...new Set(releasesData.flatMap(release => release.format))];
  const allGenres = [...new Set(releasesData.flatMap(release => release.genre))]
    .sort((first, second) => first.localeCompare(second));

  const filteredAndSortedReleases = useMemo(() => {
    let filtered = releasesData;

    // Filter by format
    if (filterFormat !== 'all') {
      filtered = filtered.filter(release => (release.format as string[]).includes(filterFormat));
    }

    // Filter by genre
    if (filterGenre !== 'all') {
      filtered = filtered.filter(release => release.genre.includes(filterGenre));
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'date-asc':
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'artist-asc':
          return a.artist.localeCompare(b.artist);
        case 'artist-desc':
          return b.artist.localeCompare(a.artist);
        default:
          return 0;
      }
    });
  }, [sortBy, filterFormat, filterGenre]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Releases</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are the official releases from C3.SYS.
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
              <SelectItem value="artist-asc">Artist A-Z</SelectItem>
              <SelectItem value="artist-desc">Artist Z-A</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterGenre} onValueChange={setFilterGenre}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1 text-right">
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedReleases.length} release{filteredAndSortedReleases.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Releases Grid */}
        <div className="space-y-12">
          {filteredAndSortedReleases.map((release) => {
            const releaseTracks = tracksData.filter(track => 
              track.releaseId === release.id
            );

            return (
              <Card key={release.id} id={release.id} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                  {/* Artwork */}
                  <div className="lg:col-span-1">
                    <div className="aspect-square relative mb-4">
                      <ImageWithFallback
                        src={release.artwork}
                        alt={release.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Release Info */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl mb-2">{release.title}</h2>
                      <button 
                        onClick={() => onNavigate(`project/${release.artistId}`)}
                        className="text-lg text-muted-foreground mb-4 hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        {release.artist}
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(release.releaseDate)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Disc className="h-4 w-4" />
                          {release.catalogNumber}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Music className="h-4 w-4" />
                          {releaseTracks.length} track{releaseTracks.length !== 1 ? 's' : ''}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {release.genre.map((genre) => (
                          <Badge key={genre} variant="secondary">{genre}</Badge>
                        ))}
                        {release.format.map((format) => (
                          <Badge key={format} variant="outline">
                            {format}
                          </Badge>
                        ))}
                      </div>

                      <HtmlDescription 
                        content={release.description}
                        className="text-muted-foreground leading-relaxed mb-6"
                      />

                      {/* Credits */}
                      {release.credits && release.credits.length > 0 && (
                        <Credits 
                          credits={release.credits}
                          className="mb-6"
                        />
                      )}

                      {/* Gear Used */}
                      {release.gear && release.gear.length > 0 && (
                        <GearList 
                          gearIds={release.gear}
                          onNavigate={onNavigate}
                          className="mb-6"
                        />
                      )}

                      {/* Streaming Links */}
                      {release.streamingLinks && (
                        <StreamingLinks 
                          links={release.streamingLinks}
                        />
                      )}
                    </div>

                    {/* Track List */}
                    {releaseTracks.length > 0 && (
                      <div>
                        <h3 className="text-lg mb-4">Tracks</h3>
                        <TrackList tracks={releaseTracks} showArtist={false} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredAndSortedReleases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No releases found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSortBy('date-desc');
                setFilterFormat('all');
                setFilterGenre('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}