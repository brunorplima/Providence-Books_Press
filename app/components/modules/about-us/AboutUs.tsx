import React from 'react';
import styles from '../../../styles/about-us/AboutUs.module.css';

interface Props {
   readonly mainText: string[];
   readonly biblicalText: string;
}

const AboutUs: React.FC<Props> = ({ mainText, biblicalText }) => {
   console.log(mainText.length)
   return (
      <div className={styles.aboutusContainer}>
         <h1>About us</h1>

         {
            mainText.map(paragraph => <p key={paragraph}>{paragraph}</p>)
         }

         <div className={styles.biblicalPassage}>
            {biblicalText}
         </div>
      </div>
   )
}

export default AboutUs
