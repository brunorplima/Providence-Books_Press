import React from 'react';
import AddToBookshelfButton from '../../modules/add-to-bookshelf-button/AddToBookshelfButton';
import ProductItemFlag from './ProductItemFlag';
import ProductType from '../product-type/ProductType';
import styles from '../../../styles/products-list/ProductItem.module.css';
import Product from '../../../interfaces-objects/Product';
import EBook from '../../../interfaces-objects/EBook';
import AudioBook from '../../../interfaces-objects/AudioBook';
import Book from '../../../interfaces-objects/Book';
import { useDispatch } from 'react-redux';
import LinkLoading from '../link-loading/LinkLoading';

interface Props {
   readonly product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {

   const {
      _id,
      images,
      authors,
      name,
      price,
      flag,
      type,
      subtitle
   } = (product as Book | EBook | AudioBook);
   const dispatch = useDispatch();

   return (
      <div className={styles.container}>
         <div className={styles.linkContainer}>
            <LinkLoading href={'/product/' + _id} className={styles.infoContainer}>
               <ProductItemFlag flag={flag.toUpperCase()} />
               <div>
                  <img
                     src={images[0]}
                     style={{ maxWidth: '165px' }}
                  />
                  <div className={styles.author}>{authors.toUpperCase()}</div>
                  <ProductType type={type} fontSize={'9pt'} padding={'.0 .2rem'} margin={'.1rem 0 0 0'} />
               </div>
               <h2>{name.toUpperCase()}</h2>

               {
                  subtitle && <div className={styles.subtitle}>{subtitle.toUpperCase()}</div>
               }

               <div style={{ flex: 1 }}></div>

               <p>$ {price.toFixed(2)}</p>
            </LinkLoading>
         </div>

         <div>
            <AddToBookshelfButton product={product} />
         </div>
      </div>
   )
}

export default ProductItem;
