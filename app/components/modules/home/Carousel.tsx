import React from 'react';
import styles from '../../../styles/home/Carousel.module.css';
import withDimensions from 'react-with-dimensions';

interface Props {
   readonly index: number;
   readonly dimensions: DOMRectReadOnly;
   readonly paths: string[];
}

const Carousel: React.FC<Props> = ({ index, dimensions, paths }) => {
   const { width } = dimensions;

   return (
      <div
         id='slide-container'
         className={styles.slideContainer}
         style={{ height: width * 0.6 }}
      >
         <div
            className={styles.slide}
            style={{ left: (width * index) * -1 }}
         >
            {
               paths.map((path, idx) => <img key={path} src={path} alt={`Slide picture #${idx + 1}`} style={{ width }} />)
            }
         </div>
      </div>
   )
}

export default withDimensions(Carousel)
