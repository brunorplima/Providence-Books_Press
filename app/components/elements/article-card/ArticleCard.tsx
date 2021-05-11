import React from 'react'
import styles from '../../../styles/elements/ArticleCard.module.css'
import Link from 'next/link'
import { ArticleAuthor } from '../../../interfaces-objects/interfaces'

interface Props {
   id: string
   image: string,
   title: string,
   author: ArticleAuthor,
   subtitle?: string
}

const ArticleCard: React.FC<Props> = ({ id, image, title, author, subtitle }) => {
   
   return (
      <div className={styles.container}>
         <Link href={'/articles/' + id}>
            <a>
               {/* <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
                  
               </div> */}

               <div className={styles.info}>
                  <h2 className={styles.title}>{title.toUpperCase()}</h2>
                  {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                  {/* <div style={{flex: 1}}></div> */}
                  <div className={styles.author}>AUTHOR: {author.name.toUpperCase()}</div>
               </div>
            </a>
         </Link>
      </div>
   )
}

export default ArticleCard
