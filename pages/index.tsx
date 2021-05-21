import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';
import Banner from '../app/components/elements/banner/Banner';
import Button from '../app/components/elements/button/Button';
import CarouselContainer from '../app/components/modules/home/CarouselContainer';
import FeaturedProducts from '../app/components/modules/home/FeaturedProducts';
import LatestArticles from '../app/components/modules/home/LatestArticles';
import { Article } from '../app/interfaces-objects/interfaces';
import Product from '../app/interfaces-objects/Product';
import styles from '../app/styles/home/Home.module.css';
import useScreenWidth from '../app/util/useScreenWidth';

interface Props {
   readonly articles: Article[];
   readonly featuredProducts: Product[];
}

const Home: React.FC<Props> = ({ articles, featuredProducts }) => {
   return (
      <>
         <Head>
            <title>Providence B&amp;P</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className={styles.container}>
            <div className={styles.banner}>
               <Banner
                  image='/banner/Church.JPG'
                  content={getBannerContent()}
               />
            </div>

            <div className={styles.carousel}>
               <CarouselContainer />
            </div>

            <div className={styles.featuredProducts}>
               <FeaturedProducts
                  featuredProducts={featuredProducts}
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
               router.push('/about-us');
            }}
            style={button}
         />
      </div>
   )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
   const fetchArticles = await fetch('http://localhost:3000/api/articles?limit=3&sorted=y');
   const articles = await fetchArticles.json();

   const fetchFeaturedProducts = await fetch('http://localhost:3000/api/products/featured');
   const featuredProducts = await fetchFeaturedProducts.json();
   return {
      props: {
         articles,
         featuredProducts
      }
   }
}

export default Home;