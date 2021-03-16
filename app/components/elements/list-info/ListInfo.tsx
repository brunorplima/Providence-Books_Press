import React from 'react'
import Frame from '../../layouts/Frame'
import Pagination from '../pagination/Pagination'

interface Props {
   paginatedListLength: number,
   nonPaginatedListLength: number,
   options: number[],
   pagination: number,
   setPagination: (pageNumber: number) => void
}

const ListInfo: React.FC<Props> = ({ 
   paginatedListLength,
   nonPaginatedListLength,
   options,
   pagination,
   setPagination
}) => {

   const frameStyle = {
      padding: 10,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
   }

   return (
      <Frame style={frameStyle}>
         <div>Showing {paginatedListLength} out of {nonPaginatedListLength}</div>

         <Pagination options={options} pagination={pagination} setPagination={setPagination} />
      </Frame>
   )
}

export default ListInfo
