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
import { connect } from 'react-redux';
import Head from 'next/head';

interface Props {
   readonly articles: Article[];
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
         <div className={styles.container} style={{ scrollBehavior: 'smooth' }}>
            <Head>
               <title>Providence Books &amp; Providence - Home</title>
               <link rel="icon" href="/favicon.ico" />
               <meta name="google-site-verification" content="IxilHgh9SqGbEK4oEHxkBTW63SP2-aEZZz_WptAoly4" />

               {/* Open Graph */}
               <meta property="og:title" content='Providence Book Store - Articles' />
               <meta property="og:type" content="website" />
               <meta property="og:description" content="Providence is a family-owned business which sells Christian books, from kid's stories to theological works." />
               <meta
                  property="og:image"
                  content='https://firebasestorage.googleapis.com/v0/b/providence-2f91a.appspot.com/o/open-graph-assets%2FHnet.com-image.png?alt=media&token=8c93f376-77e4-421a-bf3d-d71a7e10f808'
               />
               <meta property="og:url" content="https://www.providencebookspress.com/" />
               <meta property="og:site_name" content='Providence Book Store' />
               <meta
                  name="twitter:card"
                  content="summary_large_image"
               />
            </Head>
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
                  !articlesWithSearch.length && search ?
                     <div style={{ marginTop: '3rem' }}><EmptyResult image='search field' /></div>
                     : null
               }

            </div>

         </div>
      )
   }
}

const mapStateToProps = state => ({
   articles: state.articles
})

export default connect(mapStateToProps)(ArticlesPage);
