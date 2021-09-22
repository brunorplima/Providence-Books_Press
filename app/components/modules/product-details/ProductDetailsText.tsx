import Link from 'next/link';
import React from 'react';
import AudioBook from '../../../interfaces-objects/AudioBook';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import Product from '../../../interfaces-objects/Product';
import styles from '../../../styles/product-details/ProductDetailsText.module.css';
import ProductItemFlag from '../../elements/product-item/ProductItemFlag';
import ProductType from '../../elements/product-type/ProductType';
import { TiInfoLarge } from 'react-icons/ti';

interface Props {
   readonly product: Product;
}

const ProductDetailsText: React.FC<Props> = ({ product }) => {

   const bookVariant = ['Book', 'E-book', 'Audio book'];

   return (
      <div className={styles.detailsText}>
         <div className={styles.categoryFlag}>
            <div className={styles.category}>{product.category}</div>
            <div className={styles.flag}><ProductItemFlag flag={product.flag?.toUpperCase()} isRelativePos={true} /></div>
         </div>

         <div className={styles.detailsTextMain}>
            <div className={styles.productFullTitle}>
               <div className={styles.productName}>{product.name.toUpperCase()}</div>
               {
                  product.subtitle &&
                  <div className={styles.productSubtitle}>{product.subtitle.toUpperCase()}</div>
               }
            </div>

            <ProductType type={product.type} margin={'.3rem 0 1rem 0'} />

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

            <div className={styles.moreInfoContent}>

               {
                  bookVariant.includes(product.type) &&
                  <div><span className={styles.boldFont}>ISBN:</span> {(product as Book | EBook | AudioBook).isbn}</div>
               }

               {
                  bookVariant.includes(product.type) && (product as Book | EBook | AudioBook).age &&
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
                  <div><span className={styles.boldFont}>DURATION:</span> {(product as AudioBook).duration}</div>
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
                  product.description.split('\n').map(((paragraph, idx) => <p key={paragraph + idx}>{paragraph}</p>))
               }
            </div>

            {
               product.tags?.length ?
               <div className={styles.tagsContainer}>
                  <div className={styles.tag}>
                     TAGS
                     <div className={styles.tagTriangle}>
                        <div className={styles.tagHole}></div>
                     </div>
                  </div>

                  <div className={styles.tags}>{product.tags.join(', ')}</div>
               </div> : null
            }

            {
               product.links && product.links.length ? (
                  <div className={styles.linksContainer}>
                     <div className={styles.linksIcon}>
                        <TiInfoLarge fontSize={24} />
                     </div>
                     {product.links.map((link, idx) => link?.description && link?.relProductId ?
                        <div className={styles.link} key={link.relProductId ? link.relProductId : idx}>
                           <Link href={`/product/${link.relProductId}`}>
                              <a className={styles.anchorLink}>
                                 {link.description}
                              </a>
                           </Link>
                        </div> : null
                     )}
                  </div>
               ) : null
            }
         </div>
      </div>
   )
}

export default ProductDetailsText;
