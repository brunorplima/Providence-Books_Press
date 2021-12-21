import { GetServerSideProps } from 'next';
import React from 'react';
import Banner from '../../app/components/elements/banner/Banner';
import ArticleBodyText from '../../app/components/modules/articles/ArticleBodyText';
import ArticleMainInfo from '../../app/components/modules/articles/ArticleMainInfo';
import CommentsContainer from '../../app/components/modules/articles/CommentsContainer';
import { fetchDocs, fetchRefs, Where } from '../../app/firebase/fetch';
import { Article, Comment } from '../../app/interfaces-objects/interfaces';
import styles from '../../app/styles/articles/ArticlePage.module.css';
import firebase from '../../app/firebase/firebase';

interface Props {
   readonly article: Article;
   readonly comments: Comment[];
}

const ArticlePage: React.FC<Props> = ({ article, comments }) => {

   return (
      <>
         <Banner image={article.image} title={article.title} subtitle={article.subtitle ? article.subtitle : null} />
         <div className={styles.container}>
            <ArticleMainInfo author={article.author} datePosted={new Date(article.datePosted)} />
            <ArticleBodyText body={article.body} />
            <CommentsContainer comments={comments.map(c => ({ ...c, dateTime: new Date(c.dateTime) }))} articleId={article._id} />
         </div>
      </>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;
   const where: Where = {
      field: '_id',
      condition: '==',
      value: _id
   }

   const articleRef = (await fetchRefs('articles', where))[0]
   if (!articleRef) {
      return {
         notFound: true
      }
   }
   const article = articleRef.data()
   const comments = await fetchDocs<Comment & { dateTime: firebase.firestore.Timestamp }>(`articles/${articleRef.id}/comments`)
   return {
      props: {
         article,
         comments: comments.map(comm => ({ ...comm, dateTime: comm.dateTime.toDate().toString() }))
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
