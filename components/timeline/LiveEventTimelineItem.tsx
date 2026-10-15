import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { HtmlDescription } from '../ui/html-description';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TrackList } from '../TrackList';
import { TimelineEvent } from '../../data/timeline-events';
import { tracksData } from '../../data/tracks';
import { Calendar, Music2, MapPin } from 'lucide-react';

interface LiveEventTimelineItemProps {
  event: TimelineEvent;
  onNavigate?: (page: string) => void;
}

export function LiveEventTimelineItem({ event, onNavigate }: LiveEventTimelineItemProps) {
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

  // Get tracks for this live event
  const eventTracks = event.tracks ? 
    tracksData.filter(track => event.tracks!.includes(track.id)) : [];

  const displayImage = event.images?.[0];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          {displayImage && (
            <div className="md:order-1">
              <div className="aspect-square">
                <ImageWithFallback
                  src={displayImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className={`p-6 ${!displayImage ? 'md:col-span-2' : 'md:order-2'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Music2 className="h-5 w-5 text-electric-pink" />
              <Badge variant="outline" className="text-xs">
                Live Event
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
              {event.venue && (
                <>
                  <span>•</span>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.venue}</span>
                </>
              )}
              {event.location && (
                <>
                  <span>•</span>
                  <span>{event.location}</span>
                </>
              )}
            </div>
            
            {event.description && (
              <HtmlDescription 
                content={event.description}
                className="text-muted-foreground mb-4 leading-relaxed"
              />
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tracks Section */}
        {eventTracks.length > 0 && (
          <div className="border-t bg-muted/30 p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Music2 className="h-5 w-5 text-electric-pink" />
              Setlist ({eventTracks.length} tracks)
            </h4>
            <TrackList tracks={eventTracks} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}