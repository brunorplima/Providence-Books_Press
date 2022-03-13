import React, { MouseEventHandler, SyntheticEvent } from 'react'
import styles from '../../../styles/elements/Modal.module.css'
import dialogStyles from '../../../styles/dialog/Dialog.module.css'
import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'

interface Props {
   readonly closeModal: MouseEventHandler | any
   readonly title: string | React.ReactNode
   readonly titleIcon?: React.ReactNode
   readonly children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ closeModal, title, titleIcon, children }) => {

   function backgroundCloseDialog(e: SyntheticEvent) {
      if (e.currentTarget === e.target) {
         closeModal();
      }
   }

   return createPortal(
      <div className={dialogStyles.container} onClick={backgroundCloseDialog}>
         <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
               {title &&
                  <div>
                     {titleIcon && titleIcon}
                     <h3>{title}</h3>
                  </div>
               }
               <div className={styles.closeButton} onClick={closeModal}>
                  <IoMdClose fontSize={28} />
               </div>
            </div>

            <div className={styles.modalBody}>
               {children}
            </div>
         </div>
      </div>,
      document.getElementById('general-modal')
   )
}

export default Modal