import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { AnyAction, Store } from 'redux';
import Banner from '../app/components/elements/banner/Banner';
import Button from '../app/components/elements/button/Button';
import CarouselContainer from '../app/components/modules/home/CarouselContainer';
import FeaturedProducts from '../app/components/modules/home/FeaturedProducts';
import LatestArticles from '../app/components/modules/home/LatestArticles';
import Loading from '../app/components/modules/loading/Loading';
import { firestore, storage } from '../app/firebase/firebase';
import { getAll } from '../app/firebase/storage';
import { Article } from '../app/interfaces-objects/interfaces';
import Product from '../app/interfaces-objects/Product';
import createLoadingAction from '../app/redux/actions/loadingAction';
import styles from '../app/styles/home/Home.module.css';
import useScreenWidth from '../app/util/useScreenWidth';

interface Props {
   readonly articles: Article[];
   readonly featuredProducts: Product[];
   readonly slideShowInterval: number;
   readonly featuredProductsSlideInterval: number;
}

const Home: React.FC<Props> = ({ articles, featuredProducts, slideShowInterval, featuredProductsSlideInterval }) => {
   const [slideShowUrlPaths, setSlideShowUrlPaths] = useState<string[]>([]);
   const [isSlideShowLoading, setIsSlideShowLoading] = useState(true);
   const store = useStore();

   useEffect(() => {
      fetchData()
   }, [])

   async function fetchData() {
      const images = await getAll('home-slide-show')
      const urls = images.map(img => img.url)
      setSlideShowUrlPaths(urls)
   }

   useEffect(() => {
      if (slideShowUrlPaths.length) {
         setIsSlideShowLoading(false);
      }
   }, [slideShowUrlPaths])

   return (
      <>
         <Head>
            <title>Providence B&amp;P</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="google-site-verification" content="IxilHgh9SqGbEK4oEHxkBTW63SP2-aEZZz_WptAoly4" />
         </Head>
         <div className={styles.container}>
            <div className={styles.banner}>
               <Banner
                  image='/banner/Church.JPG'
                  content={getBannerContent(store)}
               />
            </div>

            {
               slideShowUrlPaths.length > 0 ?
                  <div className={styles.carousel}>
                     <CarouselContainer
                        paths={slideShowUrlPaths}
                        intervalTime={slideShowInterval}
                     />
                  </div>
                  :
                  <div className={styles.carouselLoading}>
                     <Loading localIsLoading={isSlideShowLoading} />
                  </div>
            }

            <div className={styles.featuredProducts}>
               <FeaturedProducts
                  featuredProducts={featuredProducts}
                  slideInterval={featuredProductsSlideInterval}
               />
            </div>

            <LatestArticles
               articles={articles}
            />
         </div>
      </>
   )
}

const getBannerContent = (store: Store<any, AnyAction>) => {
   const router = useRouter();
   const screenWidth = useScreenWidth();
   const container: CSSProperties = {
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', transform: 'translateY(2rem)'
   }
   const image: CSSProperties = {
      width: screenWidth < 500 ? '90%' : screenWidth >= 500 && screenWidth < 1000 ? '70%' : '50%'
   }
   const button: CSSProperties = {
      borderColor: 'white',
      backgroundColor: 'rgba(0, 0, 0, .2)',
      marginTop: '2rem',
      fontWeight: 'bolder'
   }

   return (
      <div style={container}>
         <img
            src='/full-logo-min.png'
            alt='Providence Books &amp; Press'
            style={image}
         />
         <Button
            label='ABOUT US'
            clickHandler={() => {
               store.dispatch(createLoadingAction(true));
               router.push('/about-us');
            }}
            style={button}
         />
      </div>
   )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
   const articles: Article[] = [];
   const artRef = await firestore.collection('articles').orderBy('datePosted', 'desc').limit(3).get();
   artRef.forEach(doc => articles.push(doc.data() as Article));

   const featuredProducts: Product[] = [];
   const featProdIdsRef = await firestore.collection('featured-products').doc('ids').get();
   const featProdIds = featProdIdsRef.data().ids as string[];
   for (const id of featProdIds) {
      const prodRef = await firestore.collection('products').where('_id', '==', id).get()
      prodRef.docs.forEach(doc => {
         featuredProducts.push(doc.data() as Product)
      })
   }

   const homeSettingsRef = await firestore.doc('settings/home').get();
   const homeSettings = homeSettingsRef.data();
   const slideShowInterval: number = homeSettings.slideShowInterval;
   const featuredProductsSlideInterval: number = homeSettings.featuredProductsSlideInterval;
   return {
      props: {
         articles,
         featuredProducts,
         slideShowInterval,
         featuredProductsSlideInterval
      }
   }
}

export default Home;