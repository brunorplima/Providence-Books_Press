import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Product from '../../../interfaces-objects/Product';
import createLoadingAction from '../../../redux/actions/loadingAction';
import styles from '../../../styles/home/FeaturedProducts.module.css';
import Button from '../../elements/button/Button';
import HorizontalScrollablelProductsList from '../products-list/HorizontalScrollableProductList';

interface Props {
   readonly featuredProducts: Product[];
}

const FeaturedProducts: React.FC<Props> = ({ featuredProducts }) => {
   const router = useRouter();
   const dispatch = useDispatch();

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
                  dispatch(createLoadingAction(true));
                  router.push('/bookstore');
               }}
            />
         </div>
      </div>
   )
}

export default FeaturedProducts
