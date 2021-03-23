import React from 'react'
import Product from '../../../interfaces-objects/Product'
import AddToBookshelfButton from '../../elements/add-to-bookshelf-button/AddToBookshelfButton'
import styles from '../../../styles/product-details/ProductDetailsVisual.module.css'

interface Props {
   name: string,
   images: string[],
   price: number,
   subtitle?: string,
   clickHandler: Function

}

const ProductDetailsVisual: React.FC<Props> = ({ name, images, price, subtitle, clickHandler }) => {

   return (
      <div className={styles.detailsVisual}>
         <div><img className={styles.image} src={images[0]} alt={name + subtitle ? ' - ' + subtitle : ''} /></div>
         <div className={styles.detailsVisualPrice}>PRICE: ${price.toFixed(2)}</div>
         <AddToBookshelfButton clickHandler={clickHandler} style={{ width: '100%', paddingTop: '.6rem', paddingBottom: '.6rem'}}/>
      </div>
   )
}

export default ProductDetailsVisual
