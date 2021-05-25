import { GetServerSideProps } from 'next';
import React, { Component } from 'react';
import styles from '../../app/styles/articles/Articles.module.css';
import ArticlesList from '../../app/components/modules/articles/ArticlesList';
import { Article } from '../../app/interfaces-objects/interfaces';
import ArticleBanner from '../../app/components/modules/articles/ArticleBanner';
import Button from '../../app/components/elements/button/Button';
import { store } from '../../app/redux/store/store';
import createLoadingAction from '../../app/redux/actions/loadingAction';

interface Props {
   readonly articles: Article[],
   readonly categories: string[]
}

interface State {
   showCategories: boolean;
}

export class ArticlesPage extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = {
         showCategories: false
      }

      this.setShowCategories = this.setShowCategories.bind(this);
   }

   componentDidMount() {
      store.dispatch(createLoadingAction(false));
   }

   componentDidUpdate() {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
   }

   getSortedArticles(articles: Article[]): Article[] {
      let sorted = articles.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      return sorted;
   }

   private setShowCategories() {
      this.setState({ showCategories: !this.state.showCategories })
   }

   render() {
      const { articles, categories } = this.props;

      const firstArticle = this.getSortedArticles(articles)[0];

      return (
         <div className={styles.container}>
            <div style={{ padding: '.8rem' }}>
               <ArticleBanner article={firstArticle} />
            </div>

            <div className={styles.lists}>
               <ArticlesList
                  articles={this.getSortedArticles(articles)}
                  category='All categories'
                  showFirst={false}
               />

               {
                  !this.state.showCategories &&
                  <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'center' }}>
                     <Button clickHandler={this.setShowCategories} label='Sort by categories' style={{ fontSize: '12pt', width: 200 }} />
                  </div>
               }

               {
                  this.state.showCategories &&
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

export const getServerSideProps: GetServerSideProps = async (context) => {

   const fetchedData = await fetch('https://providencebp.vercel.app/api/articles');
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

export default ArticlesPage;
