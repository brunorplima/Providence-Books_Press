import React, { CSSProperties } from 'react';
import styles from '../../../styles/elements/Button.module.css';

export interface ButtonProps {
   readonly label: string;
   readonly clickHandler: () => void;
   readonly style?: CSSProperties;
   readonly secondaryStyle?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, clickHandler, style, secondaryStyle }) => {
   return (
      <button
         className={`${styles.container} ${secondaryStyle && styles.secondaryStyle}`}
         onClick={clickHandler}
         style={{ ...style }}
      >
         {label}
      </button>
   )
}

export default Button;
