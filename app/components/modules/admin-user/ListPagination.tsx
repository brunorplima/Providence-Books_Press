import React from 'react';
import styles from '../../../styles/admin-user/ListPagination.module.css';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
   readonly boxContainer: React.RefObject<HTMLElement>;
   readonly listToRender: any[];
   readonly pagination: number;
   readonly listPageMax: number;
   readonly increasePage: (highestPage: number) => boolean;
   readonly decreasePage: () => boolean;
   readonly toFirstPage: () => boolean;
   readonly toLastPage: (highestPage: number) => boolean;
   readonly doesScroll?: boolean;
}

const ListPagination: React.FC<Props> = ({
   boxContainer,
   listToRender,
   pagination,
   listPageMax,
   increasePage,
   decreasePage,
   toFirstPage,
   toLastPage,
   doesScroll
}) => {

   function paginate(action: '+' | '-' | 'first' | 'last') {
      let pageWasChanged: boolean;
      if (action === '+') pageWasChanged = increasePage(Math.ceil(listToRender.length / listPageMax));
      if (action === '-') pageWasChanged = decreasePage();
      if (action === 'first') pageWasChanged = toFirstPage();
      if (action === 'last') pageWasChanged = toLastPage(Math.ceil(listToRender.length / listPageMax));
      if (pageWasChanged && doesScroll) boxContainer.current.scrollIntoView();
   }

   return (
      <div className={styles.paginationControllers}>
         <div onClick={() => paginate('first')}><FaAngleDoubleLeft /></div>
         <div onClick={() => paginate('-')}><FaAngleLeft /></div>
         <div>
            {pagination * listPageMax - listPageMax + 1} - {pagination * listPageMax > listToRender.length ? listToRender.length : pagination * listPageMax}
         </div>
         <div onClick={() => paginate('+')}><FaAngleRight /></div>
         <div onClick={() => paginate('last')}><FaAngleDoubleRight /></div>
      </div>
   )
}

export default ListPagination
