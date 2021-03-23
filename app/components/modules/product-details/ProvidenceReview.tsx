import React from 'react'
import styles from '../../../styles/product-details/ProvidenceReview.module.css'

interface Props {
   providenceReview: string
}

const ProvidenceReview: React.FC<Props> = ({ providenceReview }) => {
   return (
      <div className={styles.container}>
         <h3>PROVIDENCE BOOKS REVIEW</h3>
         {
            providenceReview.split('\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)
         }
      </div>
   )
}

export default ProvidenceReview
