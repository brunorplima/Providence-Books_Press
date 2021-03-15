import React from 'react'
import Product from '../../../interfaces-objects/Product';
import HorizontalProductsList from './HorizontalProductsList'
import Frame from '../../layouts/Frame'
import useScreenWidth from '../../../util/useScreenWidth'

interface Props {
   products: Product[],
   nonPaginatedListLength: number
}

const ProductsList: React.FC<Props> = ({ products, nonPaginatedListLength }) => {

   const screenWidth = useScreenWidth();

   const frameStyle = {
      padding: 10,
      display: 'flex',
      flexWrap: 'wrap'
   }

   function numberItemsHorizontalList() {
      if (screenWidth <= 450) return 1;
      if (screenWidth <= 650) return 2;
      if (screenWidth <= 768) return 3;
      if (screenWidth <= 850) return 2;
      if (screenWidth <= 1050) return 3;
      if (screenWidth <= 1180) return 4;
      return 5;
   }

   function getHorizontalLists() {
      const eachLength = numberItemsHorizontalList();
      const splitted: Product[][] = []
      let idx = 0;
      while (idx < products.length) {
         if (idx + eachLength < products.length)
            splitted.push(products.slice(idx, idx + eachLength))
         else
            splitted.push(products.slice(idx, products.length))

         idx += eachLength;
      }

      return splitted;
   }

   const horizontalLists = getHorizontalLists();

   return (
      <div className='products-list'>
         <Frame style={frameStyle}>
            <div>Showing {products.length} out of {nonPaginatedListLength}</div>
         </Frame>
         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
               horizontalLists.map(list => <HorizontalProductsList productItems={list} />)
            }
         </div>
      </div>
   )
}

export default ProductsList
