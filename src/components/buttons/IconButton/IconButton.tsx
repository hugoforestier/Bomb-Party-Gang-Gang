import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './IconButton.module.scss';

export interface IconButtonProps {
  iconName: IconDefinition;
  inverted?: boolean;
  onClick: () => any;
}

function IconButton({
  iconName, inverted, onClick,
}: IconButtonProps) {
  let buttonClass = `${styles.iconButton}`;
  buttonClass += inverted ? ` ${styles.inverted}` : '';

  return (
    <button
      onClick={onClick}
      type="button"
      className={buttonClass}
    >
      <FontAwesomeIcon icon={iconName} />
    </button>
  );
}

IconButton.defaultProps = {
  inverted: false,
};

export default IconButton;
