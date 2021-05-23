import React from 'react'
import Product from '../../../interfaces-objects/Product'
import AddToBookshelfButton from '../add-to-bookshelf-button/AddToBookshelfButton'
import styles from '../../../styles/product-details/ProductDetailsVisual.module.css'
import { Review } from '../../../interfaces-objects/interfaces'
import { AiFillStar } from 'react-icons/ai'

interface Props {
   readonly product: Product;
   readonly reviews?: Review[];
   readonly selectedImage: number;
   readonly setSelectedImage: (index: number) => void;
}

const ProductDetailsVisual: React.FC<Props> = ({ product, reviews, selectedImage, setSelectedImage }) => {

   const { name, images, price, subtitle } = product;

   function getAverageScore() {
      const scores = reviews.map((review: Review) => review.score);
      const totalScore = scores.reduce((a, b) => a + b);
      return (totalScore / scores.length).toFixed(1);
   }

   return (
      <div className={styles.detailsVisual}>
         <div>
            <img className={styles.image} src={images[selectedImage]} alt={name + subtitle ? ' - ' + subtitle : ''} />
         </div>
         {
            images.length > 1 &&
            <div className={styles.selectImages}>
               {
                  images.map((img: string, idx: number) => {
                     return (
                        <div
                           key={img}
                           className={styles.imageOptionContainer}
                           onClick={() => setSelectedImage(idx)}
                           style={selectedImage === idx ? { borderColor: 'black' } : {}}
                        >
                           <img className={styles.imageOption} src={img} alt={'Option #' + idx + 1} />
                        </div>
                     )
                  })
               }
            </div>
         }
         {
            reviews.length &&
            <div className={styles.scoreContainer}>
               <div className={styles.star}><AiFillStar /></div>
               <div className={styles.score}>{getAverageScore()} / 5</div>
               <div>({reviews.length} reviews)</div>
            </div>
         }
         <div className={styles.detailsVisualPrice}>PRICE: ${price.toFixed(2)}</div>
         <AddToBookshelfButton product={product} style={{ width: '100%', height: '37px' }} />
      </div>
   )
}

export default ProductDetailsVisual
