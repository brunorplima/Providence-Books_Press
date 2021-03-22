import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import styles from '../../../styles/elements/BackButton.module.css'
import { useRouter } from 'next/router'

const BackButton = () => {

   const router = useRouter();

   function handleClick() {
      router.back();
   }

   return (
      <div className={styles.backButtonContainer} onClick={handleClick}>
         <div className={styles.backIcons}><FaLongArrowAltLeft /></div>
         <div className={styles.backText}>Back</div>
      </div>
   )
}

export default BackButton
