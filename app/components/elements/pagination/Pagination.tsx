import React from 'react'

interface Props {
   pagination: number,
   options: number[],
   setPagination: (pageNumber: number) => void
}

const Pagination: React.FC<Props> = ({ pagination, options, setPagination }) => {
   return (
      <div style={{ display: 'flex' }}>
         {
            options.map((option, idx) => {
               return (
                  <div 
                     key={option + idx}
                     onClick={() => setPagination(option)}
                     style={pagination === option ? {textDecoration: 'underline'} : {}}
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
