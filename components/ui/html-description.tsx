import React from 'react';
import DOMPurify from 'dompurify';

interface HtmlDescriptionProps {
  content: string;
  className?: string;
}

export const HtmlDescription: React.FC<HtmlDescriptionProps> = ({ content, className = '' }) => {
  // Configure DOMPurify to allow basic formatting tags, links, and embeds
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'iframe', 'blockquote', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div 
      className={`html-description ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default HtmlDescription;