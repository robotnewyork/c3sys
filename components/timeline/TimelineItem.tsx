import React from 'react';
import { TimelineEvent } from '../../data/timeline-events';
import { ReleaseTimelineItem } from './ReleaseTimelineItem';
import { MilestoneTimelineItem } from './MilestoneTimelineItem';
import { EventTimelineItem } from './EventTimelineItem';
import { EquipmentTimelineItem } from './EquipmentTimelineItem';
import { CollaborationTimelineItem } from './CollaborationTimelineItem';
import { LiveEventTimelineItem } from './LiveEventTimelineItem';

interface TimelineItemProps {
  event: TimelineEvent;
  onNavigate?: (page: string) => void;
}

export function TimelineItem({ event, onNavigate }: TimelineItemProps) {
  // Component factory pattern - render different components based on event type
  switch (event.type) {
    case 'release':
      return <ReleaseTimelineItem event={event} onNavigate={onNavigate} />;
    case 'milestone':
      return <MilestoneTimelineItem event={event} onNavigate={onNavigate} />;
    case 'venue':
      return <EventTimelineItem event={event} onNavigate={onNavigate} />;
    case 'equipment':
      return <EquipmentTimelineItem event={event} onNavigate={onNavigate} />;
    case 'collaboration':
      return <CollaborationTimelineItem event={event} onNavigate={onNavigate} />;
    case 'live-event':
      return <LiveEventTimelineItem event={event} onNavigate={onNavigate} />;
    default:
      return <MilestoneTimelineItem event={event} onNavigate={onNavigate} />;
  }
}