import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { HtmlDescription } from '../ui/html-description';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TimelineEvent } from '../../data/timeline-events';
import { releasesData } from '../../data/releases';
import { Calendar, Music, ExternalLink } from 'lucide-react';

interface ReleaseTimelineItemProps {
  event: TimelineEvent;
  onNavigate?: (page: string) => void;
}

export function ReleaseTimelineItem({ event, onNavigate }: ReleaseTimelineItemProps) {
  // Find the actual release data if releaseId is provided
  const release = event.releaseId ? releasesData.find(r => r.id === event.releaseId) : null;
  
  const formatDate = (dateString: string) => {
    const parts = dateString.split('-').map(Number);
    
    if (parts.length === 1) {
      // Year only
      return parts[0].toString();
    } else {
      // Full date
      const [year, month, day] = parts;
      const date = new Date(year, (month || 1) - 1, day || 1);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const displayImage = event.images?.[0] || release?.artwork;
  const displayTitle = event.title || release?.title || 'Unknown Release';
  const displayDescription = event.description || release?.description || '';

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Artwork */}
          {displayImage && (
            <div className="md:order-1">
              <div className="aspect-square">
                <ImageWithFallback
                  src={displayImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className={`p-6 ${!displayImage ? 'md:col-span-2' : 'md:order-2'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Music className="h-5 w-5 text-electric-pink" />
              <Badge variant="outline" className="text-xs">
                Release
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{displayTitle}</h3>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
              {release?.catalogNumber && (
                <>
                  <span>•</span>
                  <span>{release.catalogNumber}</span>
                </>
              )}
            </div>
            
            {displayDescription && (
              <HtmlDescription 
                content={displayDescription}
                className="text-muted-foreground mb-4 leading-relaxed"
              />
            )}

            {/* Format badges */}
            {release?.format && (
              <div className="flex flex-wrap gap-2 mb-4">
                {release.format.map((format) => (
                  <Badge key={format} variant="secondary" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {release && onNavigate && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="border border-electric-pink/50 bg-background text-foreground hover:bg-electric-pink/10 hover:text-electric-pink hover:border-electric-pink"
                  onClick={() => onNavigate(`releases#${release.id}`)}
                >
                  View Release Details
                </Button>
              )}
              
              {release?.streamingLinks?.spotify && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(release.streamingLinks?.spotify, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Listen
                </Button>
              )}
            </div>
            
            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.filter(tag => tag !== 'release').map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}