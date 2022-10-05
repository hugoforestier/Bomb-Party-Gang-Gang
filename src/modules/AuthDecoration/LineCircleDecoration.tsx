import React from 'react';
import styles from './AuthDecoration.module.scss';

export default function LineCircleDecoration() {
  const lines: React.ReactNode[][] = [];

  for (let i = 0; i < 6; i += 1) {
    const line: React.ReactNode[] = [];
    for (let j = 26 - 5 * i; j > 0; j -= 1) {
      line.push(<div key={`${i}-${j}`} />);
    }
    lines.push(line);
  }

  const lineContent = lines.map((line) => (
    <div className={styles.line} key={`LINE-${line.length}`}>
      {line}
    </div>
  ));

  return (
    <div className={styles.lineCircleDecoration}>
      <div className={styles.lines}>
        {lineContent}
      </div>
    </div>
  );
}
