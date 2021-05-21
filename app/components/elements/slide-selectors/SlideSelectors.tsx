import React from 'react';
import styles from '../../../styles/home/SlideSelectors.module.css';

interface Props {
   readonly values: string[];
   readonly index: number;
   readonly goToChosenImg: (index: number) => void;
}

const SlideSelectors: React.FC<Props> = ({ values, index, goToChosenImg }) => {
   return (
      <div className={styles.container}>
         {
            values.map((path, idx) => {
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

export default SlideSelectors;
