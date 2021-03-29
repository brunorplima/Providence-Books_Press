import React, { CSSProperties } from 'react'
import styles from '../../../styles/elements/Button.module.css'

interface Props {
   label: string,
   clickHandler: () => void,
   style?: CSSProperties
}

const Button: React.FC<Props> = ({ label, clickHandler, style }) => {
   return (
      <button
         className={styles.container} onClick={clickHandler}
         style={{ ...style }}
      >
         {label}
      </button>
   )
}

export default Button
