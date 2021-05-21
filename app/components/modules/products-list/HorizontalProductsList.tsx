import React, { CSSProperties } from 'react';
import Product from '../../../interfaces-objects/Product';
import ProductItem from '../../elements/product-item/ProductItem';
import styles from '../../../styles/products-list/HorizontalList.module.css';

interface Props {
   readonly productItems: Product[];
   readonly style?: CSSProperties;
}

const HorizontalProductsList: React.FC<Props> = ({ productItems, style }) => {
   return (
      <div className={styles.container} style={style}>
         {
            productItems.map((product) => {
               return (
                  <ProductItem
                     key={product._id}
                     product={product}
                  />
               )
            })
         }
      </div>
   )
}

export default HorizontalProductsList;
