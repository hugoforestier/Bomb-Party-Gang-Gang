import React from 'react';
import SquareLoader from 'react-spinners/SquareLoader';
import styles from './TextButton.module.scss';

export interface TextButtonProps {
  label: string;
  className?: string;
  filled?: boolean;
  loading?: boolean;
  onClick?: () => any;
}

function TextButton({
  label, className, filled, loading, onClick,
}: TextButtonProps) {
  let buttonClass = `${className} ${styles.textButton}`;
  buttonClass += filled ? ` ${styles.filled}` : ` ${styles.empty}`;

  return (
    <button
      onClick={onClick}
      type="submit"
      className={buttonClass}
    >
      <SquareLoader className={styles.loader} loading={loading} />
      {!loading ? label : undefined}
    </button>
  );
}

TextButton.defaultProps = {
  className: '',
  filled: true,
  loading: false,
  onClick: undefined,
};

export default TextButton;
