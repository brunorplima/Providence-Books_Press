import { ARTICLES, BOOKS } from "../components/modules/search-results/constants";
import AudioBook from "../interfaces-objects/AudioBook";
import Book from "../interfaces-objects/Book";
import EBook from "../interfaces-objects/EBook";
import { Article, ArticleAuthor } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";
import { store } from "../redux/store/store";


export interface ProductAndArticle {
   readonly category?: string;
   readonly authors?: string;
   readonly author?: ArticleAuthor;
   readonly publisher?: string;
   readonly name?: string;
   readonly title?: string;
}


 /**
 * Ensures the pagination state is not lower than 1 nor greater than the
 * biggest possible number of pages based on processed list length
 */
export const ensurePaginationIsWithinBounds = (pagination: number, maxPage: number, createListPageAction: (page: number) => ChangePaginationAction) => {
   if (pagination > maxPage) {
      if (maxPage > 0)
         setPagination(maxPage, pagination, createListPageAction);
      else
         setPagination(1, pagination, createListPageAction);
   }
}


interface ChangePaginationAction {
   readonly type: string;
   readonly payload: number;
}
/**
 * Sets the value for pagination state.
 * 
 * @param pageNumber New value to set
 */
export const setPagination = (pageNumber: number, pagination: number, createListPageAction: (page: number) => ChangePaginationAction) => {
   if (pageNumber !== pagination) {
      store.dispatch(createListPageAction(pageNumber));
   }
}


/**
 * Returns the biggest pagination number
 * 
 * @returns Max page number
 */
export const getMaxPage = <T extends ProductAndArticle>(
   list: T[],
   checkedCategories: string[],
   checkedAuthors: string[],
   checkedPublishers: string[],
   pagination: number,
   numberPaginationView: number,
   search?: string,
   listType?: typeof BOOKS | typeof ARTICLES 
   ) => {
   const processedList = populateProcessedList(
      list,
      false,
      checkedCategories,
      checkedAuthors,
      checkedPublishers,
      pagination,
      numberPaginationView,
      search ? search : undefined
   )
   return Math.ceil(processedList.length / numberPaginationView);
}



/**
 * Provides the necessary filter options for categories, authors and publishers.
 * Later it will be used to populate the list of options for FilterBox component.
 * 
 * @returns Filters for category, author and publisher
 */
 export const getFilters = <T extends ProductAndArticle>(list: T[], type: typeof BOOKS | typeof ARTICLES) => {
   const categories: string[] = [];
   const authors: string[] = [];
   const publishers: string[] = [];
   list.forEach(item => {
      if (!categories.includes(item.category)) categories.push(item.category);
      if (!publishers.includes(item.publisher)) publishers.push(item.publisher);
      if (type === BOOKS) {
         item.authors.split(' & ').forEach(author => {
            if (!authors.includes(author)) authors.push(author);
         });
      }
      else {
         if (!authors.includes(item.author.name)) authors.push(item.author.name);
      }
   })
   return { categories, authors, publishers };
}


/**
 * Populates a final list of products that will be rendered to the user.
 * In case it is needed information about the full processed list the paramater passed should be false
 * then it returns the full processed list instead of a paginated version of the full processed list.
 * 
 * @param list       Full list of products
 * @param paginated  Whether it should return a pagination or non-paginated version of processed list
 * @returns          Either full or paginated version of the processed list
 */
export const populateProcessedList = <T extends ProductAndArticle>(
   list: T[],
   paginated: boolean,
   checkedCategories: string[],
   checkedAuthors: string[],
   checkedPublishers: string[],
   pagination: number,
   numberPaginationView: number,
   search?: string
): T[] => {

   let processedList = applyFilterToList<T>(
      list,
      checkedCategories,
      checkedAuthors,
      checkedPublishers
   )
   

   if (search) processedList = applySearchToList(processedList, search);
   
   if (!paginated) return processedList;
   
   const paginatedSearchedFilteredList = applyPaginationToList<T>(processedList, pagination, numberPaginationView);
   return paginatedSearchedFilteredList;
}


/**
 * Applies pagination to the processed list (filtered by filters or search or both).
 * It provides a section of the processed list which will be rendered.
 * 
 * @param list The processed list
 * @returns    The paginated section 
 */
const applyPaginationToList = <T>(list: T[], pagination: number, numberPaginationView: number): T[] => {
   const max = pagination * numberPaginationView - 1;
   const min = max - numberPaginationView + 1;
   let viewList = list.filter((item, idx) => idx >= min && idx <= max)
   
   return viewList;
}



interface ApplySearchType {
   readonly name?: string;
   readonly title?: string;
   readonly subtitle?: string;
} /**
   * Applies the search text to the full list or a filtered list of product.
   * 
   * @param list A filtered or full list of products
   * @returns    A list of products matching the search text
   */
const applySearchToList = <T extends ApplySearchType>(list: T[], search: string): T[] => {
   const regex = new RegExp(search, 'i');
   let searchAppliedList: T[] = [];
   if ('name' in list[0]) searchAppliedList = list.filter(product => regex.test(product.name) || regex.test(product.subtitle));
   if ('title' in list[0]) searchAppliedList = list.filter(article => regex.test(article.title) || regex.test(article.subtitle));
   return searchAppliedList;
}


/**
 * Applies all filters the user selected to the full list of products.
 * 
 * @param list The full list of products
 * @returns    Thr list of products filtered by the user
 */
const applyFilterToList = <T extends ProductAndArticle>(
   list: T[],
   checkedCategories: string[],
   checkedAuthors: string[],
   checkedPublishers: string[]
): T[] => {
   let itemsList = [...list];

   if (checkedCategories.length) {
      itemsList = itemsList.filter(items => checkedCategories.includes(items.category));
   }

   if (checkedAuthors.length) {
      if ('authors' in list[0]) {
         itemsList = itemsList.filter(item => {
            const bools: boolean[] = [];
            item.authors.split(' & ').forEach(author => {
               bools.push(checkedAuthors.includes(author));
            })
            return bools.includes(true);
         });
      }
      else {
         itemsList = itemsList.filter(item => checkedAuthors.includes(item.author.name))
      }
   }
   
   if (checkedPublishers.length) {
      itemsList = itemsList.filter(item => checkedPublishers.includes(item.publisher));
   }

   function sortFunc(a: T, b: T) {
      if ('name' in list[0])
         return a.name > b.name ? 1 : -1
      return a.title > b.title ? 1 : -1
   }

   return itemsList.sort(sortFunc);
}