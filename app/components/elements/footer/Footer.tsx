import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/elements/Footer.module.css';

const Footer = () => {

   const router = useRouter();

   const notShownPaths = [
      '/about-us',
      '/sign-in'
   ]

   if (notShownPaths.includes(router.pathname)) return null;

   return (
      <div className={styles.container}>
         <h2>CONTACT US</h2>
         <div className={styles.info}>
            <div>providencebooksales@outlook.com</div>
            <div>780-294-9239</div>
            <div>BOX 3 SITE 15 RR2 BARRHEAD, ALBERTA, T7N 1N3</div>
         </div>
      </div>
   )
}

export default Footer
