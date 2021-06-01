import React, { Component } from 'react';
import Head from 'next/head';
import Frame from '../../app/components/layouts/Frame';
import Sidebar from '../../app/components/modules/side-bar/SideBar';
import ProductsList from '../../app/components/modules/products-list/ProductsList';
import Pagination from '../../app/components/elements/pagination/Pagination';
import Product from '../../app/interfaces-objects/Product';
import ListInfo from '../../app/components/elements/list-info/ListInfo';
import { GetServerSideProps } from 'next';
import SideBarModal from '../../app/components/modules/side-bar/SideBarModal';
import { connect } from 'react-redux';
import getPaginationOptions from '../../app/util/paginationService';
import { ensurePaginationIsWithinBounds, getFilters, getMaxPage, populateProcessedList } from '../../app/util/listManipulation';
import { BOOKS } from '../../app/components/modules/search-results/constants';
import { createChangeListPageAction } from '../../app/redux/actions/listPageActions';

interface Props {
   readonly products: Product[];
   readonly pagination: number;
}

interface State {
   search: string;
   checkedCategories: string[];
   checkedAuthors: string[];
   checkedPublishers: string[];
   modalOpen: boolean;
   processedList: Product[];
   maxPage: number;
}

export class Bookstore extends Component<Props, State> {
   numberPaginationView: number;

   constructor(props) {
      super(props);

      this.state = {
         search: '',
         checkedCategories: [],
         checkedAuthors: [],
         checkedPublishers: [],
         modalOpen: false,
         processedList: [],
         maxPage: 0
      }

      this.numberPaginationView = 16;

      this.setCheckedCategories = this.setCheckedCategories.bind(this);
      this.setCheckedAuthors = this.setCheckedAuthors.bind(this);
      this.setCheckedPublishers = this.setCheckedPublishers.bind(this);
      this.setSearch = this.setSearch.bind(this);

      this.setModalOpen = this.setModalOpen.bind(this);
   }

   componentDidMount() {
      ensurePaginationIsWithinBounds(this.props.pagination, this.state.maxPage, createChangeListPageAction);
      this.onRenderChangeState();

   }

   componentDidUpdate() {
      ensurePaginationIsWithinBounds(this.props.pagination, this.state.maxPage, createChangeListPageAction);
      this.onRenderChangeState();
   }


   /**
    * Sets the value of search state
    * 
    * @param value The string value that will replace the current value of this.state.search
    */
   setSearch(value: string) {
      this.setState({ search: value })
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



   onRenderChangeState() {
      const { pagination, products } = this.props;
      const { search, checkedAuthors, checkedCategories, checkedPublishers, maxPage, processedList } = this.state;
      const list = populateProcessedList<Product>(
         products,
         false,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         this.numberPaginationView,
         search
      );
      const max = getMaxPage(
         products,
         checkedCategories,
         checkedAuthors,
         checkedPublishers,
         pagination,
         this.numberPaginationView,
         search
      );
      if (JSON.stringify(list) !== JSON.stringify(processedList)) {
         this.setState({ processedList: list });
      }
      if (JSON.stringify(max) !== JSON.stringify(maxPage)) {
         this.setState({ maxPage: max });
      }
   }


   render() {
      const { pagination, products } = this.props;
      const { search, checkedAuthors, checkedCategories, checkedPublishers, maxPage, processedList } = this.state;

      const paginatedSearchedFilteredList = populateProcessedList<Product>(
         this.props.products,
         true,
         this.state.checkedCategories,
         this.state.checkedAuthors,
         this.state.checkedPublishers,
         this.props.pagination,
         this.numberPaginationView,
         this.state.search,
      );

      const { categories, authors, publishers } = getFilters(this.props.products, BOOKS);

      return (
         <>
            <Head>
               <title>Bookstore - Providence Books &amp; Press</title>
            </Head>

            <SideBarModal
               portal={{
                  isOpen: this.state.modalOpen,
                  setModalOpen: this.setModalOpen
               }}
            >
               <Sidebar
                  search={search}
                  setSearch={this.setSearch}
                  categories={categories}
                  authors={authors}
                  publishers={publishers}
                  checkedCategories={checkedCategories}
                  checkedAuthors={checkedAuthors}
                  checkedPublishers={checkedPublishers}
                  setCheckedCategories={this.setCheckedCategories}
                  setCheckedAuthors={this.setCheckedAuthors}
                  setCheckedPublishers={this.setCheckedPublishers}
                  isPortal={true}
               />
            </SideBarModal>

            <Frame style={{ padding: '0 0 1.5rem 0', display: 'flex' }}>
               <Sidebar
                  search={search}
                  setSearch={this.setSearch}
                  categories={categories}
                  authors={authors}
                  publishers={publishers}
                  checkedCategories={checkedCategories}
                  checkedAuthors={checkedAuthors}
                  checkedPublishers={checkedPublishers}
                  setCheckedCategories={this.setCheckedCategories}
                  setCheckedAuthors={this.setCheckedAuthors}
                  setCheckedPublishers={this.setCheckedPublishers}
               />
               <Frame style={{ width: '100%', paddingTop: '2rem' }}>
                  <ListInfo
                     nonPaginatedListLength={processedList.length}
                     pagination={pagination}
                     options={getPaginationOptions(pagination, maxPage)}
                     setPagination={createChangeListPageAction}
                  />

                  <ProductsList
                     products={paginatedSearchedFilteredList}
                     setModalOpen={this.setModalOpen}
                  />

                  <Frame style={{ padding: 10, display: 'flex', justifyContent: 'end' }}>
                     <Pagination
                        pagination={pagination}
                        options={getPaginationOptions(pagination, maxPage)}
                        setPagination={createChangeListPageAction}
                     />
                  </Frame>
               </Frame>
            </Frame>
         </>
      )
   }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
   const res = await fetch('https://providencebp.vercel.app/api/products');
   const products = await res.json() as Product[];

   return {
      props: {
         products
      }
   }
}

const mapStateToProps = (state) => {
   return {
      pagination: state.listPage
   }
}

export default connect(mapStateToProps)(Bookstore)
