import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import styles from '../../../styles/side-bar/Sidebar.module.css'

type Portal = {
   isOpen: boolean,
   setModalOpen: (value: boolean) => void
}

interface Props {
   portal?: Portal
}

const SideBarModal: React.FC<Props> = ({
   children,
   portal
}) => {

   const [mounted, setMounted] = useState<boolean>(false);
   const [justClickedClose, setJustClickedClose] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, [])

   useEffect(() => {
      setTimeout(() => {
         if (!portal.isOpen) setJustClickedClose(false)
      }, 200);
   }, [portal.isOpen])


   function handleBackgroundClick(e: React.MouseEvent) {
      if (e.currentTarget === e.target) {
         setJustClickedClose(true);
         portal.setModalOpen(false);
      }
   }


   function handleCloseButtonClick() {
      setJustClickedClose(true);
      portal.setModalOpen(false);
   }
   

   return mounted ? createPortal(
      <div
         className={`
            ${styles.sideBarModalContainer} 
            ${portal.isOpen ? styles.sideBarModalContainerOpen : justClickedClose ? styles.sideBarModalContainerClose : ''}
         `}
         onClick={e => handleBackgroundClick(e)}
      >
         <div className={styles.closeModal} onClick={handleCloseButtonClick}><IoMdClose /></div>
         {children}
      </div>,
      document.querySelector('#sidebar-modal')) : null
}

export default SideBarModal
