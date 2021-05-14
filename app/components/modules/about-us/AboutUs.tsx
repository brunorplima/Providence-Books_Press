import React from 'react';
import styles from '../../../styles/about-us/AboutUs.module.css';

const AboutUs = () => {
   return (
      <div className={styles.aboutusContainer}>
         <h1>About us</h1>

         <p>
            We are a small family-owned business, who desire to sell Christian books, and spread the word of God. We hope to provide an array of books from kid's stories to theological works. All this with the purpose of nurturing and cultivating the love and growth of the gospel.
         </p>

         <p>
            A radio show interview was one of the leading factors contributing to the establishment of this company. A guest on the show said something to the effect " They won't have to burn the books, because nobody reads them anyway". It is our sincere desire that God would rekindle in Christians a love for reading and study.
         </p>

         <p>
            We pray that we would bring praise to God's name by the literature we sell and in the daily actions of our company.
         </p>

         <p>
            Don't see a book you would like ? Send us an email, a message below or give us a call!
         </p>

         <div className={styles.biblicalPassage}>
            In Him was life, and the life was the light of men. (John 1:4)
         </div>
      </div>
   )
}

export default AboutUs
