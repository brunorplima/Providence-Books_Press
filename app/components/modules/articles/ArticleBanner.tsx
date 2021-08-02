import React from 'react';
import { Article } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/articles/ArticlesBanner.module.css';
import NameInitials from '../../elements/name-initials/NameInitials';
import months from '../../../util/months';
import LinkLoading from '../../elements/link-loading/LinkLoading';
import clsx from 'clsx';

interface Props {
   article: Article;
}

const ArticleBanner: React.FC<Props> = ({ article }) => {
   if (!article) {
      return (
         <div className={clsx(styles.banner, styles.noArticlesBanner)} style={{ background: 'url("/banner/Church.JPG")', backgroundPositionY: 'bottom' }}>
            <h2>There are no articles at the moment</h2>
            <h3>Come back later to check if any articles have been added</h3>
         </div>
      )
   }

   const { _id, author, category, datePosted, image, subtitle, title } = article;

   const date = new Date(datePosted);
   return (
      <LinkLoading href={`articles/${_id}`}>
         <div className={styles.banner} style={{ background: `url(${image})`, backgroundPositionY: 'center' }}>
            <div className={styles.articleTag}>
               Latest article
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
      </LinkLoading>
   )
}

export default ArticleBanner;
