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
   readonly results: Results;
   readonly search: string;
   readonly pagination: number;
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
}

class SearchResultsPage extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         view: ALL,
         checkedCategories: [],
         checkedAuthors: [],
         checkedPublishers: [],
         processedProducts: [],
         processedArticles: [],
         maxPage: 0,
         modalOpen: false
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
   }

   componentDidUpdate() {
      const { view } = this.state;
      if (view === BOOKS) this.onRenderPopulateProducts();
      if (view === ARTICLES) this.onRenderPopulateArticles();
      this.onRenderUpdatesMaxPage();
      ensurePaginationIsWithinBounds(this.props.pagination, this.state.maxPage, createSearchResultsListPageAction);
   }



   onRenderPopulateProducts() {
      const { results } = this.props;
      const { processedProducts } = this.state;
      const { list } = this.getListAndMaxPage(results.products.itemList);
      if (JSON.stringify(list) !== JSON.stringify(processedProducts)) {
         this.setState({ processedProducts: list as Product[] });
      }
   }

   onRenderPopulateArticles() {
      const { results } = this.props;
      const { processedArticles } = this.state;
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


   getResultSelectors() {
      const { results } = this.props;
      const resultSelectors: ResultSelector[] = [];
      const resultTypes: ResultItem<any>[] = Object.values(results);

      resultSelectors.push({
         name: ALL,
         amount: resultTypes.reduce((a, b) => {
            return a + b.itemList.length
         }, 0)
      });
      resultTypes.forEach(type => {
         resultSelectors.push({
            name: type.name,
            amount: type.itemList.length
         })
      })

      return resultSelectors;
   }

   render() {
      const { results, pagination } = this.props;
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
                  setCheckedPublishers={view === BOOKS ? this.setCheckedPublishers : undefined}
                  modalOpen={modalOpen}
                  setModalOpen={this.setModalOpen}
               />

               {
                  view === ALL &&
                  <div>{/* Yet to be implemented */}</div>
               }

               {
                  view === BOOKS &&
                  <Frame style={{ width: '100%', paddingTop: '2rem' }}>
                     <ListInfo
                        nonPaginatedListLength={view === BOOKS ? processedProducts.length : processedArticles.length}
                        pagination={this.props.pagination}
                        options={getPaginationOptions(this.props.pagination, maxPage)}
                        setPagination={createSearchResultsListPageAction}
                     />

                     <Frame style={{ width: '100%' }}>
                        <ProductsList
                           products={paginatedProductsList}
                           setModalOpen={this.setModalOpen}
                        />
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
                     <Frame style={{ padding: 10, display: 'flex', justifyContent: 'end' }}>
                        <Pagination
                           pagination={this.props.pagination}
                           options={getPaginationOptions(this.props.pagination, maxPage)}
                           setPagination={createSearchResultsListPageAction}
                        />
                     </Frame>

                     <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
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
   const fetchResults = await fetch('https://providencebp.vercel.app/api/search?search=' + (search as string));
   const results = await fetchResults.json();
   return {
      props: {
         results,
         search
      }
   }
}

const mapStateToProps = (state) => {
   return {
      pagination: state.searchResultsListPage
   }
}

export default connect(mapStateToProps)(SearchResultsPage);
