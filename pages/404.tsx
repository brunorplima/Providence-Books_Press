import React from 'react';
import Button from '../app/components/elements/button/Button';
import LinkLoading from '../app/components/elements/link-loading/LinkLoading';
import styles from '../app/styles/404/404.module.css';

const Custom404 = () => {
   return (
      <div className={styles.container}>
         <div className={styles.image}>
            <img src='/404/404.png' alt='Error 404: Page was not found' />
         </div>
         <div className={styles.links}>
            <LinkLoading href='/'>
               <Button
                  label='HOME'
               />
            </LinkLoading>

            <LinkLoading href='/bookstore'>
               <Button
                  label='BOOKSTORE'
                  secondaryStyle
               />
            </LinkLoading>

            <LinkLoading href='/articles'>
               <Button
                  label='ARTICLES'
               />
            </LinkLoading>
         </div>
      </div>
   )
}

export default Custom404;
