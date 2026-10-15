import React from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getArticleBySlug } from '../data/articles';
import { HtmlDescription } from '../components/ui/html-description';

interface ArticlePageProps {
  articleSlug: string;
  onNavigate: (page: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ articleSlug, onNavigate }) => {
  const article = getArticleBySlug(articleSlug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Button onClick={() => onNavigate('writings')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Writings
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    // Parse date as local time to avoid timezone issues
    const parts = dateString.split('-');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert markdown-style content to HTML
  const convertMarkdownToHtml = (content: string): string => {
    return content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      // Wrap in paragraphs (but avoid wrapping HTML blocks)
      .replace(/^(?!<[h|d|i])(.+)(?!>)$/gm, '<p>$1</p>')
      // Clean up extra paragraph tags around HTML blocks
      .replace(/<p>(<[h|d|i][^>]*>.*?<\/[h|d|i][^>]*>)<\/p>/g, '$1')
      // Clean up empty paragraphs
      .replace(/<p><\/p>/g, '');
  };

  const htmlContent = convertMarkdownToHtml(article.content);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-4"
          onClick={() => onNavigate('blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-3 text-muted-foreground mb-4">
            <time className="text-sm">{formatDate(article.date)}</time>
            {article.featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </div>

          {article.description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {article.description}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-6">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          <HtmlDescription 
            content={htmlContent} 
            className="article-content text-foreground leading-relaxed"
          />
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Button 
            onClick={() => onNavigate('blog')}
            variant="outline"
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            More Articles
          </Button>
          <Button 
            onClick={() => onNavigate('contact')}
            variant="secondary"
          >
            Share Your Thoughts
          </Button>
        </footer>
      </div>
    </div>
  );
};