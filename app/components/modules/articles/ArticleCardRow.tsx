import React from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/articles/ArticleCardRow.module.css'
import ArticleCard from '../../elements/article-card/ArticleCard'

interface Props {
   articles: Article[]
}

const ArticleCardRow: React.FC<Props> = ({ articles }) => {
   return (
      <div className={styles.container}>
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
