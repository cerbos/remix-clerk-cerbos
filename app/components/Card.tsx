import type { ReactNode } from 'react';
import cx from 'classnames';

export default function Card({
  href,
  title,
  disabled,
  children,
  loading,
  icon,
  action,
  ...rest
}: {
  href?: string;
  title?: string;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <div className={cx('card', { loading, disabled })}>
      <a href={href} className="card-content" {...rest}>
        <div className="icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <div>{children}</div>
        </div>
        <div className="action">{action}</div>
      </a>
    </div>
  );
}
