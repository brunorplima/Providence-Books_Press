import React, { createRef, RefObject, useEffect, useState } from 'react'
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
   const ref = createRef<HTMLDivElement>();

   useEffect(() => {
      setMounted(true);
      if (ref.current)
         ref.current.focus();
   }, [])

   return mounted ? createPortal(
      <div 
         ref={ref}
         className={`
            ${styles.sideBarModalContainer} 
            ${portal.isOpen ? styles.sideBarModalContainerOpen : ''}
         `}
      >
         <div className={styles.closeModal} onClick={() => portal.setModalOpen(false)}><IoMdClose /></div>
         {children}
      </div>,
      document.querySelector('#sidebar-modal')) : null
}

export default SideBarModal
