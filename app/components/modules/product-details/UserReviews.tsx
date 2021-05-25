import React, { useState } from 'react';
import { Review } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/product-details/UserReviews.module.css';
import generalStyles from '../../../styles/product-details/ProductDetails.module.css';
import UserReview from './UserReview';
import Button from '../../elements/button/Button';
import ReviewsModal from './ReviewsModal';

interface Props {
   readonly reviews: Review[];
}

const UserReviews: React.FC<Props> = ({ reviews }) => {
   const [showModal, setShowModal] = useState<boolean>(false);
   const shortReviewsList = reviews.slice(0, 3);

   function backgroundCloseModal(e?: React.SyntheticEvent<HTMLDivElement>) {
      if (e.currentTarget === e.target) {
         setShowModal(!showModal)
      }
   }

   return (
      <div className={styles.container}>
         <h3>REVIEWS</h3>

         <div>
            {
               reviews.length ?
                  shortReviewsList.map((review: Review, idx) => {
                     return <div key={review._id} className={styles.userReviewPLositioner}>
                        <UserReview review={review} />
                        {
                           idx + 1 !== shortReviewsList.length &&
                           <div className={generalStyles.border}></div>
                        }
                     </div>
                  })
                  :
                  <p style={{ textAlign: 'center' }}>There are no reviews for this product yet.</p>
            }
         </div>

         <div className={styles.button}>
            {
               reviews.length > 3 &&
               <div style={{ marginRight: '1rem' }}>
                  <Button
                     label='SEE ALL REVIEWS'
                     clickHandler={() => setShowModal(true)}
                     style={{width: 145}}
                  />
               </div>
            }
            <Button
               label='ADD YOUR VOICE'
               clickHandler={() => { }}
               style={{width: 145}}
            />
         </div>

         <div style={{ display: 'grid', placeItems: 'center' }}>
            <div className={generalStyles.border}></div>
         </div>

         <ReviewsModal
            reviews={reviews}
            showModal={showModal}
            backgroundCloseModal={backgroundCloseModal}
            closeModal={() => setShowModal(false)}
         />
      </div>
   )
}

export default UserReviews;
