import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../../styles/elements/ClosedStoreMessage.module.css'

const ClosedStoreMessage = () => {
   const router = useRouter();
   const date = new Date(Date.now());
   const excludedRoutes = ['/articles', '/articles/[_id]'];

   if (date.getDay() !== 3 || excludedRoutes.includes(router.pathname)) return null;

   return (
      <div className={styles.container}>
         <div className={styles.messageContainer}>
            <div className={styles.message}>
               <div className={styles.closedSignContainer}>
                  
                  <div className={styles.pin}></div>
                  <div className={styles.leftCord}></div>
                  <div className={styles.rightCord}></div>
                  <div className={styles.closedSign}>
                     <div>
                        <div className={styles.sorry}>Sorry</div>
                        <div className={styles.were}>WE'RE</div>
                        <div className={styles.closed}>CLOSED</div>
                     </div>
                  </div>
               </div>

               <div>
                  <div>Sorry, the store is closed on Sundays.</div>
                  <div>Please come back tomorrow. Thank you!</div>
               </div>

               <img src='/full-logo-min.png' alt='' />

            </div>
         </div>
      </div>
   )
}

export default ClosedStoreMessage
