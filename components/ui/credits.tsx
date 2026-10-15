import React from 'react';
import { Users } from 'lucide-react';

interface Credit {
  name: string;
  role: string;
}

interface CreditsProps {
  credits: Credit[];
  className?: string;
  showTitle?: boolean;
}

export const Credits: React.FC<CreditsProps> = ({ 
  credits, 
  className = '', 
  showTitle = true 
}) => {
  if (!credits || credits.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {showTitle && (
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4" />
          <h4 className="text-sm font-medium">Credits</h4>
        </div>
      )}
      <div className="space-y-1">
        {credits.map((credit, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium">{credit.name}</span>
            <span className="text-muted-foreground">{credit.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;