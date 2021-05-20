import Head from 'next/head'
import Banner from '../app/components/elements/banner/Banner'
import CarouselContainer from '../app/components/modules/home/CarouselContainer'
import styles from '../app/styles/home/Home.module.css'

export default function Home() {
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
                  content={<div></div>}
               />
            </div>

            <div className={styles.carousel}>
               <CarouselContainer />
            </div>
         </div>
      </>
   )
}
