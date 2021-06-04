import React, { useEffect } from 'react'
import { store } from '../../../redux/store/store';
import styles from '../../../styles/elements/Pagination.module.css'

interface Props {
   readonly pagination: number;
   readonly options: number[];
   readonly setPagination: (pageNumber: number) => any;
   readonly noScroll?: boolean;
   readonly isLocalState?: boolean;
}

const Pagination: React.FC<Props> = ({ pagination, options, setPagination, noScroll, isLocalState }) => {

   function handleClick(option: number) {
      if (isLocalState) {
         setPagination(option);
         return;
      }
      store.dispatch(setPagination(option));
   }

   useEffect(() => {
      if (!noScroll)
         window.scroll(0,0);

   }, [pagination])

   return (
      <div style={{ display: 'flex' }}>
         {
            options?.map((option, idx) => {
               return (
                  <div
                     key={`${option}-${idx}`}
                     className={idx !== 3 ? styles.paginationNumber : styles.paginationNumber + ' ' + styles.paginationNumberLast}
                     onClick={() => handleClick(option)}
                     style={pagination === option ? { backgroundColor: 'white', color: '#D7B263', cursor: 'default' } : {}}
                  >
                     {option}
                  </div>
               )
            })
         }
      </div>
   )
}

export default Pagination
