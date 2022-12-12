import type { ReactNode } from 'react';

export default function DocsLink({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <a className="docslink" href={href} target="_blank" rel="noopener noreferrer">
      <span className="linkText">{children}</span>
    </a>
  );
}
