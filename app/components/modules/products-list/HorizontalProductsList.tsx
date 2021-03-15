import React from 'react'
import AudioBook from '../../../interfaces-objects/AudioBook'
import Book from '../../../interfaces-objects/Book'
import EBook from '../../../interfaces-objects/EBook'
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
                     productId={product._id}
                     images={product.images}
                     authors={(product as Book | EBook | AudioBook).authors}
                     name={product.name}
                     price={product.price}
                     addToBookshelf={() => { }}
                  />
               )
            })
         }
      </div>
   )
}

export default HorizontalProductsList
