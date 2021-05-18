import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import styles from '../../../styles/elements/BackButton.module.css'
import { useRouter } from 'next/router'

interface Props {
   readonly secondary?: boolean;
}

const BackButton: React.FC<Props> = ({ secondary }) => {

   const router = useRouter();

   function handleClick() {
      router.back();
   }

   return (
      <div
         className={`
            ${styles.backButtonContainer}
            ${secondary ? styles.secondaryColor : styles.primaryColor}
         `}
         onClick={handleClick}
      >
         <div className={styles.backIcons}><FaLongArrowAltLeft /></div>
         <div className={styles.backText}>Back</div>
      </div>
   )
}

export default BackButton
