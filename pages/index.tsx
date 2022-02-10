import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Banner from '../app/components/elements/banner/Banner';
import Button from '../app/components/elements/button/Button';
import CarouselContainer from '../app/components/modules/home/CarouselContainer';
import FeaturedProducts from '../app/components/modules/home/FeaturedProducts';
import LatestArticles from '../app/components/modules/home/LatestArticles';
import Loading from '../app/components/modules/loading/Loading';
import { fetchDoc } from '../app/firebase/fetch';
import { getAll } from '../app/firebase/storage';
import { Article } from '../app/interfaces-objects/interfaces';
import Product from '../app/interfaces-objects/Product';
import styles from '../app/styles/home/Home.module.css';
import useScreenWidth from '../app/util/useScreenWidth';

interface Props {
   readonly articles: Article[];
   readonly products: Product[];
   readonly featuredProductIds: string[];
   readonly slideShowInterval: number;
   readonly featuredProductsSlideInterval: number;
}

const Home: React.FC<Props> = ({ articles = [], products = [], featuredProductIds = [], slideShowInterval = 5, featuredProductsSlideInterval = 5 }) => {
   const [slideShowUrlPaths, setSlideShowUrlPaths] = useState<string[]>([]);
   const [isSlideShowLoading, setIsSlideShowLoading] = useState(true);
   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

   useEffect(() => {
      fetchData()
   }, [])

   useEffect(() => {
      const featProds = products.filter(product => featuredProductIds.includes(product._id))
      setFeaturedProducts(featProds)
   }, [products])

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
            <title>Providence Books &amp; Providence - Home</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="google-site-verification" content="IxilHgh9SqGbEK4oEHxkBTW63SP2-aEZZz_WptAoly4" />

            {/* Open Graph */}
            <meta property="og:title" content='Providence Book Store' />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Providence is a family-owned business which sells Christian books, from kid's stories to theological works." />
            <meta
               property="og:image"
               content='https://firebasestorage.googleapis.com/v0/b/providence-2f91a.appspot.com/o/open-graph-assets%2FHnet.com-image.png?alt=media&token=8c93f376-77e4-421a-bf3d-d71a7e10f808'
            />
            <meta property="og:url" content="https://www.providencebookspress.com/" />
            <meta property="og:site_name" content='Providence Book Store' />
            <meta
               name="twitter:card"
               content="summary_large_image"
            />
         </Head>
         <div className={styles.container}>
            <div className={styles.banner}>
               <Banner
                  image='/banner/Church.JPG'
                  content={getBannerContent()}
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

const getBannerContent = () => {
   const router = useRouter();
   const screenWidth = useScreenWidth();
   const container: CSSProperties = {
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', transform: 'translateY(2rem)'
   }
   const image: CSSProperties = {
      width: screenWidth < 500 ? '90%' : screenWidth >= 500 && screenWidth < 1000 ? '70%' : '50%',
      maxWidth: 1200
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
               router.push('/about-us');
            }}
            style={button}
         />
      </div>
   )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
   type HomeSettings = {
      slideShowInterval: number
      featuredProductsSlideInterval: number
   }

   const fpIdsRef = await fetchDoc<{ ids: string[] }>('featured-products/ids')
   const featuredProductIds = fpIdsRef ? fpIdsRef.ids : [];
   const homeSettingsRef = await fetchDoc<HomeSettings>('settings/home');
   const slideShowInterval = homeSettingsRef ? homeSettingsRef.slideShowInterval : 6000;
   const featuredProductsSlideInterval = homeSettingsRef ? homeSettingsRef.featuredProductsSlideInterval : 7000;
   return {
      props: {
         featuredProductIds,
         slideShowInterval,
         featuredProductsSlideInterval
      }
   }
}

const mapStateToProps = (state: { articles: Article[], products: Product[] }) => ({
   articles: state.articles.slice(0, 3),
   products: state.products
})

export default connect(mapStateToProps)(Home);