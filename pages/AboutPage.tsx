import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Music, Heart, Waves, Zap, Users, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: <Music className="h-8 w-8" />,
      title: "Artistic Integrity",
      description: "We prioritize genuine artistic expression over commercial trends, supporting music that pushes boundaries and explores new territories."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community First",
      description: "Our artists are family. We believe in nurturing long-term relationships and supporting our community both musically and personally."
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Sonic Exploration",
      description: "From ambient soundscapes to driving techno, we celebrate the full spectrum of electronic music and encourage experimentation."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Perspective",
      description: "Music transcends borders. We work with artists from around the world, embracing diverse influences and cultural perspectives."
    }
  ];

  const stats = [
    { number: "2023", label: "Founded" },
    { number: "12+", label: "Releases" },
    { number: "8+", label: "Artists" },
    { number: "∞", label: "Possibilities" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h1 className="text-4xl md:text-6xl">About C3.SYS</h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            C3.SYS was founded in 2022 in Metro Detroit as an independent music label dedicated to creating music that 
            defies genre definitions and focuses on artistic expression and experimentation.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                C3.SYS Records was evolved from the defunkt C2.SYS, as a new outlet for Chad Wilson and collaborators. Our objective is to create the music that we want to hear, without regard for marketability or pleasing critics.
              </p>
              
            </div>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The goal of all of our various projects is to create unique music that defies convention and prioritizes personal expression.
                </p>
              </CardContent>
            </Card>
           
          </div>
        </div>

        

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl text-center mb-12">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="aspect-square relative mb-6 rounded-full overflow-hidden mx-auto w-32 h-32">
                <ImageWithFallback
                  src="/images/team/chad.jpg"
                  alt="Chad Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-2">Chad Wilson</h3>
              <Badge variant="secondary" className="mb-3">Keys / Production / Mixing</Badge>
              <p className="text-muted-foreground text-sm">
                
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="aspect-square relative mb-6 rounded-full overflow-hidden mx-auto w-32 h-32">
                <ImageWithFallback
                  src=""
                  alt="Sarah Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-2">Sarah Wilson</h3>
              <Badge variant="secondary" className="mb-3">Vocals / Piano</Badge>
              <p className="text-muted-foreground text-sm">
                
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="aspect-square relative mb-6 rounded-full overflow-hidden mx-auto w-32 h-32">
                <ImageWithFallback
                  src="/images/team/lee.jpg"
                  alt="Lee Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-2">Lee Wilson</h3>
              <Badge variant="secondary" className="mb-3">Guitar</Badge>
              <p className="text-muted-foreground text-sm">
                
              </p>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="p-8 gradient-metal shadow-brutal border-neon-cyan/50">
            <h2 className="text-2xl md:text-3xl mb-4">Want to Collab?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're interested in working on a project together or chat about music, feel free to send me a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('contact')}>
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('artists')}>
                See Our Projects
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}