import React from 'react';
import styles from './Separator.module.scss';

interface Props {
  className?: string,
  text?: string,
}

export default function Separator({
  text,
  className,
}: Props) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div className={styles.bar} />
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.bar} />
    </div>
  );
}

Separator.defaultProps = {
  text: 'or',
  className: undefined,
};
