import React from 'react'
import Product from '../../../interfaces-objects/Product'
import HorizontalScrollableProductList from '../products-list/HorizontalScrollableProductList'
import styles from '../../../styles/product-details/RelatedProducts.module.css'

interface Props {
   products: Product[]
}

const RelatedProducts: React.FC<Props> = ({ products }) => {
   return (
      <div className={styles.container}>
         <h3>RELATED PRODUCTS</h3>

         <HorizontalScrollableProductList relatedProducts={products}/>

      </div>
   )
}  

export default RelatedProducts
