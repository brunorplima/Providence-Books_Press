import React from 'react'
import Product from '../../../interfaces-objects/Product'
import styles from '../../../styles/product-dropdown-menu/ProductSelectDropdownMenu.module.css'

interface Props {
   readonly products: Product[]
   readonly selectProduct: Function
   readonly search: string
}

const ProductSelectDropdownMenu: React.FC<Props> = ({ products, selectProduct, search }) => {

   const filteredResults = products.filter(product => product.name.match(new RegExp(search, 'i'))).slice(0, 20)

   return (
      <>
         {
            search ?
               <div className={styles.resultsContainer}>
                  {
                     filteredResults.length ?
                        filteredResults.map(product => (
                           <div key={product._id} className={styles.resultItem} onClick={() => selectProduct(product)}>
                              <div className={styles.img}><img src={product.images[0]} alt='Book cover' /></div>

                              <div className={styles.name}>
                                 <h5>{product.name}</h5>
                              </div>

                              <div className={styles.type}><div>{product.type}</div></div>
                           </div>
                        )) :
                        <div className={styles.resultItem}>
                           <div className={styles.img}></div>

                           <div className={styles.name}>
                              <h5>No results found</h5>
                           </div>

                           <div className={styles.type}><div></div></div>
                        </div>
                  }
               </div> : null
         }
      </>
   )
}

export default ProductSelectDropdownMenu
