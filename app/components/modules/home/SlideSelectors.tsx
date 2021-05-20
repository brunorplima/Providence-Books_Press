import React from 'react';
import styles from '../../../styles/home/SlideSelectors.module.css';

interface Props {
   readonly paths: string[];
   readonly index: number;
   readonly goToChosenImg: (index: number) => void;
}

const SlideSelectors: React.FC<Props> = ({ paths, index, goToChosenImg }) => {
   return (
      <div className={styles.container}>
         {
            paths.map((path, idx) => {
               if (idx === index) {
                  return (
                     <div
                        key={idx + path}
                        className={`${styles.selector} ${styles.selectedSelector}`}
                        onClick={() => goToChosenImg(idx)}
                     ></div>
                  )
               }
               return (
                  <div
                     key={idx + path}
                     className={styles.selector}
                     onClick={() => goToChosenImg(idx)}
                  ></div>
               )
            })
         }
      </div>
   )
}

export default SlideSelectors
