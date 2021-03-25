import React from 'react'
import styles from '../../../styles/product-details/ProvidenceReview.module.css'

interface Props {
   providenceReview: string
}

const noReviewMessage = `We have unfortunately not had the oppurtunity yet to review this book.\nDue to the authors previous literature and thought we still at this time feel free to sell this book.\nLike any other book we ask that you would be like the Bereans and read with the scriptures open.\nDiscerning whether what is written is from God.`;

const ProvidenceReview: React.FC<Props> = ({ providenceReview }) => {
   return (
      <div className={styles.container}>
         <h3>PROVIDENCE BOOKS REVIEW</h3>
         {
            providenceReview ?
            providenceReview.split('\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)
            :
            noReviewMessage.split('\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)
         }
      </div>
   )
}

export default ProvidenceReview
