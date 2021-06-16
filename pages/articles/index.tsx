import { GetServerSideProps } from 'next';
import React, { Component } from 'react';
import styles from '../../app/styles/articles/Articles.module.css';
import ArticlesList from '../../app/components/modules/articles/ArticlesList';
import { Article } from '../../app/interfaces-objects/interfaces';
import ArticleBanner from '../../app/components/modules/articles/ArticleBanner';
import Button from '../../app/components/elements/button/Button';
import SearchField from '../../app/components/elements/search-field/SearchField';
import EmptyResult from '../../app/components/elements/empty-result/EmptyResult';
import CategoriesIndex from '../../app/components/modules/articles/CategoriesIndex';
import { firestore } from '../../app/firebase/firebase';

interface Props {
   readonly articles: Article[]
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

   getCategories(articles: Article[]) {
      const categories: string[] = [];
      articles.forEach(art => {
         if (!categories.includes(art.category)) categories.push(art.category);
      })
      return categories;
   }

   render() {
      const { articles } = this.props;
      const { search } = this.state;

      const firstArticle = this.getSortedArticles(articles)[0];
      const articlesWithSearch = this.getArticlesWithSearch(articles);
      const finalListLength = articlesWithSearch.length;
      const categories = this.getCategories(articlesWithSearch);
      const searchMessage = articlesWithSearch.length ?
         `${finalListLength} ${finalListLength > 1 ? 'articles match' : 'article matches'} your search`
         : 'There are no matches for your search'

      return (
         <div className={styles.container} style={{scrollBehavior: 'smooth'}}>
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
                           <>
                              <CategoriesIndex categories={categories} />
                              {
                                 categories.map(category => {
                                    return (
                                       <div key={category} id={category}>
                                          <ArticlesList
                                             articles={this.getArticlesWithSearch(articles.filter(article => article.category === category))}
                                             category={category}
                                             showFirst={true}
                                          />
                                       </div>
                                    )
                                 })
                              }
                           </>
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

   // const articles: Article[] = [];
   // const articlesRef = await firestore.collection('articles').get();
   // articlesRef.forEach(doc => articles.push(doc.data() as Article));
   const articlesRef = await fetch('https://providencebp.vercel.app/api/articles');
   const articles: Article[] = await articlesRef.json();

   return {
      props: {
         articles
      }
   }
}

export default ArticlesPage;
