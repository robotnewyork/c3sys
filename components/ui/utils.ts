import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { artistsData } from '../../data/artists';
import { releasesData } from '../../data/releases';
import { getArticleBySlug } from '../../data/articles';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export const updatePageMetadata = (metadata: PageMetadata) => {
  // Update title
  document.title = metadata.title;
  
  // Update or create meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', metadata.description);
  } else {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    descriptionMeta.setAttribute('content', metadata.description);
    document.head.appendChild(descriptionMeta);
  }
  
  // Update or create meta keywords
  if (metadata.keywords && metadata.keywords.length > 0) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', metadata.keywords.join(', '));
    } else {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      keywordsMeta.setAttribute('content', metadata.keywords.join(', '));
      document.head.appendChild(keywordsMeta);
    }
  }
  
  // Update Open Graph tags
  updateOpenGraphTag('og:title', metadata.title);
  updateOpenGraphTag('og:description', metadata.description);
  updateOpenGraphTag('og:type', 'website');
  
  if (metadata.ogImage) {
    updateOpenGraphTag('og:image', `${window.location.origin}${metadata.ogImage}`);
  }
  
  // Update canonical URL
  if (metadata.canonicalUrl) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', metadata.canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', metadata.canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
  }
  
  // Update Twitter Card tags
  updateOpenGraphTag('twitter:card', 'summary_large_image');
  updateOpenGraphTag('twitter:title', metadata.title);
  updateOpenGraphTag('twitter:description', metadata.description);
  
  if (metadata.ogImage) {
    updateOpenGraphTag('twitter:image', `${window.location.origin}${metadata.ogImage}`);
  }
};

const updateOpenGraphTag = (property: string, content: string) => {
  let ogTag = document.querySelector(`meta[property="${property}"]`);
  if (ogTag) {
    ogTag.setAttribute('content', content);
  } else {
    ogTag = document.createElement('meta');
    ogTag.setAttribute('property', property);
    ogTag.setAttribute('content', content);
    document.head.appendChild(ogTag);
  }
};

