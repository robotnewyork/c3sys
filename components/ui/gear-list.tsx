import React, { useState } from 'react';
import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Wrench, ChevronDown, ChevronRight, Guitar, Mic, Keyboard, Speaker, Monitor, Grid, ListMusic, Waves, Radio, Disc, Music, Plug, Scissors, Sliders } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { gearData } from '../../data/gear';

const categoryIcons: Record<string, LucideIcon> = {
  DAW: Monitor,
  'Digital Audio Workstation': Monitor,
  Synthesizer: Keyboard,
  'Software Synthesizer': Keyboard,
  'Virtual Instrument Platform': Music,
  'Virtual Instrument': Music,
  Groovebox: Grid,
  Sequencer: ListMusic,
  Pedal: Sliders,
  'Guitar Pedal': Sliders,
  Sampler: Disc,
  Microphone: Mic,
  Preamp: Radio,
  Organ: Keyboard,
  Speaker: Speaker,
  Guitar: Guitar,
  'Bass Guitar': Guitar,
  'Electric Guitar': Guitar,
  'Guitar Amplifier': Speaker,
  Reverb: Waves,
  'MIDI Controller': Keyboard,
  'Drum Machine': Grid,
  'Software Drum Machine': Grid,
  'Software Drum Library': Grid,
  'Software Multi-Effect': Sliders,
  'Audio Editing': Scissors,
  Mastering: Sliders,
  'Audio Interface': Plug,
  FX: Sliders,
};

interface GearListProps {
  gearIds: string[];
  onNavigate?: (page: string) => void;
  className?: string;
  showTitle?: boolean;
  defaultOpen?: boolean;
}

export const GearList: React.FC<GearListProps> = ({ 
  gearIds, 
  onNavigate, 
  className = '', 
  showTitle = true,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  if (!gearIds || gearIds.length === 0) {
    return null;
  }

  const gearItems = gearIds
    .map(id => gearData.find(gear => gear.id === id))
    .filter((gear): gear is NonNullable<typeof gear> => gear !== undefined);

  if (gearItems.length === 0) {
    return null;
  }

  const handleGearClick = (gearId: string) => {
    if (onNavigate) {
      // Navigate to gear page with hash to scroll to specific gear item
      onNavigate(`gear#${gearId}`);
    }
  };

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {showTitle && (
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 p-0 h-auto font-medium text-sm hover:bg-transparent"
            >
              <Wrench className="h-4 w-4" />
              <span>Gear Used</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        )}
        <CollapsibleContent className="mt-3 gear-list-no-border">
          <div className="flex flex-wrap gap-2">
            {gearItems.map((gear) => {
              const CategoryIcon = categoryIcons[gear.category] ?? Wrench;

              return (
                <Tooltip key={gear.id}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleGearClick(gear.id)}
                      aria-label={`${gear.name} (${gear.category})`}
                      className="inline-flex max-w-full items-center gap-2 p-2 rounded-lg border border-border/50 hover:border-border transition-colors bg-muted cursor-pointer hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CategoryIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="min-w-0 break-words text-left text-sm font-medium">{gear.name}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{gear.category}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GearList;