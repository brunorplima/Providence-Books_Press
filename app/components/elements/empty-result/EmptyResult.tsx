import React from 'react';
import styles from '../../../styles/elements/EmptyResult.module.css';

interface Props {
   readonly image: 'empty folder' | 'search field';
}

const EmptyResult: React.FC<Props> = ({ image }) => {
   const src = image === 'empty folder' ? '/search-results/folder.png' : '/search-results/search.png';
   return (
      <div className={styles.container}>
         <div className={styles.innerContainer}>
            <img className={styles.img} src={src} alt='There are no matches to your search' />
            <p className={styles.p}>There are no results matching your search criteria!</p>
         </div>
      </div>
   )
}

export default EmptyResult;
