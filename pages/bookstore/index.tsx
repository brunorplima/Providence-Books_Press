import React, { Component } from 'react'
import Head from 'next/head'
import Frame from '../../app/components/layouts/Frame'
import Sidebar from '../../app/components/modules/side-bar/SideBar'
import ProductsList from '../../app/components/modules/products-list/ProductsList'
import Pagination from '../../app/components/elements/pagination/Pagination'
import books from '../../app/util/dataCreator'
import Product from '../../app/interfaces-objects/Product'
import Book from '../../app/interfaces-objects/Book'
import EBook from '../../app/interfaces-objects/EBook'
import AudioBook from '../../app/interfaces-objects/AudioBook'

interface Props {

}

interface State {
   search: string,
   checkedCategories: string[],
   checkedAuthors: string[],
   checkedPublishers: string[],
   pagination: number,
   numberPaginationView: number
}

export class Bookstore extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = {
         search: '',
         checkedCategories: [],
         checkedAuthors: [],
         checkedPublishers: [],
         pagination: 1,
         numberPaginationView: 15
      }

      this.setCheckedCategories = this.setCheckedCategories.bind(this);
      this.setCheckedAuthors = this.setCheckedAuthors.bind(this);
      this.setCheckedPublishers = this.setCheckedPublishers.bind(this);
      this.setSearch = this.setSearch.bind(this);

      this.setPagination = this.setPagination.bind(this);
   }

   componentDidMount() {
      this.ensurePaginationIsWithinBounds();
   }

   componentDidUpdate() {
      this.ensurePaginationIsWithinBounds();
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
    * Provides the necessary filter options for categories, authors and publishers.
    * Later it will be used to populate the list of options for FilterBox component.
    * 
    * @returns Filters for category, author and publisher
    */
   getFilters() {
      const products = books;
      const categories: string[] = [];
      const authors: string[] = [];
      const publishers: string[] = [];
      products.forEach(product => {
         if (!categories.includes(product.category)) categories.push(product.category);
         if (!authors.includes(product.authors)) authors.push(product.authors);
         if (!publishers.includes(product.publisher)) publishers.push(product.publisher);
      })
      return { categories, authors, publishers };
   }




   /**
    * 
    * @param list 
    * @returns 
    */
   applyFilterToList(list: Product[]): Product[] {
      let productsList = [...list];
      const { checkedCategories, checkedAuthors, checkedPublishers } = this.state;

      if (checkedCategories.length) {
         productsList = productsList.filter(product => checkedCategories.includes((product as Book | EBook | AudioBook).category));
      }

      if (checkedAuthors.length) {
         productsList = productsList.filter(product => checkedAuthors.includes((product as Book | EBook | AudioBook).authors));
      }

      if (checkedPublishers.length) {
         productsList = productsList.filter(product => checkedPublishers.includes((product as Book | EBook | AudioBook).publisher));
      }

      return productsList.sort((a, b) => a.name > b.name ? 1 : -1);
   }

   /**
    * 
    * @param list 
    * @returns 
    */
   applySearchToList(list: Product[]): Product[] {
      const regex = new RegExp(`${this.state.search}`, 'i');
      const newList = list.filter(product => regex.test(product.name) || regex.test(product.subtitle));
      return newList;
   }

   /**
    * 
    * @param list 
    * @returns 
    */
   applyPaginationToList(list: Product[]): Product[] {
      let viewList = list.filter((prod, idx) => {
         const max = this.state.pagination * this.state.numberPaginationView - 1;
         const min = max - this.state.numberPaginationView + 1;
         if (idx >= min && idx <= max) return true;
         return false;
      })
      return viewList;
   }

   /**
    * 
    * @param list 
    * @param paginated 
    * @returns 
    */
   populateProcessedList(list: Product[], paginated: boolean): Product[] {
      const filteredList = this.applyFilterToList(books)
      const searchedFilteredList = this.applySearchToList(filteredList);

      if (!paginated) return searchedFilteredList;

      const paginatedSearchedFilteredList = this.applyPaginationToList(searchedFilteredList);
      return paginatedSearchedFilteredList;
   }




   /**
    * 
    * @returns 
    */
   getMaxPage() {
      const { numberPaginationView } = this.state;
      return Math.ceil(this.populateProcessedList(books, false).length / numberPaginationView);
   }


   /**
    * 
    * @param list 
    * @returns 
    */
   getPaginationOptions(list: Product[]): number[] {
      const { pagination } = this.state;
      const maxPage = this.getMaxPage();

      if (maxPage >= 4) {
         if (pagination > 1 && pagination < maxPage - 1) {
            return [pagination - 1, pagination, pagination + 1, maxPage];
         }
         else if (pagination === 1) {
            return [1, 2, 3, maxPage];
         } else if (pagination >= maxPage - 1) {
            return [maxPage - 2, maxPage - 1, maxPage];
         }
      } else {
         const options: number[] = [];
         for (let i = 1; i <= maxPage; i++) {
            options.push(i);
         }
         return options;
      }
   }


   /**
    * 
    * @param pageNumber 
    */
   setPagination(pageNumber: number) {
      const { pagination } = this.state

      if (pageNumber !== pagination)
         this.setState({ pagination: pageNumber });
   }


   /**
    * 
    */
   ensurePaginationIsWithinBounds() {
      const { pagination } = this.state;
      if (pagination < 1 || pagination > this.getMaxPage()) {
         if (pagination > this.getMaxPage()) {
            this.setPagination(this.getMaxPage());

         }
         else {
            this.setPagination(1);

         }
      }
   }


   render() {
      const outerFrameStyle = {
         padding: '1rem 1rem 1rem 0',
         display: 'flex'
      };

      const paginationFrame = {
         padding: 10,
         display: 'flex',
         flexWrap: 'wrap'
      }

      const searchedFilteredList = this.populateProcessedList(books, false);

      const paginatedSearchedFilteredList = this.populateProcessedList(books, true);

      const { categories, authors, publishers } = this.getFilters();

      return (
         <>
            <Head>
               <title>Bookstore</title>
            </Head>

            <Frame style={outerFrameStyle}>
               <Sidebar
                  search={this.state.search}
                  setSearch={this.setSearch}
                  categories={categories}
                  authors={authors}
                  publishers={publishers}
                  checkedCategories={this.state.checkedCategories}
                  checkedAuthors={this.state.checkedAuthors}
                  checkedPublishers={this.state.checkedPublishers}
                  setCheckedCategories={this.setCheckedCategories}
                  setCheckedAuthors={this.setCheckedAuthors}
                  setCheckedPublishers={this.setCheckedPublishers}
               />
               <Frame style={{}}>
                  <ProductsList 
                     products={paginatedSearchedFilteredList}
                     nonPaginatedListLength={searchedFilteredList.length}
                  />

                  <Frame style={{ ...paginationFrame, justifyContent: 'end' }}>
                     <Pagination
                        pagination={this.state.pagination}
                        options={this.getPaginationOptions(searchedFilteredList)}
                        setPagination={this.setPagination}
                     />
                  </Frame>
               </Frame>
            </Frame>

         </>
      )
   }
}

export default Bookstore
