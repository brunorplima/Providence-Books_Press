import React from 'react'
import Product from '../../../interfaces-objects/Product'
import AddToBookshelfButton from '../add-to-bookshelf-button/AddToBookshelfButton'
import styles from '../../../styles/product-details/ProductDetailsVisual.module.css'
import { Review } from '../../../interfaces-objects/interfaces'
import { AiFillStar } from 'react-icons/ai'

interface Props {
   product: Product,
   reviews?: Review[]
}

const ProductDetailsVisual: React.FC<Props> = ({ product, reviews }) => {

   const { name, images, price, subtitle } = product;

   function getAverageScore() {
      const scores = reviews.map((review: Review) => review.score);
      const totalScore = scores.reduce((a, b) => a + b);
      return (totalScore / scores.length).toFixed(1);
   }

   return (
      <div className={styles.detailsVisual}>
         <div><img className={styles.image} src={images[0]} alt={name + subtitle ? ' - ' + subtitle : ''} /></div>
         {
            reviews.length &&
            <div className={styles.scoreContainer}>
               <div className={styles.star}><AiFillStar /></div>
               <div className={styles.score}>{getAverageScore()} / 5</div>
               <div>({reviews.length} reviews)</div>
            </div>
         }
         <div className={styles.detailsVisualPrice}>PRICE: ${price.toFixed(2)}</div>
         <AddToBookshelfButton product={product} style={{ width: '100%', paddingTop: '.6rem', paddingBottom: '.6rem' }} />
      </div>
   )
}

export default ProductDetailsVisual
