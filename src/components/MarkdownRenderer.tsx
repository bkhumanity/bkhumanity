import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  onNavigate?: (view: string, idOrSlug?: string) => void;
  onOpenDonateModal?: (projectId?: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  onNavigate,
  onOpenDonateModal,
}) => {
  const html = useMemo(() => {
    try {
      // marked parses markdown synchronously into safe standard HTML
      return marked.parse(content, { gfm: true, breaks: true }) as string;
    } catch (e) {
      console.error('Failed to parse markdown', e);
      return `<p>${content}</p>`;
    }
  }, [content]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#blog/')) {
      e.preventDefault();
      const slug = href.replace('#blog/', '');
      if (onNavigate) {
        onNavigate('blog-detail', slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href === '#contact') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href === '#projects') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href.startsWith('#donate')) {
      e.preventDefault();
      const projectId = href.includes('?project=') ? href.split('?project=')[1] : undefined;
      if (onOpenDonateModal) {
        onOpenDonateModal(projectId);
      }
    } else if (href.startsWith('http')) {
      // Make sure external links open safely in a new tab
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`article-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
