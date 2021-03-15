import React from 'react'
import Link from 'next/link'
import AddToBookshelfButton from '../add-to-bookshelf-button/AddToBookshelfButton'
import ProductItemFlag from './ProductItemFlag'
import styles from '../../../styles/products-list/ProductItem.module.css'

interface Props {
   productId: string,
   images?: string[],
   authors: string | null,
   name: string,
   price: number,
   addToBookshelf: Function
}

const ProductItem: React.FC<Props> = ({
   productId,
   images,
   authors,
   name,
   price,
   addToBookshelf
}) => {

   return (
      <div className={styles.container}>
         <div style={{}}>
            <Link href='#'>
               <a>
                  {/* {price > 40 && price < 70 && <ProductItemFlag flag='NEW' />} */}
                  <img 
                     src={images[0]}
                     style={{maxWidth: '165px'}}
                     />
                  <p>{authors}</p>
                  <h2>{name}</h2>
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
