import React, { MouseEventHandler } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri'
import styles from '../../../styles/admin-user/AdminContentControllers.module.css'

interface Props {
   readonly isEditMode: boolean
   readonly setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
   readonly openEditMode: () => void
   readonly save: MouseEventHandler<HTMLDivElement>
}

const AdminContentControllers: React.FC<Props> = ({
   isEditMode,
   setIsEditMode,
   openEditMode,
   save
}) => {

   if (isEditMode && !save) return null

   return (
      <>
         {
            !isEditMode &&
            <div
               className={styles.container}
               onClick={openEditMode}
            >
               <RiFileEditFill size={18} />
            </div>
         }

         {
            isEditMode &&
            <div className={styles.multiContainer}>
               <div
                  className={styles.container}
                  onClick={save}
               >
                  <RiSave3Fill size={21} />
               </div>

               <div
                  className={styles.container}
                  onClick={() => setIsEditMode(false)}
               >
                  <IoIosCloseCircle size={20} />
               </div>
            </div>
         }
      </>
   )
}

export default AdminContentControllers
