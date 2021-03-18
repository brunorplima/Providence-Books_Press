import React from 'react'
import styles from '../../../styles/elements/Pagination.module.css'

interface Props {
   pagination: number,
   options: number[],
   setPagination: (pageNumber: number) => void
}

const Pagination: React.FC<Props> = ({ pagination, options, setPagination }) => {

   function handleClick(option: number) {
      setPagination(option);
      window.scroll(0,0)
   }

   return (
      <div style={{ display: 'flex' }}>
         {
            options.map((option, idx) => {
               return (
                  <div
                     key={`${option}-${idx}`}
                     className={idx !== 3 ? styles.paginationNumber : styles.paginationNumber + ' ' + styles.paginationNumberLast}
                     onClick={() => handleClick(option)}
                     style={pagination === option ? { backgroundColor: 'white', color: '#D7B263' } : {}}
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
