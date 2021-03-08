import React from 'react'
import Frame from '../../layouts/Frame'
import Link from 'next/link'
import Head from 'next/head'
import AddToBookshelfButton from '../add-to-bookshelf-button/AddToBookshelfButton'
import ProductItemFlag from './ProductItemFlag'

interface Props {
   productId: string,
   image?: string,
   author: string,
   name: string,
   price: number,
   addToBookshelf: Function
}

const ProductItem: React.FC<Props> = ({
   productId,
   image,
   author,
   name,
   price,
   addToBookshelf
}) => {

   const frameStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '.2rem',
      margin: 5,
      width: 560,
      flex: 1
   }

   return (
      <Frame style={{...frameStyle, width: 700}}>
         <div style={{}}>
            <Link href='#'>
               <a>
                  {/* {price > 40 && price < 70 && <ProductItemFlag flag='NEW' />} */}
                  <img 
                     src='https://elyssarpress.com/wp-content/uploads/2019/12/book-cover-placeholder.png'
                     style={{maxWidth: '148px'}}
                     />
                  <p>{author}</p>
                  <h2>{name}</h2>
                  <p>$ {price.toFixed(2)}</p>
               </a>
            </Link>
         </div>

         <div>
            <AddToBookshelfButton clickHandler={() => addToBookshelf(productId)} />
         </div>
      </Frame>
   )
}

export default ProductItem
