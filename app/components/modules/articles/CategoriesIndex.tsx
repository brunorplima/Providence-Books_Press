import React from 'react';
import styles from '../../../styles/articles/CategoriesIndex.module.css';
import { BsListUl } from 'react-icons/bs';

interface Props {
   readonly categories: string[];
}

const CategoriesIndex: React.FC<Props> = ({ categories }) => {
   if (categories.length <= 2) return null;
   return (
      <div className={styles.container}>
         <div className={styles.heading}>
            <BsListUl fontSize='16pt'/>
            <h4>Categories Index</h4>
         </div>
         <ul className={styles.links}>
            {
               categories.map(cat => (
                  <li className={styles.item} key={cat}>
                     <a className={styles.anchor} href={`#${cat}`}>
                        {cat}
                     </a>
                  </li>
               ))
            }
         </ul>
      </div>
   )
}

export default CategoriesIndex;