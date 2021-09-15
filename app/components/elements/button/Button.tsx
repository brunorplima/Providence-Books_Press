import React, { CSSProperties } from 'react';
import styles from '../../../styles/elements/Button.module.css';

export interface ButtonProps {
   readonly label: string;
   readonly clickHandler?: () => void;
   readonly style?: CSSProperties;
   readonly secondaryStyle?: boolean;
   readonly disabled?: boolean;
   readonly type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ label, clickHandler, style, secondaryStyle, disabled, type }) => {

   const disabledStyle: CSSProperties = {};
   if (disabled) {
      disabledStyle.backgroundColor = 'gray';
      disabledStyle.cursor = 'not-allowed';
      disabledStyle.color = 'white';
      disabledStyle.borderColor = 'gray';
   }

   return (
      <button
         className={`${styles.container} ${secondaryStyle && styles.secondaryStyle}`}
         onClick={clickHandler && clickHandler}
         style={{ ...style, ...disabledStyle }}
         disabled={disabled}
         type={type}
      >
         {label}
      </button>
   )
}

export default Button;
