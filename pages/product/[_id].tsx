import { GetServerSideProps, NextApiRequest } from 'next'
import React, { Component } from 'react'
import BackButton from '../../app/components/elements/back-button/BackButton'
import CirclesUI from '../../app/components/elements/circles-ui/CirclesUI'
import Frame from '../../app/components/layouts/Frame'
import UserReviews from '../../app/components/modules/product-details/UserReviews'
import ProductDetailsText from '../../app/components/modules/product-details/ProductDetailsText'
import ProductDetailsVisual from '../../app/components/modules/product-details/ProductDetailsVisual'
import ProvidenceReview from '../../app/components/modules/product-details/ProvidenceReview'
// import RelatedProducts from '../../app/components/modules/product-details/RelatedProducts'
import { Review } from '../../app/interfaces-objects/interfaces'
import Product from '../../app/interfaces-objects/Product'
import styles from '../../app/styles/product-details/ProductDetails.module.css'
import reviewsJSON from '../api/reviews/dataCreator'
import Head from 'next/head'
import Book from '../../app/interfaces-objects/Book'
import EBook from '../../app/interfaces-objects/EBook'
import AudioBook from '../../app/interfaces-objects/AudioBook'
import RelatedProducts from '../../app/components/modules/product-details/RelatedProducts'

interface Props {
   product: Product,
   relatedProducts: Product[],
   reviews: Review[]
}

interface State {

}

export class ProductDetails extends Component<Props, State> {

   componentDidMount() {

   }

   getSortedRelatedProductsList():  Product[] {
      const { product, relatedProducts } = this.props;
      const sameAuthorList: Product[] = []; 
      const differentAuthorList: Product[] = []; 
      
      relatedProducts.forEach(prod => {
         const specProd = (prod as Book | EBook | AudioBook);
         const bools: Boolean[] = specProd._authorIds.map(id => (product as Book | EBook | AudioBook)._authorIds.includes(id));
         if(bools.includes(true)) {
            sameAuthorList.push(specProd);
            return;
         } else {
            differentAuthorList.push(specProd);
            return;
         }
      })
      
      return [...sameAuthorList, ...differentAuthorList]
   }

   render() {

      const { product, reviews } = this.props;

      return (
         <Frame style={{ display: 'flex', justifyContent: 'center' }}>
            <Head>
               <title>{product.name}{product.subtitle ? ' - ' + product.subtitle : ''} - {product.type}</title>
            </Head>

            <Frame className={styles.container}>
               <Frame className={styles.backBar}>
                  <BackButton />
                  <CirclesUI />
               </Frame>

               <Frame className={styles.productDetailsMain}>
                  <ProductDetailsText product={product} />
                  <ProductDetailsVisual
                     product={product}
                     reviews={reviews.length && reviews}
                  />
               </Frame>

               <Frame className={styles.border} />

               <ProvidenceReview providenceReview={product.providenceReview} />

               <Frame className={styles.border} />

               <UserReviews reviews={reviews} />

               <RelatedProducts products={this.getSortedRelatedProductsList()} />
            </Frame>

         </Frame>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;
   const productsRes = await fetch('https://providencebp.vercel.app/api/products/');
   const products = await productsRes.json();
   const product: Product = products.find((prod: Product) => prod._id === _id);

   const reviewsRes = await fetch('https://providencebp.vercel.app/api/reviews/');
   const allReviews = await reviewsRes.json();
   const reviews = allReviews.filter((review: Review) => review._productId === product._id).map((rev: Review) => {
      rev.dateTime = rev.dateTime.toString()
      return rev;
   })


   const relatedProducts: Product[] = products.filter((prod: Product) => (product.category === prod.category) && (product._id !== prod._id))

   return {
      props: {
         product,
         relatedProducts,
         reviews
      }
   }
}

export default ProductDetails
