import React from 'react'
import styles from '../../../styles/elements/ClosedStoreMessage.module.css'

const ClosedStoreMessage = () => {

   const date = new Date(Date.now());

   if (date.getDay() !== 0) return null;

   return (
      <div className={styles.container}>
         <div className={styles.message}>
            <div>Sorry, the store is closed on Sundays.</div>
            <div>Please come back tomorrow. Thank you!</div>
            <img src='/full-logo-min.png' alt='' />
         </div>
      </div>
   )
}

export default ClosedStoreMessage
