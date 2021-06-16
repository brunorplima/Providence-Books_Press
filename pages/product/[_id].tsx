import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React, { Component } from 'react';
import BackButton from '../../app/components/elements/back-button/BackButton';
import CirclesUI from '../../app/components/elements/circles-ui/CirclesUI';
import Frame from '../../app/components/layouts/Frame';
import UserReviews from '../../app/components/modules/product-details/UserReviews';
import ProductDetailsText from '../../app/components/modules/product-details/ProductDetailsText';
import ProductDetailsVisual from '../../app/components/modules/product-details/ProductDetailsVisual';
import ProvidenceReview from '../../app/components/modules/product-details/ProvidenceReview';
import { Review } from '../../app/interfaces-objects/interfaces';
import Product from '../../app/interfaces-objects/Product';
import styles from '../../app/styles/product-details/ProductDetails.module.css';
import Head from 'next/head';
import Book from '../../app/interfaces-objects/Book';
import EBook from '../../app/interfaces-objects/EBook';
import AudioBook from '../../app/interfaces-objects/AudioBook';
import RelatedProducts from '../../app/components/modules/product-details/RelatedProducts';
import { firestore } from '../../app/firebase/firebase';

interface Props {
   readonly product: Product;
   readonly relatedProducts: Product[];
   readonly reviews: Review[];
}

interface State {
   selectedImage: number;
}

class ProductDetails extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         selectedImage: 0
      }

      this.setSelectedImage = this.setSelectedImage.bind(this);
   }

   getSortedRelatedProductsList(): Product[] {
      const { product, relatedProducts } = this.props;
      const sameAuthorList: Product[] = [];
      const differentAuthorList: Product[] = [];

      relatedProducts.forEach(prod => {
         const specProd = (prod as Book | EBook | AudioBook);
         const bools: Boolean[] = specProd._authorIds.map(id => (product as Book | EBook | AudioBook)._authorIds.includes(id));
         if (bools.includes(true)) {
            sameAuthorList.push(specProd);
            return;
         } else {
            differentAuthorList.push(specProd);
            return;
         }
      })

      return [...sameAuthorList, ...differentAuthorList]
   }

   setSelectedImage(index: number) {
      const { selectedImage } = this.state;
      if (selectedImage !== index) {
         this.setState({ selectedImage: index });
      }
   }

   render() {

      const { product, reviews, relatedProducts } = this.props;
      const { selectedImage } = this.state;

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
                     selectedImage={selectedImage}
                     setSelectedImage={this.setSelectedImage}
                  />
               </Frame>

               <Frame className={styles.border} />

               <ProvidenceReview providenceReview={product.providenceReview} />

               <Frame className={styles.border} />

               <UserReviews reviews={reviews} />

               {
                  relatedProducts?.length > 0 &&
                  <RelatedProducts products={this.getSortedRelatedProductsList()} />
               }
            </Frame>

         </Frame>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;

   const productsRef = await fetch('https://providencebp.vercel.app/api/products');
   const products = await productsRef.json() as Product[];
   const product = products.find(prod => prod._id === _id);
   const relatedProducts = products.filter(prod => prod.category === product.category && prod._id !== product._id);
   const reviewsRef = await fetch(`http://localhost:3000/api/reviews/${product._id}`);
   const reviews: Review[] = await reviewsRef.json();

   // let product: Product;
   // const reviews: Review[] = [];
   // const productRef = await firestore.collection('products').where('_id', '==', _id).get();
   // productRef.forEach(async doc => {
   //    product = doc.data() as Product;
   //    const reviewsRef = await firestore.collection(`products/${doc.id}/reviews`).get();
   //    reviewsRef.forEach(revDoc => reviews.push(revDoc.data() as Review));
   // });

   if (!product) return {
      notFound: true
   }

   // const relatedProducts: Product[] = [];
   // const relRef = await firestore.collection('products').where('category', '==', product.category).where('_id', '!=', product._id).get();
   // relRef.forEach(doc => relatedProducts.push(doc.data() as Product));

   return {
      props: {
         product,
         relatedProducts,
         reviews
      }
   }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//    const products: Product[] = [];

//    const productsRef = await firestore.collection('products').get();
//    productsRef.forEach(doc => products.push(doc.data() as Product));

//    const paths = products.map(prod => ({ params: { _id: prod._id } }));
//    return {
//       paths,
//       fallback: 'blocking'
//    }
// }

export default ProductDetails;
