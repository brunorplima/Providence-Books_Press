import React, { useEffect } from 'react'
import { CSSProperties } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import styles from '../../../styles/elements/DropdownMenu.module.css'

interface Props {
   readonly isMenuOpened: boolean
   readonly setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
   readonly customStyle?: CSSProperties
}

const DropdownMenu: React.FC<Props> = ({ children, isMenuOpened, setIsMenuOpened, customStyle }) => {

   useEffect(() => {
      if (isMenuOpened) {
         window.onclick =  () => setIsMenuOpened(false)
      }
      else {
         window.onclick = null
      }
   }, [isMenuOpened])

   return (
      <div className={styles.container}>
         <div
            className={styles.menuButton}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            style={isMenuOpened ? { color: 'var(--mainYellow)' } : {}}
         >
            <HiDotsVertical fontSize={22} />
         </div>
         {
            isMenuOpened &&
            <>
               <div
                  className={styles.menuBox}
                  style={customStyle ? customStyle : {}}
               >
                  {children}
               </div>
            </>
         }
      </div>
   )
}

export default DropdownMenu
