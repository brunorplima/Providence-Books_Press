import React from 'react'
import Link from 'next/link'
import AddToBookshelfButton from '../add-to-bookshelf-button/AddToBookshelfButton'
import ProductItemFlag from './ProductItemFlag'
import ProductType from '../product-type/ProductType'
import styles from '../../../styles/products-list/ProductItem.module.css'

interface Props {
   productId: string,
   images?: string[],
   authors: string | null,
   name: string,
   price: number,
   flag: string,
   type: string,
   addToBookshelf: Function,
   subtitle?: string
}

const ProductItem: React.FC<Props> = ({
   productId,
   images,
   authors,
   name,
   price,
   flag,
   type,
   addToBookshelf,
   subtitle
}) => {

   return (
      <div className={styles.container}>
         <div className={styles.linkContainer}>
            <Link href={'/product/' + productId}>
               <a className={styles.infoContainer}>
                  <ProductItemFlag flag={flag.toUpperCase()} />
                  <div>
                     <img
                        src={images[0]}
                        style={{ maxWidth: '165px' }}
                     />
                     <div className={styles.author}>{authors.toUpperCase()}</div>
                     <ProductType type={type}  fontSize={'9pt'} padding={'.0 .2rem'} margin={'.1rem 0 0 0'}/>
                  </div>
                  <h2>{name.toUpperCase()}</h2>

                  {
                     subtitle && <div className={styles.subtitle}>{subtitle.toUpperCase()}</div>
                  }

                  <div style={{ flex: 1 }}></div>
                  
                  <p>$ {price.toFixed(2)}</p>
               </a>
            </Link>
         </div>

         <div>
            <AddToBookshelfButton clickHandler={() => addToBookshelf(productId)} />
         </div>
      </div>
   )
}

export default ProductItem
