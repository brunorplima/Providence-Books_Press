import { GetServerSideProps } from 'next';
import React, { Component } from 'react';
import { Article } from '../../app/interfaces-objects/interfaces';
import Product from '../../app/interfaces-objects/Product';
import { ALL, ARTICLES, BOOKS } from '../../app/components/modules/search-results/constants';
import SearchResultsHeader, { ResultSelector } from '../../app/components/modules/search-results/SearchResultsHeader';
import SearchResultsAside from '../../app/components/modules/search-results/SearchResultsAside';
import styles from '../../app/styles/search-results/SearchResults.module.css';
import Frame from '../../app/components/layouts/Frame';
import ListInfo from '../../app/components/elements/list-info/ListInfo';
import ProductsList from '../../app/components/modules/products-list/ProductsList';
import Pagination from '../../app/components/elements/pagination/Pagination';
import getPaginationOptions from '../../app/util/paginationService';
import { ensurePaginationIsWithinBounds, getFilters, getMaxPage, populateProcessedList } from '../../app/util/listManipulation';
import { connect } from 'react-redux';
import { createSearchResultsListPageAction } from '../../app/redux/actions/listPageActions';
import ArticleCard from '../../app/components/elements/article-card/ArticleCard';
import OpenSearchFilterButton from '../../app/components/elements/open-search-filter-button/OpenSearchFilterButton';
import EmptyResult from '../../app/components/elements/empty-result/EmptyResult';

type ListTypes = typeof BOOKS | typeof ARTICLES

interface ResultItem<T> {
   readonly name: string;
   readonly itemList: T[];
}

export interface Results {
   readonly products: ResultItem<Product>;
   readonly articles: ResultItem<Article>;
}

interface Props {
   readonly search: string;
   readonly pagination: number;
   readonly products: Product[];
   readonly articles: Article[];
}

interface State {
   readonly view: string;
   readonly checkedCategories: string[];
   readonly checkedAuthors: string[];
   readonly checkedPublishers: string[];
   readonly processedProducts: Product[];
   readonly processedArticles: Article[];
   readonly maxPage: number;
   readonly modalOpen: boolean;
   readonly results: Results;
}

const initalResults: Results = {
   products: {
      name: '',
      itemList: []
   },
   articles: {
      name: '',
      itemList: []
   }
}

