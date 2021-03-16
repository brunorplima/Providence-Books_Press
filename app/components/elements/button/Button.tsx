import React from 'react'
import styles from '../../../styles/elements/Button.module.css'

interface Props {
   label: string,
   clickHandler: Function
}

const Button: React.FC<Props> = ({ label, clickHandler }) => {
   return (
      <button className={styles.container} onClick={e => clickHandler(e)}>
         {label}
      </button>
   )
}

export default Button
