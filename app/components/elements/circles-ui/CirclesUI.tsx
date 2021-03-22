import React from 'react'
import styles from '../../../styles/elements/CirclesUI.module.css'

const CirclesUI = () => {
   return (
      <div className={styles.container}>
         <div className={styles.circle}></div>
         <div className={styles.circle}></div>
         <div className={styles.circle + ' ' + styles.lastCircle}></div>
      </div>
   )
}

export default CirclesUI
