import React from 'react'
import Product from '../../../interfaces-objects/Product'
import ProductItem from '../../elements/product-item/ProductItem'
import styles from '../../../styles/products-list/HorizontalList.module.css'

interface Props {
   productItems: Product[]
}

const HorizontalProductsList: React.FC<Props> = ({ productItems }) => {
   return (
      <div className={styles.container}>
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

export default HorizontalProductsList
