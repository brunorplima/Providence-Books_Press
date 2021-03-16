import React from 'react'
import Product from '../../../interfaces-objects/Product';
import HorizontalProductsList from './HorizontalProductsList'
import useScreenWidth from '../../../util/useScreenWidth'
import styles from '../../../styles/products-list/ProductsList.module.css'

interface Props {
   products: Product[]
}

const ProductsList: React.FC<Props> = ({ products }) => {

   const screenWidth = useScreenWidth();

   function numberItemsHorizontalList() {
      if (screenWidth <= 450) return 1;
      if (screenWidth <= 650) return 2;
      if (screenWidth <= 767) return 3;
      if (screenWidth <= 850) return 2;
      if (screenWidth <= 1050) return 3;
      return 4;
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
         <div className={styles.listContainer}>
            {
               horizontalLists.map(list => <HorizontalProductsList key={JSON.stringify(list)} productItems={list} />)
            }
         </div>
      </div>
   )
}

export default ProductsList
