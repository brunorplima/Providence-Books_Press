import { GetServerSideProps } from 'next'
import React from 'react'
import Banner from '../../app/components/elements/banner/Banner'
import ArticleAuthorInformation from '../../app/components/modules/articles/ArticleAuthorInformation'
import ArticleBodyText from '../../app/components/modules/articles/ArticleBodyText'
import ArticleMainInfo from '../../app/components/modules/articles/ArticleMainInfo'
import { Article } from '../../app/interfaces-objects/interfaces'
import styles from '../../app/styles/articles/ArticlePage.module.css'

interface Props {
   article: Article
}

class ArticlePage extends React.Component<Props> {

   render() {
      const { article } = this.props;

      return (
         <div className={styles.container}>
            <Banner image={article.image} title={article.title} subtitle={article.subtitle ? article.subtitle : null}/>
            <ArticleMainInfo author={article.author} datePosted={new Date(article.datePosted)} />
            <ArticleBodyText body={article.body} />
            <ArticleAuthorInformation author={article.author} />
         </div>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;

   const articleRes = await fetch(`https://providencebp.vercel.app/api/articles/${_id}`);
   const article = await articleRes.json();

   return {
      props: {
         article
      }
   }
}

export default ArticlePage
