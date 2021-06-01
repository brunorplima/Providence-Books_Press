import React from 'react'
import { AnyAction } from 'redux'
import Frame from '../../layouts/Frame'
import Pagination from '../pagination/Pagination'

interface Props {
   nonPaginatedListLength: number,
   options: number[],
   pagination: number,
   setPagination: (pageNumber: number) => AnyAction
}

const ListInfo: React.FC<Props> = ({
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
         <div>Showing {nonPaginatedListLength} products</div>

         <Pagination options={options} pagination={pagination} setPagination={setPagination} />
      </Frame>
   )
}

export default ListInfo
