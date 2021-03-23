import React from 'react'
import { Review } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/product-details/UserReviews.module.css'
import generalStyles from '../../../styles/product-details/ProductDetails.module.css'
import UserReview from './UserReview'

interface Props {
   reviews: Review[]
}

const UserReviews: React.FC<Props> = ({ reviews }) => {
   return (
      <div className={styles.container}>
         <h3>REVIEWS</h3>

         <div>
            {
               reviews.map((review: Review) => {
                  return <div key={review._id} className={styles.userReviewPLositioner}>
                     <UserReview review={review} />
                     <div className={generalStyles.border}></div>
                  </div>
               })
            }
         </div>
      </div>
   )
}

export default UserReviews
