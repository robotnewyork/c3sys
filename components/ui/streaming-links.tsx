import React from 'react';
import { Button } from './button';
import { ExternalLink } from 'lucide-react';

interface StreamingLinksProps {
  links?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
  };
  className?: string;
  size?: 'sm' | 'default';
}

export function StreamingLinks({ links, className = "", size = 'default' }: StreamingLinksProps) {
  if (!links || Object.keys(links).length === 0) {
    return null;
  }

  const buttonSize = size === 'sm' ? 'sm' : 'sm';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const gapSize = size === 'sm' ? 'gap-1' : 'gap-2';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.spotify && (
        <Button
          variant="ghost"
          size={buttonSize}
          asChild
          className={`flex items-center ${gapSize} text-green-600 border border-green-600 bg-white hover:bg-green-50 hover:text-green-700 rounded-md`}
        >
          <a href={links.spotify} target="_blank" rel="noopener noreferrer">
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
        </Button>
      )}
      
      {links.appleMusic && (
        <Button
          variant="ghost"
          size={buttonSize}
          asChild
          className={`flex items-center ${gapSize} text-gray-800 border border-gray-800 bg-white hover:bg-gray-50 hover:text-gray-900 rounded-md`}
        >
          <a href={links.appleMusic} target="_blank" rel="noopener noreferrer">
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.001-.083-.005-.124-.005H5.988c-.041 0-.084.004-.124.005-.525.015-1.046.057-1.563.15-.674.121-1.304.353-1.88.727-1.118.733-1.863 1.732-2.18 3.043-.175.72-.24 1.452-.24 2.19v11.752c0 .738.065 1.47.24 2.19.317 1.31 1.062 2.31 2.18 3.043.576.374 1.206.606 1.88.727.517.093 1.038.135 1.563.15.04.001.083.005.124.005h12.124c.041 0 .084-.004.124-.005.526-.015 1.047-.057 1.564-.15.673-.121 1.303-.353 1.877-.727 1.118-.732 1.863-1.732 2.18-3.043.175-.72.24-1.452.24-2.19V6.124zM18.601 16.025c-.293.406-.804.541-1.169.31-1.765-1.089-3.982-1.314-6.596-.721-.26.059-.464-.134-.562-.31-.098-.261.089-.464.349-.562 2.908-.659 5.394-.378 7.287.835.261.134.359.464.225.825-.045.089-.134.178-.223.223-.089.045-.178.045-.311-.3zm1.473-3.267c-.359.538-.895.717-1.294.358-2.025-1.249-5.109-1.607-7.287-.896-.314.089-.627-.089-.716-.403-.089-.314.089-.627.403-.716 2.491-.806 5.934-.403 8.248 1.025.359.179.448.627.268.986-.089.179-.268.357-.447.357-.179 0-.268-.089-.375-.711zm.134-3.401c-2.402-1.428-6.37-1.559-8.661-.862-.403.134-.806-.089-.941-.492-.134-.403.089-.806.492-.941 2.624-.806 7.02-.649 9.78.985.358.179.537.626.358.985-.179.358-.626.537-.985.358-.045-.045-.089-.045-.043-.033z"/>
            </svg>
            Apple Music
          </a>
        </Button>
      )}
      
      {links.youtube && (
        <Button
          variant="ghost"
          size={buttonSize}
          asChild
          className={`flex items-center ${gapSize} text-red-600 border border-red-600 bg-white hover:bg-red-50 hover:text-red-700 rounded-md`}
        >
          <a href={links.youtube} target="_blank" rel="noopener noreferrer">
            <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </Button>
      )}
    </div>
  );
}