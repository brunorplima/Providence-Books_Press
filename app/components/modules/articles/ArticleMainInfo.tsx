import React from 'react'
import { ArticleAuthor } from '../../../interfaces-objects/interfaces'
import months from '../../../util/months'
import styles from '../../../styles/articles/ArticleMainInfo.module.css'
import NameInitials from '../../elements/name-initials/NameInitials'

interface Props {
   readonly author: ArticleAuthor,
   readonly datePosted: Date
}

const ArticleMainInfo: React.FC<Props> = ({ author, datePosted }) => {
   return (
      <div className={styles.authorContainer}>
         <div className={styles.subcontainer1}>
            <div className={styles.authorInfo}>
               <div><NameInitials name={author.name} /></div>
               <div>ARTICLE BY: {author.credential.toUpperCase()} {author.name.toUpperCase()}</div>
            </div>

            <div className={styles.date}>
               {months[datePosted.getMonth()].toUpperCase()}.{datePosted.getDate()}.{datePosted.getFullYear()}
            </div>
         </div>
         
         {
            author.about &&
            <div className={styles.subcontainer2}>
               {author.about}
            </div>
         }
      </div>
   )
}

export default ArticleMainInfo
