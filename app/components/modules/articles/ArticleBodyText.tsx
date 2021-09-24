import React from 'react'
import styles from '../../../styles/articles/ArticleBodyText.module.css'

interface Props {
   readonly body: string;
}

const ArticleBodyText: React.FC<Props> = ({ body }) => {

   const text = body.split('\n')

   return (
      <div className={styles.container}>
         {
            text.map((t, i) => <p key={t + i} className={styles.p}>{t}</p>)
         }
      </div>
   )
}

export default ArticleBodyText
