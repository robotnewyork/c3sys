import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { HtmlDescription } from '../ui/html-description';
import { ImageGallery } from './ImageGallery';
import { TimelineEvent } from '../../data/timeline-events';
import { Calendar, Cpu } from 'lucide-react';

interface EquipmentTimelineItemProps {
  event: TimelineEvent;
  onNavigate?: (page: string) => void;
}

export function EquipmentTimelineItem({ event }: EquipmentTimelineItemProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          {event.images && event.images.length > 0 && (
            <div className="md:order-1">
              <ImageGallery
                images={event.images}
                alt={event.title}
                className="aspect-video md:aspect-square"
              />
            </div>
          )}
          
          {/* Content */}
          <div className={`p-6 ${!event.images?.length ? 'md:col-span-2' : 'md:order-2'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-5 w-5 text-neon-purple" />
              <Badge variant="outline" className="text-xs">
                Equipment
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <HtmlDescription 
              content={event.description}
              className="text-muted-foreground mb-4 leading-relaxed"
            />
            
            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
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