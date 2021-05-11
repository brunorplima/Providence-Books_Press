import React from 'react'
import { ArticleAuthor } from '../../../interfaces-objects/interfaces'
import NameInitials from '../../elements/name-initials/NameInitials'
import styles from '../../../styles/articles/ArticleAuthorInformation.module.css'

interface Props {
   readonly author: ArticleAuthor;
}

const ArticleAuthorInformation: React.FC<Props> = ({ author }) => {
   return (
      <div className={styles.container}>
         <div className={styles.initials}><NameInitials name={author.name} size={100} fontSize='30pt'/></div>
         <div className={styles.authorInfo}>
            <div className={styles.authorName}>{author.credential} {author.name}</div>
            {
               author.about &&
               <div>{author.about}</div>
            }
         </div>
      </div>
   )
}

export default ArticleAuthorInformation
