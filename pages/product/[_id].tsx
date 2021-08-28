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
import { fetchDocs } from '../../app/firebase/fetch';

interface Props {
   readonly products: Product[];
   readonly reviews: Review[];
   readonly id: string;
}

interface State {
   readonly selectedImage: number;
   readonly relatedProducts: Product[];
   readonly product: Product;
}

class ProductDetails extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         selectedImage: 0,
         relatedProducts: [],
         product: null
      }

      this.setSelectedImage = this.setSelectedImage.bind(this);
   }

   componentDidMount() {
      this.setProduct()
   }

   componentDidUpdate() {
      const { products, id } = this.props
      const { product } = this.state
      if (product._id !== id) this.setProduct()
      const relatedProducts = products.filter(prod => prod.category === product?.category && prod._id !== product?._id)
      if (JSON.stringify(relatedProducts) !== JSON.stringify(this.state.relatedProducts)) {
         this.setState({ relatedProducts })
      }
   }

   setProduct() {
      const { products, id } = this.props
      const product: Product = products.find(product => product._id === id)
      this.setState({ product })
   }

   getSortedRelatedProductsList(): Product[] {
      const { product } = this.state;
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

      const { reviews } = this.props;
      const { product, selectedImage, relatedProducts } = this.state;

      return (
         <Frame style={{ display: 'flex', justifyContent: 'center' }}>
            <Head>
               <title>{product?.name}{product?.subtitle ? ' - ' + product?.subtitle : ''} - {product?.type}</title>
            </Head>

            <Frame className={styles.container}>
               {
                  product && (
                     <>
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

                        <UserReviews reviews={reviews} productId={product?._id} />

                        {
                           relatedProducts?.length > 0 &&
                           <RelatedProducts products={this.getSortedRelatedProductsList()} />
                        }
                     </>
                  )
               }
            </Frame>

         </Frame>
      )
   }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { _id } = context.params;
   const reviews = await fetchDocs<Review>(`products/${_id}/reviews`)

   return {
      props: {
         id: _id,
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

const mapStateToProps = ({ products }: { products: Product[] }) => ({ products })

export default connect(mapStateToProps)(ProductDetails);
