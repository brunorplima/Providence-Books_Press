import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { RiFileEditFill } from 'react-icons/ri';
import styles from '../../../styles/admin-user/EmptyUpdateFormMessage.module.css'

interface Props {
   readonly messageType: 'product' | 'article' | 'order'
}

const EmptyUpdateFormMessage: React.FC<Props> = ({ messageType }) => {
   return (
      <div className={styles.updateMessage}>
         <AiFillInfoCircle size={30} />
         To update {messageType.match(/^[aieouAIEOU].*/) ? 'an' : 'a'} {messageType} select it ({<RiFileEditFill />}) on the "Overview" tab.
      </div>
   )
}

export default EmptyUpdateFormMessage
