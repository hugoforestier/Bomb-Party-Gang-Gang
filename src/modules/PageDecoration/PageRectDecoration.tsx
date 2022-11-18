import React from 'react';
import styles from './RectDecoration.module.scss';

interface Props {
  dark: boolean;
}

export default function PageRectDecoration({ dark }: Props) {
  let className = styles.rectDecoration;

  if (dark) {
    className += ` ${styles.dark}`;
  }

  return (
    <div className={className}>
      <div />
    </div>
  );
}
