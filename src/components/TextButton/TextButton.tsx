import React, { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './TextButton.scss';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export interface TextButtonProps {
  label: string;
  color?: string;
  filled?: boolean;
  loading?: boolean;
  onClick?: () => any;
}

function TextButton({
  label,
  color,
  filled,
  loading,
  onClick,
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`text-button ${filled ? 'filled-button' : 'empty-button'}`}
    >
      <ClipLoader color={color} loading={loading} cssOverride={override} size={150} />
      {label}
    </button>
  );
}

TextButton.defaultProps = {
  color: getComputedStyle(document.body).getPropertyValue('--primary'),
  filled: true,
  loading: false,
  onClick: undefined,
};

export default TextButton;
