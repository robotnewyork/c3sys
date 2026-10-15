import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TrackList } from '../components/TrackList';
import { HtmlDescription } from '../components/ui/html-description';
import { Play } from 'lucide-react';

import { artistsData } from '../data/artists';
import { releasesData } from '../data/releases';
import { tracksData } from '../data/tracks';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredArtists = artistsData.filter(artist => artist.featured);
  // Sort releases by date (newest first), then take featured ones, limit to 3
  const featuredReleases = releasesData
    .filter(release => release.featured)
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 3);
  const featuredTracks = tracksData.filter(track => track.featured).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-black">
        {/* Background Image with Fade-in Animation */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
          style={{
            backgroundImage: 'url(/images/studio3.jpg)',
            animation: 'fadeIn 5s ease-in-out'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
        
        {/* Content */}
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl mb-6 font-bold text-white bg-clip-text">
              C3.SYS
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Making music driven by passion, not profit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="neon"
                size="lg" 
                onClick={() => onNavigate('releases')} 
                className="btn-hero relative z-10"
              >
                Latest Releases
              </Button>
              <Button 
                variant="neon"
                size="lg" 
                onClick={() => onNavigate('projects')} 
                className="btn-hero relative z-10"
              >
                C3.SYS Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each project explores different sonic territories and musical genres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card 
                key={artist.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate(`project/${artist.slug}`)}
              >
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-xl min-w-0 break-words">{artist.name}</h3>
                    {artist.instagram && (
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${artist.name} on Instagram (opens in a new tab)`}
                        title={`${artist.name} on Instagram`}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <img src="/images/instagram.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {artist.genres.slice(0, 2).map((genre) => (
                      <span key={genre} className="text-xs bg-muted px-2 py-1 rounded">
                        {genre}
                      </span>
                    ))}
                  </div>
                  <HtmlDescription 
                    content={artist.bio}
                    className="text-muted-foreground text-sm line-clamp-3"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Releases */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Recent Releases</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The latest sounds from our catalog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredReleases.map((release) => (
              <Card 
                key={release.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate(`releases#${release.id}`)}
              >
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={release.artwork}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-1">{release.title}</h3>
                  <p className="text-muted-foreground mb-2">{release.artist}</p>
                  <p className="text-sm text-muted-foreground mb-3">{release.catalogNumber} • {release.releaseDate}</p>
                  <div className="flex flex-wrap gap-1">
                    {release.format.map((format) => (
                      <span key={format} className="text-xs bg-muted px-2 py-1 rounded">
                        {format}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Tracks */}
          <div className="max-w-4xl mx-auto">
            <TrackList tracks={featuredTracks} title="Featured Tracks" />
          </div>
        </div>
      </section>

     
    </div>
  );
}