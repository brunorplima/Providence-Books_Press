import { GetServerSideProps } from 'next';
import React, { Component } from 'react';
import styles from '../../app/styles/articles/Articles.module.css';
import ArticlesList from '../../app/components/modules/articles/ArticlesList';
import { Article } from '../../app/interfaces-objects/interfaces';
import ArticleBanner from '../../app/components/modules/articles/ArticleBanner';
import Button from '../../app/components/elements/button/Button';
import SearchField from '../../app/components/elements/search-field/SearchField';
import EmptyResult from '../../app/components/elements/empty-result/EmptyResult';

interface Props {
   readonly articles: Article[],
   readonly categories: string[]
}

interface State {
   showCategories: boolean;
   search: string;
}

export class ArticlesPage extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = {
         showCategories: false,
         search: ''
      }

      this.setShowCategories = this.setShowCategories.bind(this);
      this.setSearch = this.setSearch.bind(this);
   }

   getSortedArticles(articles: Article[]): Article[] {
      let sorted = articles.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      return sorted;
   }

   getArticlesWithSearch(articles: Article[]): Article[] {
      const { search } = this.state;
      const regexp = new RegExp(search, 'i');
      return articles.filter(art => {
         if (regexp.test(art.title)) return true;
         if (regexp.test(art.subtitle)) return true;
         return false;
      })
   }

   setSearch(value: string) {
      const { search } = this.state;
      if (value !== search) {
         this.setState({ search: value });
      }
   }

   private setShowCategories() {
      this.setState({ showCategories: !this.state.showCategories })
   }

   render() {
      const { articles, categories } = this.props;
      const { search } = this.state;

      const firstArticle = this.getSortedArticles(articles)[0];
      const articlesWithSearch = this.getArticlesWithSearch(articles);
      const searchMessage = articlesWithSearch.length ?
         `${articlesWithSearch.length} articles ${articlesWithSearch.length > 1 ? 'match' : 'matches'} your search`
         : 'There are no matches for your search'

      return (
         <div className={styles.container}>
            <div style={{ padding: '.8rem' }}>
               <ArticleBanner article={firstArticle} />
            </div>

            <div className={styles.search}>
               <div>
                  {
                     search &&
                     <div className={styles.searchMessage}>{searchMessage}</div>
                  }
               </div>
               <SearchField
                  value={search}
                  changeHandler={this.setSearch}
                  isGlobalSearch={false}
                  placeholder='Search'
               />
            </div>

            <div className={styles.lists}>
               {
                  articlesWithSearch.length ?
                     <>
                        <ArticlesList
                           articles={this.getSortedArticles(articlesWithSearch)}
                           category='All categories'
                           showFirst={search ? true : false}
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
                                    articles={this.getArticlesWithSearch(articles.filter(article => article.category === category))}
                                    category={category}
                                    showFirst={true}
                                 />
                              )
                           })
                        }
                     </>
                     : null
               }

               {
                  !articlesWithSearch.length ?
                     <div style={{ marginTop: '3rem' }}><EmptyResult image='search field' /></div>
                     : null
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
