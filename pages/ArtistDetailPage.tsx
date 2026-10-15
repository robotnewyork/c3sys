import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TrackList } from '../components/TrackList';
import { HtmlDescription } from '../components/ui/html-description';
import { GearList } from '../components/ui/gear-list';
import { Credits } from '../components/ui/credits';
import { ArrowLeft, ExternalLink } from 'lucide-react';

import { artistsData } from '../data/artists';
import { releasesData } from '../data/releases';
import { tracksData } from '../data/tracks';

interface ArtistDetailPageProps {
  artistSlug: string;
  onNavigate: (page: string) => void;
}

export function ArtistDetailPage({ artistSlug, onNavigate }: ArtistDetailPageProps) {
  const artist = artistsData.find(a => a.slug === artistSlug);
  
  if (!artist) {
    return (
      <div className="min-h-screen py-8">
        <div className="container px-4 text-center">
          <h1 className="text-2xl mb-4">Artist Not Found</h1>
          <Button onClick={() => onNavigate('artists')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Button>
        </div>
      </div>
    );
  }

  const artistReleases = releasesData.filter(release => 
    release.artistId === artist.id
  ).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const artistTracks = tracksData.filter(track => 
    track.artistId === artist.id
  );

  const featuredTracks = artistTracks.filter(track => 
    artist.featuredTracks.includes(track.id)
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => onNavigate('artists')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        {/* Artist Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="aspect-square relative mb-6">
              <ImageWithFallback
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {artist.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">Featured Artist</Badge>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl mb-4">{artist.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {artist.instagram && (
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${artist.name} on Instagram (opens in a new tab)`}
                className="mb-6 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <img src="/images/instagram.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                Instagram
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            <HtmlDescription 
              content={artist.bio}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl">{artistReleases.length}</div>
                <div className="text-sm text-muted-foreground">Releases</div>
              </div>
              <div>
                <div className="text-2xl">{artistTracks.length}</div>
                <div className="text-sm text-muted-foreground">Tracks</div>
              </div>
              <div>
                <div className="text-2xl">{artist.genres.length}</div>
                <div className="text-sm text-muted-foreground">Genres</div>
              </div>
              <div>
                <div className="text-2xl">{featuredTracks.length}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tracks */}
        {featuredTracks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl mb-6">Featured Tracks</h2>
            <TrackList tracks={featuredTracks} showArtist={false} />
          </div>
        )}

        {/* Releases */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl mb-6">Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistReleases.map((release) => {
              const releaseTracks = tracksData.filter(track => 
                track.releaseId === release.id
              );

              return (
                <Card 
                  key={release.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate(`releases#${release.id}`)}
                >
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={release.artwork}
                      alt={release.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg mb-2">{release.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {release.catalogNumber} • {new Date(release.releaseDate).getFullYear()}
                    </p>
                    <HtmlDescription 
                      content={release.description}
                      className="text-sm text-muted-foreground mb-4 line-clamp-3"
                    />
                    <div className="flex flex-wrap gap-1 mb-4">
                      {release.format.map((format) => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    {/* Credits */}
                    {release.credits && release.credits.length > 0 && (
                      <Credits 
                        credits={release.credits}
                        className="mb-3"
                        showTitle={false}
                      />
                    )}
                    {/* Gear Used */}
                    {release.gear && release.gear.length > 0 && (
                      <GearList 
                        gearIds={release.gear}
                        onNavigate={onNavigate}
                        className="mb-3"
                        showTitle={false}
                      />
                    )}
                    <div className="text-sm text-muted-foreground">
                      {releaseTracks.length} track{releaseTracks.length !== 1 ? 's' : ''}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All Tracks */}
        <div>
          <h2 className="text-2xl md:text-3xl mb-6">All Tracks</h2>
          <TrackList tracks={artistTracks} showArtist={false} showTrackNumber={false} />
        </div>
      </div>
    </div>
  );
}