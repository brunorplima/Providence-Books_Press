import React, { useEffect } from 'react'
import { store } from '../../../redux/store/store';
import styles from '../../../styles/elements/Pagination.module.css'

interface Props {
   pagination: number,
   options: number[],
   setPagination: (pageNumber: number) => any,
   noScroll?: boolean
}

const Pagination: React.FC<Props> = ({ pagination, options, setPagination, noScroll }) => {

   function handleClick(option: number) {
      store.dispatch(setPagination(option));
   }

   useEffect(() => {
      if (!noScroll)
         window.scroll(0,0);

   }, [pagination])

   return (
      <div style={{ display: 'flex' }}>
         {
            options.map((option, idx) => {
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
