import React, { CSSProperties } from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/articles/ArticleCardRow.module.css'
import ArticleCard from '../../elements/article-card/ArticleCard'

interface Props {
   readonly articles: Article[];
   readonly style?: CSSProperties;
}

const ArticleCardRow: React.FC<Props> = ({ articles, style = {} }) => {
   return (
      <div className={styles.container} style={style}>
         {
            articles.map(article => {
               return (
                  <ArticleCard
                     key={article._id}
                     id={article._id}
                     image={article.image}
                     title={article.title}
                     author={article.author}
                     subtitle={article.subtitle ? article.subtitle : undefined}
                  />
               )
            })
         }
      </div>
   )
}

export default ArticleCardRow
