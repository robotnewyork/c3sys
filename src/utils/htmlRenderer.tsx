// HTML rendering utilities for track and release descriptions
import DOMPurify from 'dompurify';

/**
 * Safely renders HTML content by sanitizing it first
 * Allows basic formatting tags like <br>, <p>, <em>, <strong>, etc.
 */
export function renderHtmlDescription(htmlString: string): string {
  if (!htmlString) return '';
  
  // Configure DOMPurify to allow basic formatting tags
  const cleanHtml = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
      'br', 'p', 'em', 'strong', 'b', 'i', 'u', 
      'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote'
    ],
    ALLOWED_ATTR: ['class', 'style'],
    ALLOWED_STYLES: {
      'color': [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i],
      'font-weight': [/^bold$/i, /^normal$/i, /^[1-9]00$/],
      'font-style': [/^italic$/i, /^normal$/i],
      'text-decoration': [/^underline$/i, /^none$/i]
    }
  });
  
  return cleanHtml;
}

/**
 * Component that renders HTML descriptions safely
 */
interface HtmlDescriptionProps {
  content: string;
  className?: string;
}

export function HtmlDescription({ content, className = '' }: HtmlDescriptionProps) {
  const safeHtml = renderHtmlDescription(content);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}