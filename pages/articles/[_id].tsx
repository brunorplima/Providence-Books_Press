import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Banner from '../../app/components/elements/banner/Banner';
import ArticleAuthorInformation from '../../app/components/modules/articles/ArticleAuthorInformation';
import ArticleBodyText from '../../app/components/modules/articles/ArticleBodyText';
import ArticleMainInfo from '../../app/components/modules/articles/ArticleMainInfo';
import CommentsContainer from '../../app/components/modules/articles/CommentsContainer';
import { Article, Comment } from '../../app/interfaces-objects/interfaces';
import createLoadingAction from '../../app/redux/actions/loadingAction';
import { store } from '../../app/redux/store/store';
import styles from '../../app/styles/articles/ArticlePage.module.css';

interface Props {
   readonly article: Article;
   readonly comments: Comment[];
}

class ArticlePage extends React.Component<Props> {

   render() {
      const { article, comments } = this.props;

      return (
         <div className={styles.container}>
            <div style={{ padding: '.8rem' }}>
               <Banner image={article.image} title={article.title} subtitle={article.subtitle ? article.subtitle : null} />
            </div>
            <ArticleMainInfo author={article.author} datePosted={new Date(article.datePosted)} />
            <ArticleBodyText body={article.body} />
            <ArticleAuthorInformation author={article.author} />
            <CommentsContainer comments={comments}/>
         </div>
      )
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
   const { _id } = context.params;

   const articleRes = await fetch(`https://providencebp.vercel.app/api/articles/${_id}`);
   let article: Article;
   try {
      article = await articleRes.json();
      if (!article) throw new Error('Article received from server is not valid');
   } catch (e) {
      return {
         notFound: true
      }
   }

   const commentsRes = await fetch(`https://providencebp.vercel.app/api/comments/${article._id}`);
   const comments: Comment[] = await commentsRes.json();

   return {
      props: {
         article,
         comments
      }
   }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
   const fetchArticles = await fetch('https://providencebp.vercel.app/api/articles');
   const articles: Article[] = await fetchArticles.json();
   const paths = articles.map(article => ({ params: { _id: article._id }}));
   return {
      paths,
      fallback: 'blocking'
   }
}

export default ArticlePage;
