import React, { useState } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Wrench, ChevronDown, ChevronRight } from 'lucide-react';
import { gearData } from '../../data/gear';

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
          <div className="space-y-2">
            {gearItems.map((gear) => (
              <div 
                key={gear.id}
                onClick={() => handleGearClick(gear.id)}
                className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:border-border transition-colors bg-muted cursor-pointer hover:bg-accent/50"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium">{gear.name}</div>
                    <div className="text-xs text-muted-foreground">{gear.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {gear.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GearList;