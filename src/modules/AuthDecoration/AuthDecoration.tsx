import React from 'react';
import styles from './AuthDecoration.module.scss';
import BarDecoration from './BarDecoration';
import CircleDecoration from './CircleDecoration';
import LineCircleDecoration from './LineCircleDecoration';
import RectDecoration from './RectDecoration';

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
      <CircleDecoration />
      <RectDecoration />
      <BarDecoration />
      <LineCircleDecoration />
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
