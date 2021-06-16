import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Banner from '../../app/components/elements/banner/Banner';
import ArticleAuthorInformation from '../../app/components/modules/articles/ArticleAuthorInformation';
import ArticleBodyText from '../../app/components/modules/articles/ArticleBodyText';
import ArticleMainInfo from '../../app/components/modules/articles/ArticleMainInfo';
import CommentsContainer from '../../app/components/modules/articles/CommentsContainer';
import { firestore } from '../../app/firebase/firebase';
import { Article, Comment } from '../../app/interfaces-objects/interfaces';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;
   // const comments: Comment[] = [];
   // let article: Article;

   const articleRef = await fetch(`https://providencebp.vercel.app/api/articles/${_id}`);
   const article: Article = await articleRef.json();

   const commentsRef = await fetch(`https://providencebp.vercel.app/api/comments/${article._id}`);
   const comments: Comment[] = await commentsRef.json();

   // const articleRef = await firestore.collection('articles').where('_id', '==', _id).get();
   // articleRef.forEach(async doc => {
   //    article = doc.data() as Article;
   // })

   // const commentsRef = await firestore.collectionGroup('comments').where('_articleId', '==', article._id).get();
   // commentsRef.forEach(doc => comments.push(doc.data() as Comment));
   
   return {
      props: {
         article,
         comments
      }
   }
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//    const articles: Article[] = [];
//    const articlesRef = await firestore.collection('articles').get();
//    articlesRef.forEach(doc => articles.push(doc.data() as Article));
//    const paths = articles.map(article => ({ params: { _id: article._id }}));

//    return {
//       paths,
//       fallback: 'blocking'
//    }
// }

export default ArticlePage;
