import Link from 'next/link'
import React from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/articles/ArticlesBanner.module.css'
import { IoPersonCircle } from 'react-icons/io5'
import faker from 'faker'

interface Props {
   article: Article
}

const ArticleBanner: React.FC<Props> = ({ article }) => {
   const { _id, author, category, datePosted, image, subtitle, title } = article;

   const date = new Date(datePosted);
   return (
      <Link href={`articles/${_id}`}>
         <a>
            <div className={styles.banner} style={{ background: `url(${image})` }}>
               <div className={styles.articleTag}>
                  Article
               </div>

               <div className={styles.innerBanner}>
                  <h2>{title}</h2>
                  <h3>{subtitle}</h3>
               </div>
            </div>

            <div className={styles.bannerInfo}>
               <div>
                  <div className={styles.bannerAuthor}>
                     <div style={{ color: faker.random.arrayElement(['#104C56', '#001986', '#035C00', '#450000']) }}><IoPersonCircle /></div>
                     <div>{author.credential} {author.name}</div>
                  </div>

                  <div>{category}</div>
               </div>

               <div>
                  <div>{date.toDateString()}</div>
               </div>
            </div>
         </a>
      </Link>
   )
}

export default ArticleBanner
