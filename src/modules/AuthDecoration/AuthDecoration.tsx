import React from 'react';
import styles from './AuthDecoration.module.scss';

interface Props {
  children: React.ReactNode,
  className?: string,
  title?: string,
}

export default function AuthDecoration({
  children, className, title,
}: Props) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div className={styles.leftBar}>
        <h1 className={styles.titleShadow}>{title?.toUpperCase() ?? 'PLACEHOLDER TITLE'}</h1>
        <h1 className={styles.title}>{title?.toUpperCase() ?? 'PLACEHOLDER TITLE'}</h1>
      </div>
      {children}
    </div>
  );
}

AuthDecoration.defaultProps = {
  className: undefined,
  title: undefined,
};
