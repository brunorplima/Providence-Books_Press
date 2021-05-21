import React from 'react';
import ArticleCardRow from '../articles/ArticleCardRow';
import { Article } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/home/LatestArticle.module.css';
import Button from '../../elements/button/Button';
import { useRouter } from 'next/router';

interface Props {
   readonly articles?: Article[];
}

const LatestArticles: React.FC<Props> = ({ articles }) => {
   const router = useRouter();

   return (
      <div className={styles.container}>
         <h2>LATEST ARTICLE</h2>

         <div className={styles.articleCardRow}>
            <ArticleCardRow
               articles={articles}
               style={{
                  flexWrap: 'wrap'
               }}
            />
         </div>

         <div className={styles.button}>
            <Button
               label='MORE ARTICLES'
               clickHandler={() => {
                  router.push('/articles');
               }}
            />
         </div>
      </div>
   )
}

export default LatestArticles
