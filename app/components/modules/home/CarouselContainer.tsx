import { GetServerSideProps } from 'next';
import React, { Component } from 'react';
import Carousel from './Carousel';
import styles from '../../../styles/home/Carousel.module.css';
import SlideSelectors from './SlideSelectors';

interface State {
   index: number;
}

const paths = ['/carousel/1.jpeg', '/carousel/2.jpeg', '/carousel/3.jpg', '/carousel/4.jpg', '/carousel/5.jpg', '/carousel/6.jpg'];
const INTERVAL_TIME = 6000;

export class CarouselContainer extends Component<{}, State> {

   interval: NodeJS.Timeout;

   constructor(props) {
      super(props);
      this.state = {
         index: 0
      }

      this.goToNextImg = this.goToNextImg.bind(this);
      this.goToChosenImg = this.goToChosenImg.bind(this);
   }

   /**
    * Sets up the slide interval
    */
   componentDidMount() {
      this.interval = setInterval(() => {
         this.goToNextImg();
      }, INTERVAL_TIME);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }


   /**
    * Changes the index state from i to i + 1.
    * It changes the index state to 0 when index is equal to paths.length - 1
    */
   goToNextImg() {
      const { index } = this.state;
      if (index !== paths.length - 1) {
         this.setState({ index: index + 1 })
      }
      else {
         this.setState({ index: 0 })
      }
   }


   /**
    * Changes index state to the passed in argument value
    * 
    * @param index The number to set index state
    */
   goToChosenImg(index: number) {
      if (index !== this.state.index) {
         clearInterval(this.interval);
         this.setState({ index });
         this.interval = setInterval(() => {
            this.goToNextImg();
         }, INTERVAL_TIME);
      }
   }

   render() {
      const { index } = this.state;

      return (

         <div className={styles.container}>
            <Carousel
               paths={paths}
               index={index}
            />
            <SlideSelectors
               paths={paths}
               index={index}
               goToChosenImg={this.goToChosenImg}
            />
         </div>
      )
   }
}

export default CarouselContainer
