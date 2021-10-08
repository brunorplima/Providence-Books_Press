import React, { useState } from 'react'
import styles from '../../../styles/admin-user/TextTableData.module.css'

interface TextTableDataProps {
   readonly limit: number
   readonly text: string
   readonly editText: string
   readonly setEditText: React.Dispatch<React.SetStateAction<string>>
}

const TextTableData: React.FC<TextTableDataProps> = ({ limit, text, editText, setEditText }) => {
   const [showingMore, setShowingMore] = useState(false)

   function buildText() {
      if (text.length <= limit) return text

      if (showingMore) return text
      else return text.substr(0, limit) + '...'
   }
   return (
      <>
         {
            editText !== null &&
            <textarea 
               className={styles.textarea}
               value={editText}
               onChange={e => setEditText(e.target.value)}
            ></textarea>
         }

         {
            editText === null &&
            <>
               <div>
                  {
                     buildText()
                  }
               </div>
               {
                  text.length > limit &&
                  <div className={styles.seeMore} onClick={() => setShowingMore(!showingMore)}>
                     See {showingMore ? 'less' : 'more'}
                  </div>
               }
            </>
         }
      </>
   )
}

export default TextTableData
