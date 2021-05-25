import Link from 'next/link'
import React from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/articles/ArticlesBanner.module.css'
import faker from 'faker'
import NameInitials from '../../elements/name-initials/NameInitials'
import months from '../../../util/months'
import { useDispatch } from 'react-redux'
import createLoadingAction from '../../../redux/actions/loadingAction'

interface Props {
   article: Article
}

const ArticleBanner: React.FC<Props> = ({ article }) => {
   const { _id, author, category, datePosted, image, subtitle, title } = article;
   const dispatch = useDispatch();

   const date = new Date(datePosted);
   return (
      <Link href={`articles/${_id}`}>
         <a onClick={() => dispatch(createLoadingAction(true))}>
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
                     <div><NameInitials name={author.name} /></div>
                     <div>{author.credential} {author.name}</div>
                  </div>

                  <div>{category}</div>
               </div>

               <div>
                  <div>{months[date.getMonth()].toUpperCase()}.{date.getDate()}.{date.getFullYear()}</div>
               </div>
            </div>
         </a>
      </Link>
   )
}

export default ArticleBanner
