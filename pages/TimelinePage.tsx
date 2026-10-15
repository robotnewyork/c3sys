import React from 'react';
import { TimelineItem } from '../components/timeline/TimelineItem';
import { Music } from 'lucide-react';

import { releasesData } from '../data/releases';
import { timelineEvents, TimelineEvent } from '../data/timeline-events';

interface TimelinePageProps {
  onNavigate?: (page: string) => void;
}

export function TimelinePage({ onNavigate }: TimelinePageProps = {}) {
  // Convert releases to timeline events for backward compatibility
  const releaseEvents: TimelineEvent[] = releasesData.map(release => ({
    id: `release-${release.id}`,
    date: release.releaseDate,
    type: 'release' as const,
    title: release.title,
    description: release.description || '',
    images: release.artwork ? [release.artwork] : undefined,
    releaseId: release.id,
    artistId: release.artistId,
    tags: ['release', ...release.genre]
  }));

  // Combine timeline events with release events
  const allEvents = [...timelineEvents, ...releaseEvents];

  // Sort all events by date (most recent first)
  const sortedEvents = allEvents.sort((a, b) => {
    // Parse date strings properly to avoid timezone issues
    // Handle both YYYY-MM-DD and YYYY formats
    const parseEventDate = (dateString: string) => {
      const parts = dateString.split('-').map(Number);
      if (parts.length === 1) {
        // Year only - use December 31st for sorting (end of year)
        return new Date(parts[0], 11, 31);
      } else {
        // Full date
        return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
      }
    };
    
    const dateA = parseEventDate(a.date);
    const dateB = parseEventDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Group events by year
  const eventsByYear = sortedEvents.reduce((acc, event) => {
    // Parse date string properly to avoid timezone issues
    const [year] = event.date.split('-').map(Number);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<number, TimelineEvent[]>);

  const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Timeline</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Journey through the history of C3.SYS, from milestones and events to our latest releases.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {years.map((year) => (
            <div key={year} className="mb-12">
              {/* Year Header */}
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {year}
                </div>
                <div className="flex-1 h-px bg-border ml-6"></div>
                <div className="ml-6 text-sm text-muted-foreground">
                  {eventsByYear[year].length} event{eventsByYear[year].length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Events for this year */}
              <div className="ml-26 space-y-8">
                {eventsByYear[year].map((event, eventIndex) => (
                  <div key={event.id} className="relative">
                    {/* Timeline connector */}
                    {eventIndex < eventsByYear[year].length - 1 && (
                      <div className="absolute left-4 top-8 w-px h-full bg-border"></div>
                    )}

                    <div className="ml-8">
                      <TimelineItem event={event} onNavigate={onNavigate} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}