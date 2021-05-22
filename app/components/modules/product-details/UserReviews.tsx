import React from 'react';
import { Review } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/product-details/UserReviews.module.css';
import generalStyles from '../../../styles/product-details/ProductDetails.module.css';
import UserReview from './UserReview';
import Button from '../../elements/button/Button';

interface Props {
   readonly reviews: Review[];
}

const UserReviews: React.FC<Props> = ({ reviews }) => {
   return (
      <div className={styles.container}>
         <h3>REVIEWS</h3>

         <div>
            {
               reviews.length ?
                  reviews.map((review: Review, idx) => {
                     return <div key={review._id} className={styles.userReviewPLositioner}>
                        <UserReview review={review} />
                        {
                           idx + 1 !== reviews.length &&
                           <div className={generalStyles.border}></div>
                        }
                     </div>
                  })
                  :
                  <p style={{ textAlign: 'center' }}>There are no reviews for this product yet.</p>
            }
         </div>

         <div className={styles.button}>
            <Button
               label="ADD YOUR VOICE"
               clickHandler={() => { }}
            />
         </div>

         <div style={{ display: 'grid', placeItems: 'center' }}>
            <div className={generalStyles.border}></div>
         </div>
      </div>
   )
}

export default UserReviews;
