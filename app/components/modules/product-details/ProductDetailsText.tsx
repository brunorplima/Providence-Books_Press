import React from 'react'
import AudioBook from '../../../interfaces-objects/AudioBook'
import Book from '../../../interfaces-objects/Book'
import EBook from '../../../interfaces-objects/EBook'
import Product from '../../../interfaces-objects/Product'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import styles from '../../../styles/product-details/ProductDetailsText.module.css'
import ProductItemFlag from '../../elements/product-item/ProductItemFlag'
import { FaRegFileAudio } from 'react-icons/fa'
import { AiOutlineFileText, AiOutlineBook } from 'react-icons/ai'

interface Props {
   product: Product
}

const ProductDetailsText: React.FC<Props> = ({ product }) => {

   const bookVariant = ['Book', 'E-book', 'Audio book']

   function timeToString(time: Date): string {
      const hours = '0' + time.getHours();
      const minutes = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
      const seconds = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds();

      return `${hours}:${minutes}: ${seconds}`;
   }

   function getTypeIcons() {
      switch (product.type) {
         case 'Book':
            return <AiOutlineBook />;
         case 'E-book':
            return <AiOutlineFileText />
         case 'Audio book':
            return <FaRegFileAudio />
         default:
            return null
      }
   }

   return (
      <div className={styles.detailsText}>
         <div className={styles.categoryFlag}>
            <div className={styles.category}>{product.category}</div>
            <div className={styles.flag}><ProductItemFlag flag={product.flag.toUpperCase()} isRelativePos={true} /></div>
         </div>

         <div className={styles.detailsTextMain}>
            <div className={styles.productFullTitle}>
               <div className={styles.productName}>{product.name.toUpperCase()}</div>
               {
                  product.subtitle &&
                  <div className={styles.productSubtitle}>{product.subtitle.toUpperCase()}</div>
               }
            </div>

            <div className={styles.type}>{product.type} <div>{getTypeIcons()}</div></div>

            {
               product.type &&
               <div><span className={styles.boldFont}>BY:</span> {(product as Book | EBook | AudioBook).authors.toUpperCase()}</div>
            }

            {
               bookVariant.includes(product.type) &&
               <div><span className={styles.boldFont}>PUBLISHER:</span> {(product as Book | EBook | AudioBook).publisher.toUpperCase()}</div>
            }

            {
               product.type === bookVariant[2] &&
               <div><span className={styles.boldFont}>READY BY:</span> {(product as AudioBook).readBy.toUpperCase()}</div>
            }




            {/* <div>More info <RiArrowDropDownLine /></div> */}

            <div className={styles.moreInfoContent}>

               {
                  bookVariant.includes(product.type) &&
                  <div><span className={styles.boldFont}>ISBN:</span> {(product as Book | EBook | AudioBook).isbn}</div>
               }

               {
                  bookVariant.includes(product.type) && (product as Book | EBook | AudioBook).isbn &&
                  <div><span className={styles.boldFont}>AGE:</span> {(product as Book | EBook | AudioBook).age}</div>
               }

               {
                  bookVariant.includes(product.type) && (product as Book | EBook | AudioBook).subject &&
                  <div><span className={styles.boldFont}>SUBJECT:</span> {(product as Book | EBook | AudioBook).subject.toUpperCase()}</div>
               }

               {
                  (product.type === bookVariant[0] || product.type === bookVariant[1] && (product as Book | EBook).numberPages) &&
                  <div><span className={styles.boldFont}>PAGES:</span> {(product as Book | EBook).numberPages}</div>
               }

               {
                  (product.type === bookVariant[2] && (product as | AudioBook).duration && (product as AudioBook).duration) &&
                  <div><span className={styles.boldFont}>DURATION:</span> {timeToString(new Date((product as AudioBook).duration))}</div>
               }

               {
                  (product.type === bookVariant[2] || product.type === bookVariant[1]) && (product as AudioBook).fileExtensions.length &&
                  <div><span className={styles.boldFont}>FILE EXTENSIONS:</span> {(product as AudioBook).fileExtensions.join(', ')}</div>
               }

               {
                  product.type === bookVariant[0] && (product as Book).coverType &&
                  <div>{(product as Book).coverType.toUpperCase()}</div>
               }

            </div>



            <div className={styles.productDescription}>
               {
                  product.description.split('\n').map((paragraph => <p key={paragraph}>{paragraph}</p>))
               }
            </div>

            {
               product.tags.length &&
               <div className={styles.tagsContainer}>
                  <div className={styles.tag}>
                     TAGS
                     <div className={styles.tagTriangle}>
                        <div className={styles.tagHole}></div>
                     </div>
                  </div>

                  <div className={styles.tags}>{product.tags.join(', ')}</div>
               </div>
            }
         </div>
      </div>
   )
}

export default ProductDetailsText
