import { GetServerSideProps } from 'next';
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

   componentDidMount() {
      store.dispatch(createLoadingAction(false));
   }

   componentDidUpdate() {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
   }

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

   const articleRes = await fetch(`https://providencebp.vercel.app/api/articles/${_id}`);
   const article: Article = await articleRes.json();

   const commentsRes = await fetch(`https://providencebp.vercel.app/api/comments/${article._id}`);
   const comments: Comment[] = await commentsRes.json();

   return {
      props: {
         article,
         comments
      }
   }
}

export default ArticlePage;
