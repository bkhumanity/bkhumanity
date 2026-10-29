import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const html = useMemo(() => {
    try {
      // marked parses markdown synchronously into safe standard HTML
      return marked.parse(content, { gfm: true, breaks: true }) as string;
    } catch (e) {
      console.error('Failed to parse markdown', e);
      return `<p>${content}</p>`;
    }
  }, [content]);

  return (
    <div
      className={`article-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
