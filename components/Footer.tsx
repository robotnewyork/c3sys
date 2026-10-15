import React from 'react';
import { Music, Mail, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-6 w-6" />
              <span className="font-bold text-lg">C3.SYS</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Catalog of musical collaborations spanning multiple genres
            </p>
            <div className="flex space-x-2 hidden">
              <Button variant="outline" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="space-y-2 text-sm">
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('artists')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('releases')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Releases
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('blog')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('back-catalog')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back Catalog
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('gear')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gear
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('timeline')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Timeline
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="space-y-2 text-sm">
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('about')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </button>
              </div>
              <div>
                <button 
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 C3.SYS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}