// Generate metadata for different pages
export const getPageMetadata = (page: string): PageMetadata => {
  const baseUrl = window.location.origin;
  
  // Handle project detail pages
  if (page.startsWith('project/')) {
    const projectSlug = page.replace('project/', '');
    const project = artistsData.find(artist => artist.slug === projectSlug);
    
    if (project) {
      return {
        title: `${project.name} | C3.SYS`,
        description: project.bio.length > 160 ? project.bio.substring(0, 157) + '...' : project.bio,
        keywords: ['C3.SYS', 'music', 'Detroit', project.name, ...project.genres],
        ogImage: project.image,
        canonicalUrl: `${baseUrl}/project/${projectSlug}`
      };
    }
  }
  
  // Handle legacy artist URLs (redirect to projects)
  if (page.startsWith('artist/')) {
    const projectSlug = page.replace('artist/', '');
    const project = artistsData.find(artist => artist.slug === projectSlug);
    
    if (project) {
      return {
        title: `${project.name} | C3.SYS`,
        description: project.bio.length > 160 ? project.bio.substring(0, 157) + '...' : project.bio,
        keywords: ['C3.SYS', 'music', 'Detroit', project.name, ...project.genres],
        ogImage: project.image,
        canonicalUrl: `${baseUrl}/project/${projectSlug}` // Canonical points to new URL
      };
    }
  }

  // Handle article detail pages
  if (page.startsWith('article/')) {
    const articleSlug = page.replace('article/', '');
    const article = getArticleBySlug(articleSlug);
    
    if (article) {
      return {
        title: `${article.title} | C3.SYS`,
        description: article.description,
        keywords: ['C3.SYS', 'blog', 'article', 'music', 'Detroit', ...(article.tags || [])],
        canonicalUrl: `${baseUrl}/article/${articleSlug}`
      };
    }
  }
  
  switch (page) {
    case 'home':
      return {
        title: 'C3.SYS | Metro Detroit Music Label',
        description: 'Metro Detroit music label breaking down boundaries between genres. Discover innovative electronic, rock, and experimental music from emerging artists.',
        keywords: ['C3.SYS', 'music label', 'Detroit', 'electronic music', 'rock music', 'experimental music', 'independent music'],
        canonicalUrl: baseUrl
      };
      
    case 'projects':
      return {
        title: 'Projects | C3.SYS',
        description: 'Explore the diverse musical projects on C3.SYS, featuring electronic, rock, and experimental artists from Metro Detroit.',
        keywords: ['C3.SYS', 'music projects', 'Detroit artists', 'electronic music', 'rock music', 'experimental music'],
        canonicalUrl: `${baseUrl}/projects`
      };
      
    case 'releases':
      return {
        title: 'Releases | C3.SYS',
        description: 'Browse the complete catalog of releases from C3.SYS, featuring innovative music across electronic, rock, and experimental genres.',
        keywords: ['C3.SYS', 'music releases', 'albums', 'singles', 'Detroit music', 'electronic music', 'rock music'],
        canonicalUrl: `${baseUrl}/releases`
      };
      
    case 'gear':
      return {
        title: 'Gear | C3.SYS',
        description: 'Explore the vintage and modern music equipment used by C3.SYS artists to create their unique sound.',
        keywords: ['C3.SYS', 'music gear', 'synthesizers', 'vintage equipment', 'music production', 'studio equipment'],
        canonicalUrl: `${baseUrl}/gear`
      };
      
    case 'timeline':
      return {
        title: 'Timeline | C3.SYS',
        description: 'Follow the complete timeline of C3.SYS releases, from the earliest recordings to the latest projects.',
        keywords: ['C3.SYS', 'music timeline', 'release history', 'Detroit music', 'discography'],
        canonicalUrl: `${baseUrl}/timeline`
      };
      
    case 'back-catalog':
      return {
        title: 'Back Catalog | C3.SYS',
        description: 'Discover the deep back catalog of C3.SYS, featuring rare recordings and early works from our artists.',
        keywords: ['C3.SYS', 'back catalog', 'rare recordings', 'early works', 'Detroit music history'],
        canonicalUrl: `${baseUrl}/back-catalog`
      };
      
    case 'blog':
      return {
        title: 'Blog | C3.SYS',
        description: 'Insights, stories, and thoughts from the C3.SYS collective – exploring music, creativity, and the art of breaking boundaries.',
        keywords: ['C3.SYS', 'blog', 'articles', 'music', 'Detroit', 'creativity', 'insights'],
        canonicalUrl: `${baseUrl}/blog`
      };
      
    case 'about':
      return {
        title: 'About | C3.SYS',
        description: 'Learn about C3.SYS, a Metro Detroit music label dedicated to breaking down boundaries between musical genres.',
        keywords: ['C3.SYS', 'about', 'music label', 'Detroit', 'independent music', 'genre-blending'],
        canonicalUrl: `${baseUrl}/about`
      };
      
    case 'contact':
      return {
        title: 'Contact | C3.SYS',
        description: 'Get in touch with C3.SYS for inquiries about our artists, releases, or collaboration opportunities.',
        keywords: ['C3.SYS', 'contact', 'music label contact', 'Detroit music', 'collaboration'],
        canonicalUrl: `${baseUrl}/contact`
      };
      
    default:
      return {
        title: 'C3.SYS | Metro Detroit Music Label',
        description: 'Metro Detroit music label breaking down boundaries between genres. Discover innovative electronic, rock, and experimental music from emerging artists.',
        keywords: ['C3.SYS', 'music label', 'Detroit', 'electronic music', 'rock music', 'experimental music'],
        canonicalUrl: baseUrl
      };
  }
};

// Generate rich metadata for individual releases (for future use)
export const getReleaseMetadata = (releaseId: string): PageMetadata | null => {
  const release = releasesData.find(r => r.id === releaseId);
  const baseUrl = window.location.origin;
  
  if (!release) return null;
  
  return {
    title: `${release.title} by ${release.artist} | C3.SYS`,
    description: release.description ? 
      release.description.replace(/<[^>]*>/g, '').substring(0, 157) + '...' : 
      `${release.title} by ${release.artist}, released on C3.SYS. Genre: ${release.genre.join(', ')}.`,
    keywords: ['C3.SYS', release.artist, release.title, ...release.genre, 'music release'],
    ogImage: release.artwork,
    canonicalUrl: `${baseUrl}/releases#${releaseId}`
  };
};
