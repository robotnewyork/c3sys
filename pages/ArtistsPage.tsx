import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HtmlDescription } from '../components/ui/html-description';
import { Play } from 'lucide-react';

import { artistsData } from '../data/artists';
import { releasesData } from '../data/releases';

interface ArtistsPageProps {
  onNavigate: (page: string) => void;
}

export function ArtistsPage({ onNavigate }: ArtistsPageProps) {
  // Helper function to get releases for an artist
  const getArtistReleases = (artistId: string) => {
    return releasesData.filter(release => release.artistId === artistId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">C3.SYS Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the various artist names we release our music under. The individuals may be the same across projects, but each artist name is meant to evoke different ideas.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artistsData.map((artist) => {
            const artistReleases = getArtistReleases(artist.id);
            return (
            <Card 
              key={artist.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => onNavigate(`project/${artist.slug}`)}
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {artist.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">{artist.name}</h3>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {artist.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <HtmlDescription 
                  content={artist.bio}
                  className="text-muted-foreground text-sm leading-relaxed line-clamp-4 mb-4"
                />
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{artistReleases.length} Release{artistReleases.length !== 1 ? 's' : ''}</span>
                  <span>{artist.featuredTracks.length} Track{artist.featuredTracks.length !== 1 ? 's' : ''}</span>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-muted/50 to-muted/30">
            <h2 className="text-2xl md:text-3xl mb-4">Are You An Artist?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for new talent. If you create electronic music that aligns with our aesthetic, 
              we'd love to hear from you.
            </p>
            <Button size="lg" onClick={() => onNavigate('contact')}>
              Get In Touch
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}