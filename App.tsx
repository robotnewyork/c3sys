import React, { useState, useEffect } from 'react';
import { AudioProvider } from './contexts/AudioContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { HomePage } from './pages/HomePage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { GearPage } from './pages/GearPage';
import { TimelinePage } from './pages/TimelinePage';
import { BackCatalogPage } from './pages/BackCatalogPage.tsx';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { Toaster } from './components/ui/sonner';
import { updatePageMetadata, getPageMetadata } from './components/ui/utils';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.slice(1); // Remove # prefix
      
      let page;
      if (path === '/' || path === '') {
        page = 'home';
      } else {
        page = path.slice(1); // Remove leading slash
      }
      
      setCurrentPage(page);
      
      // If there's a hash, scroll to it after a brief delay
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Set initial page based on current URL

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO metadata when page changes
  useEffect(() => {
    const metadata = getPageMetadata(currentPage);
    updatePageMetadata(metadata);
  }, [currentPage]);

  const navigate = (page: string) => {
    // Handle hash navigation (e.g., "gear#gear-1")
    const [mainPage, hash] = page.split('#');
    setCurrentPage(mainPage);
    
    // Update URL without page refresh
    const url = mainPage === 'home' ? '/' : `/${mainPage}`;
    const fullUrl = hash ? `${url}#${hash}` : url;
    window.history.pushState(null, '', fullUrl);
    
    // Update SEO metadata for the new page
    const metadata = getPageMetadata(mainPage);
    updatePageMetadata(metadata);
    
    // If there's a hash, scroll to the element after a brief delay to ensure page is rendered
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Scroll to top when navigating without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    // Handle project detail pages (new)
    if (currentPage.startsWith('project/')) {
      const artistSlug = currentPage.replace('project/', '');
      return <ArtistDetailPage artistSlug={artistSlug} onNavigate={navigate} />;
    }

    // Handle artist detail pages (legacy - redirect to project)
    if (currentPage.startsWith('artist/')) {
      const artistSlug = currentPage.replace('artist/', '');
      // Redirect to project URL
      const projectUrl = `project/${artistSlug}`;
      window.history.replaceState(null, '', `/${projectUrl}`);
      setCurrentPage(projectUrl);
      return <ArtistDetailPage artistSlug={artistSlug} onNavigate={navigate} />;
    }

    // Handle article detail pages
    if (currentPage.startsWith('article/')) {
      const articleSlug = currentPage.replace('article/', '');
      return <ArticlePage articleSlug={articleSlug} onNavigate={navigate} />;
    }

    // Handle releases with filters
    if (currentPage.startsWith('releases')) {
      return <ReleasesPage onNavigate={navigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'projects':
        return <ArtistsPage onNavigate={navigate} />;
      case 'artists':
        // Legacy route - redirect to projects
        window.history.replaceState(null, '', '/projects');
        setCurrentPage('projects');
        return <ArtistsPage onNavigate={navigate} />;
      case 'releases':
        return <ReleasesPage onNavigate={navigate} />;
      case 'gear':
        return <GearPage onNavigate={navigate} />;
      case 'timeline':
        return <TimelinePage onNavigate={navigate} />;
      case 'back-catalog':
        return <BackCatalogPage onNavigate={navigate} />;
      case 'blog':
        return <BlogPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header currentPage={currentPage} onNavigate={navigate} />
        
        <main className="flex-1 pb-24">
          {renderPage()}
        </main>
        
        <Footer onNavigate={navigate} />
        <AudioPlayer />
        <Toaster />
      </div>
    </AudioProvider>
  );
}