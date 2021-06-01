import React from 'react';
import Product from '../../../interfaces-objects/Product';
import HorizontalProductsList from './HorizontalProductsList';
import useScreenWidth, { numberItemsHorizontalList } from '../../../util/useScreenWidth';
import styles from '../../../styles/products-list/ProductsList.module.css';
import OpenSearchFilterButton from '../../elements/open-search-filter-button/OpenSearchFilterButton';

interface Props {
   readonly products: Product[],
   readonly setModalOpen: (value: boolean) => void
}

const ProductsList: React.FC<Props> = ({ products, setModalOpen }) => {

   const screenWidth = useScreenWidth();

   function getHorizontalLists() {
      const eachLength = numberItemsHorizontalList(screenWidth);
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
      <div>
         <div className={styles.listContainer}>
            <OpenSearchFilterButton setModalOpen={setModalOpen} />

            {
               horizontalLists.map(list => <HorizontalProductsList key={JSON.stringify(list)} productItems={list} />)
            }
         </div>
      </div>
   )
}

export default ProductsList;
