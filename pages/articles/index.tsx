import { GetServerSideProps } from 'next'
import React, { Component } from 'react'
import styles from '../../app/styles/articles/Articles.module.css'
import ArticlesList from '../../app/components/modules/articles/ArticlesList';
import { Article } from '../../app/interfaces-objects/interfaces'
import ArticleBanner from '../../app/components/modules/articles/ArticleBanner'

interface Props {
   articles: Article[],
   categories: string[]
}

export class index extends Component<Props> {

   getSortedArticles(): Article[] {
      const { articles } = this.props;
      let sorted = articles.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      return sorted;
   }

   render() {
      const { articles, categories } = this.props;

      const firstArticle = this.getSortedArticles()[0];

      return (
         <div className={styles.container}>
            <ArticleBanner article={firstArticle}/>

            <div className={styles.lists}>
               <ArticlesList
                  articles={this.getSortedArticles()}
                  category='All categories'
                  showFirst={false}
               />

               {
                  categories.map(category => {
                     return (
                        <ArticlesList
                           key={category}
                           articles={articles.filter(article => article.category === category)}
                           category={category}
                           showFirst={true}
                        />
                     )
                  })
               }
            </div>

         </div>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async () => {

   const fetchedData = await fetch('http://localhost:3000/api/articles');
   const articles: Article[] = await fetchedData.json();

   const categories: string[] = [];

   const populateCategories = article => {
      if (!categories.includes(article.category))
         categories.push(article.category);
   }
   
   articles.forEach(populateCategories);

   return {
      props: {
         articles,
         categories
      }
   }
}

export default index