class SearchResultsPage extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         view: BOOKS,
         checkedCategories: [],
         checkedAuthors: [],
         checkedPublishers: [],
         processedProducts: [],
         processedArticles: [],
         maxPage: 0,
         modalOpen: false,
         results: initalResults
      }

      this.setView = this.setView.bind(this);
      this.setCheckedCategories = this.setCheckedCategories.bind(this);
      this.setCheckedAuthors = this.setCheckedAuthors.bind(this);
      this.setCheckedPublishers = this.setCheckedPublishers.bind(this);
      this.setModalOpen = this.setModalOpen.bind(this);
   }


   componentDidMount() {
      this.onRenderPopulateProducts();
      this.onRenderPopulateArticles();
      this.onRenderUpdatesMaxPage();
      ensurePaginationIsWithinBounds(this.props.pagination, this.state.maxPage, createSearchResultsListPageAction);
      this.setResults();
   }

   componentDidUpdate() {
      const { view } = this.state;
      if (view === BOOKS) this.onRenderPopulateProducts();
      if (view === ARTICLES) this.onRenderPopulateArticles();
      this.onRenderUpdatesMaxPage();
      ensurePaginationIsWithinBounds(this.props.pagination, this.state.maxPage, createSearchResultsListPageAction);
      this.setResults();
   }



   setResults() {
      const { search, products, articles } = this.props;
      const { results } = this.state;
      const regExp = new RegExp(search as string, 'i');
      const newResults: Results = {
         products: {
            name: BOOKS,
            itemList: products.filter(prod => {
               if (prod.name.match(regExp) || prod.subtitle?.match(regExp)) {
                  return true;
               }
               return false;
            })
         },
         articles: {
            name: ARTICLES,
            itemList: articles.filter(art => {
               if (art.title.match(regExp) || art.subtitle?.match(regExp)) {
                  return true;
               }
               return false;
            })
         },
      }
      if (JSON.stringify(results) !== JSON.stringify(newResults)) this.setState({ results: newResults });
   }

   onRenderPopulateProducts() {
      const { processedProducts, results } = this.state;
      const { list } = this.getListAndMaxPage(results.products.itemList);
      if (JSON.stringify(list) !== JSON.stringify(processedProducts)) {
         this.setState({ processedProducts: list as Product[] });
      }
   }

   onRenderPopulateArticles() {
      const { processedArticles, results } = this.state;
      const { list } = this.getListAndMaxPage(results.articles.itemList);
      if (JSON.stringify(list) !== JSON.stringify(processedArticles)) {
         this.setState({ processedArticles: list as Article[] });
      }
   }

   onRenderUpdatesMaxPage() {
      const { maxPage, view, processedProducts, processedArticles } = this.state;
      const { max } = this.getListAndMaxPage(view === BOOKS ? processedProducts : processedArticles);
      if (max !== maxPage) {
         this.setState({ maxPage: max });
      }
   }

   getListAndMaxPage(parsedList: Product[] | Article[]) {
      const { pagination } = this.props;
      const { checkedAuthors, checkedCategories, checkedPublishers, view } = this.state;
      const list = populateProcessedList<Product | Article>(
         parsedList,
         false,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         16
      );

      const max = getMaxPage<Product | Article>(
         parsedList,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         16,
         null,
         view !== ALL ? (view as ListTypes) : BOOKS
      );
      return { list, max };
   }


   /**
    * Sets the value of view state
    * 
    * @param view The string value to set view state
    */
   setView(view: string) {
      if (this.state.view !== view) {
         this.setState({
            view,
            checkedCategories: [],
            checkedAuthors: [],
            checkedPublishers: []
         });

      }
   }


   /**
    * Sets the value of checkedCategories state
    * 
    * @param categories The string array to set checkedCategories state
    */
   setCheckedCategories(categories: string[]) {
      const sortedCategories = categories.sort();
      if (JSON.stringify(this.state.checkedCategories) !== JSON.stringify(sortedCategories)) {
         this.setState({ checkedCategories: sortedCategories });
      }
   }


   /**
    * Sets the value of checkedAuthors state
    * 
    * @param authors The string array to set checkedAuthors state
    */
   setCheckedAuthors(authors: string[]) {
      const sortedAuthors = authors.sort();
      if (JSON.stringify(this.state.checkedAuthors) !== JSON.stringify(sortedAuthors)) {
         this.setState({ checkedAuthors: sortedAuthors });
      }
   }


   /**
    * Sets the value of checkedPublishers state
    * 
    * @param authors The string array to set checkedPublishers state
    */
   setCheckedPublishers(publishers: string[]) {
      const sortedPublishers = publishers.sort();
      if (JSON.stringify(this.state.checkedPublishers) !== JSON.stringify(sortedPublishers)) {
         this.setState({ checkedPublishers: sortedPublishers });
      }
   }


   /**
    * Set modalOpen state to the passed in value. It shows/hide the sidebar portal.
    * Only effective on smaller devices
    * 
    * @param value The value to set
    */
   setModalOpen(value: boolean) {
      this.setState({ modalOpen: value });
   }


   getTotalResults() {
      const { results } = this.state;
      const resultTypes: ResultItem<any>[] = Object.values(results);
      const total = resultTypes.reduce((a, b) => {
         return a + b.itemList.length
      }, 0);
      return { total, resultTypes };
   }

   getResultSelectors() {
      const resultSelectors: ResultSelector[] = [];
      const { total, resultTypes } = this.getTotalResults();

      // resultSelectors.push({
      //    name: ALL,
      //    amount: total
      // });
      resultTypes.forEach(type => {
         resultSelectors.push({
            name: type.name,
            amount: type.itemList.length
         })
      })

      return resultSelectors;
   }

   render() {
      const { pagination } = this.props;
      const { results } = this.state;
      const { view, processedProducts, processedArticles, maxPage, checkedCategories, checkedAuthors, checkedPublishers, modalOpen } = this.state;
      const { categories, authors, publishers } = view !== ALL && getFilters<Product | Article>(
         view === BOOKS ? results.products.itemList : results.articles.itemList,
         view === BOOKS ? BOOKS : ARTICLES
      );

      const paginatedProductsList = populateProcessedList<Product>(
         results.products.itemList,
         true,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         16,
      );

      const paginatedArticlesList = populateProcessedList<Article>(
         results.articles.itemList,
         true,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         16,
      )

      return (
         <>
            <div style={{ maxWidth: 1300, margin: '0 auto' }}>
               <SearchResultsHeader
                  view={view}
                  resultSelectors={this.getResultSelectors()}
                  setView={this.setView}
               />
            </div>

            <div className={styles.results}>

               {
                  view === ALL &&
                     results.products.itemList.length + results.articles.itemList.length ?
                     <SearchResultsAside
                        view={view}
                        categories={categories}
                        authors={authors}
                        publishers={[]}
                        checkedCategories={this.state.checkedCategories}
                        checkedAuthors={this.state.checkedAuthors}
                        checkedPublishers={[]}
                        setCheckedCategories={this.setCheckedCategories}
                        setCheckedAuthors={this.setCheckedAuthors}
                        setCheckedPublishers={undefined}
                        modalOpen={modalOpen}
                        setModalOpen={this.setModalOpen}
                     />
                     : null

               }
               {
                  view === BOOKS &&
                     results.products.itemList.length ?
                     <SearchResultsAside
                        view={view}
                        categories={categories}
                        authors={authors}
                        publishers={view === BOOKS && publishers}
                        checkedCategories={this.state.checkedCategories}
                        checkedAuthors={this.state.checkedAuthors}
                        checkedPublishers={view === BOOKS && this.state.checkedPublishers}
                        setCheckedCategories={this.setCheckedCategories}
                        setCheckedAuthors={this.setCheckedAuthors}
                        setCheckedPublishers={this.setCheckedPublishers}
                        modalOpen={modalOpen}
                        setModalOpen={this.setModalOpen}
                     />
                     : null
               }

               {
                  view === ARTICLES &&
                     results.articles.itemList.length ?
                     <SearchResultsAside
                        view={view}
                        categories={categories}
                        authors={authors}
                        publishers={[]}
                        checkedCategories={this.state.checkedCategories}
                        checkedAuthors={this.state.checkedAuthors}
                        checkedPublishers={[]}
                        setCheckedCategories={this.setCheckedCategories}
                        setCheckedAuthors={this.setCheckedAuthors}
                        setCheckedPublishers={undefined}
                        modalOpen={modalOpen}
                        setModalOpen={this.setModalOpen}
                     />
                     : null
               }


               {
                  view === ALL &&
                  // style and <div> are to be removed after right side of screen development
                  <Frame style={{ width: '100%' }}>
                     {
                        !this.getTotalResults().total ?
                           <EmptyResult image='search field' />
                           : <div></div>
                     }
                  </Frame>
               }

               {
                  view === BOOKS &&
                  <Frame style={{ width: '100%', paddingTop: '2rem' }}>
                     {
                        results.products.itemList.length ?
                           <ListInfo
                              nonPaginatedListLength={view === BOOKS ? processedProducts.length : processedArticles.length}
                              pagination={this.props.pagination}
                              options={getPaginationOptions(this.props.pagination, maxPage)}
                              setPagination={createSearchResultsListPageAction}
                           />
                           : null
                     }

                     <Frame style={{ width: '100%' }}>
                        {
                           results.products.itemList.length ?
                              <ProductsList
                                 products={paginatedProductsList}
                                 setModalOpen={this.setModalOpen}
                              />
                              : null
                        }

                        {
                           !processedProducts.length ?
                              <EmptyResult image='empty folder' />
                              : null
                        }
                     </Frame>


                     <Frame style={{ padding: 10, display: 'flex', justifyContent: 'end' }}>
                        <Pagination
                           pagination={this.props.pagination}
                           options={getPaginationOptions(this.props.pagination, maxPage)}
                           setPagination={createSearchResultsListPageAction}
                        />
                     </Frame>
                  </Frame>
               }

               {
                  view === ARTICLES &&
                  <Frame style={{ width: '100%', padding: '32px 0 0 0' }}>
                     {
                        results.articles.itemList.length ?
                           <Frame style={{ padding: 10, display: 'flex', justifyContent: 'end' }}>
                              <Pagination
                                 pagination={this.props.pagination}
                                 options={getPaginationOptions(this.props.pagination, maxPage)}
                                 setPagination={createSearchResultsListPageAction}
                              />
                           </Frame>
                           : null
                     }

                     <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                        {
                           results.articles.itemList.length ?
                              <>
                                 <OpenSearchFilterButton setModalOpen={this.setModalOpen} />
                                 {
                                    paginatedArticlesList.map(art => {
                                       return (
                                          <ArticleCard
                                             key={art._id}
                                             id={art._id}
                                             author={art.author}
                                             image={art.image}
                                             title={art.title}
                                             subtitle={art.subtitle}
                                          />
                                       )
                                    })
                                 }
                              </>
                              : null
                        }

                        {
                           !processedArticles.length ?
                              <EmptyResult image='empty folder' />
                              : null
                        }
                     </div>

                     <Frame style={{ padding: 10, display: 'flex', justifyContent: 'end' }}>
                        <Pagination
                           pagination={this.props.pagination}
                           options={getPaginationOptions(this.props.pagination, maxPage)}
                           setPagination={createSearchResultsListPageAction}
                        />
                     </Frame>
                  </Frame>
               }
            </div>
         </>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { search } = context.query;
   return {
      props: {
         search
      }
   }
}

type ReduxState = {
   readonly searchResultsListPage: number;
   readonly products: Product[];
   readonly articles: Article[];
}

const mapStateToProps = ({ searchResultsListPage, products, articles }: ReduxState) => ({
   pagination: searchResultsListPage,
   products,
   articles
})

export default connect(mapStateToProps)(SearchResultsPage);
