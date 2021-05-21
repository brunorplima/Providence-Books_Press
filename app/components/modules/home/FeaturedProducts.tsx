import { useRouter } from 'next/router';
import React from 'react';
import Product from '../../../interfaces-objects/Product';
import styles from '../../../styles/home/FeaturedProducts.module.css';
import Button from '../../elements/button/Button';
import HorizontalScrollablelProductsList from '../products-list/HorizontalScrollableProductList';

interface Props {
   readonly featuredProducts: Product[];
}

const FeaturedProducts: React.FC<Props> = ({ featuredProducts }) => {
   const router = useRouter();

   return (
      <div className={styles.container}>
         <h2>FEATURED PRODUCTS</h2>

         <HorizontalScrollablelProductsList
            relatedProducts={featuredProducts}
            innerStyle={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}
            useSelectors
            useSlide
         />

         <div className={styles.button}>
            <Button
               label='MORE BOOKS'
               clickHandler={() => {
                  router.push('/bookstore');
               }}
            />
         </div>
      </div>
   )
}

export default FeaturedProducts
