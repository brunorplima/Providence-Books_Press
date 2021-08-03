import { GetServerSideProps } from 'next';
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
import { connect } from 'react-redux';
import { fetchDocs, fetchRefs, Where } from '../../app/firebase/fetch';

interface Props {
   readonly product: Product;
   readonly products: Product[]
   readonly reviews: Review[];
}

interface State {
   readonly selectedImage: number;
   readonly relatedProducts: Product[];
}

class ProductDetails extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         selectedImage: 0,
         relatedProducts: []
      }

      this.setSelectedImage = this.setSelectedImage.bind(this);
   }

   componentDidMount() {
      const { products, product } = this.props
      const relatedProducts = products.filter(prod => prod.category === product.category && prod._id !== product._id)
      this.setState({ relatedProducts })
   }

   getSortedRelatedProductsList(): Product[] {
      const { product } = this.props;
      const { relatedProducts } = this.state;
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

      const { product, reviews } = this.props;
      const { selectedImage, relatedProducts } = this.state;

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
   const where: Where = {
      field: '_id',
      condition: '==',
      value: _id
   }

   const productRef = (await fetchRefs('products', where))[0];
   if (!productRef || !productRef.exists) return {
      notFound: true
   }
   const product = productRef.data();
   const reviews = await fetchDocs<Review>(`products/${productRef.id}/reviews`)

   return {
      props: {
         product,
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

const mapStateToProps = ({ products }: { products: Product[] }) => ({  products })

export default connect(mapStateToProps)(ProductDetails);
