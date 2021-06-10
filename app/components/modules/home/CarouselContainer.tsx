import React, { Component } from 'react';
import Carousel from './Carousel';
import styles from '../../../styles/home/Carousel.module.css';
import SlideSelectors from '../../elements/slide-selectors/SlideSelectors';

interface Props {
   readonly paths: string[];
   readonly intervalTime: number;
}

interface State {
   index: number;
}

export class CarouselContainer extends Component<Props, State> {

   interval: NodeJS.Timeout;

   constructor(props) {
      super(props);
      this.state = {
         index: 0,
      }

      this.goToNextImg = this.goToNextImg.bind(this);
      this.goToChosenImg = this.goToChosenImg.bind(this);
   }

   /**
    * Sets up the slide interval
    */
   componentDidMount() {
      const { intervalTime, paths } = this.props;
      if (paths.length) {
         this.interval = setInterval(() => {
            this.goToNextImg();
         }, intervalTime);
      }
   }

   componentDidUpdate(prevProps: Props) {
      const { paths, intervalTime } = this.props;
      const { paths: prevPaths } = prevProps;
      if (paths.length && JSON.stringify(paths) !== JSON.stringify(prevPaths)) {
         console.log('paths size: ', paths.length)
         this.interval = setInterval(() => {
            this.goToNextImg();
         }, intervalTime);
      }
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
      const { paths } = this.props;
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
      const { intervalTime } = this.props;
      if (index !== this.state.index) {
         clearInterval(this.interval);
         this.setState({ index });
         this.interval = setInterval(() => {
            this.goToNextImg();
         }, intervalTime);
      }
   }

   render() {
      const { index } = this.state;
      const { paths } = this.props;

      return (

         <div className={styles.container}>
            <Carousel
               paths={paths}
               index={index}
            />
            <SlideSelectors
               values={paths}
               index={index}
               goToChosenImg={this.goToChosenImg}
            />
         </div>
      )
   }
}

export default CarouselContainer
