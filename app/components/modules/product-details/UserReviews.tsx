import React, { useState } from 'react';
import { Review } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/product-details/UserReviews.module.css';
import generalStyles from '../../../styles/product-details/ProductDetails.module.css';
import UserReview from './UserReview';
import Button from '../../elements/button/Button';
import ReviewsModal from './ReviewsModal';
import AddReviewModal from './AddReviewModal';
import { addReview } from '../../../firebase/add';

interface Props {
   readonly reviews: Review[];
   readonly productId: string
}

const UserReviews: React.FC<Props> = ({ reviews, productId }) => {
   const [showReviewsModal, setShowReviewsModal] = useState(false);
   const [showAddReviewModal, setShowAddReviewModal] = useState(false);
   const [score, setScore] = useState(0);
   const [heading, setHeading] = useState('');
   const [textBody, setTextBody] = useState('');
   const shortReviewsList = reviews.slice(0, 3);

   function backgroundCloseModal(e?: React.SyntheticEvent<HTMLDivElement>) {
      if (e.currentTarget === e.target) {
         setShowReviewsModal(false)
         setShowAddReviewModal(false)
      }
   }

   function postReview() {
      const review: Review = {
         _id: '98142',
         _userId: '742834',
         dateTime: new Date(Date.now()).toString(),
         text: textBody,
         userName: 'Mark Junsten',
         _productId: productId,
         score,
         heading
      }
      addReview(review, productId)
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
                     clickHandler={() => setShowReviewsModal(true)}
                     style={{width: 145}}
                  />
               </div>
            }
            <Button
               label='ADD YOUR VOICE'
               clickHandler={() => setShowAddReviewModal(true)}
               style={{width: 145}}
            />
         </div>

         <div style={{ display: 'grid', placeItems: 'center' }}>
            <div className={generalStyles.border}></div>
         </div>

         <ReviewsModal
            reviews={reviews}
            showModal={showReviewsModal}
            backgroundCloseModal={backgroundCloseModal}
            closeModal={() => setShowReviewsModal(false)}
         />

         <AddReviewModal
            showModal={showAddReviewModal}
            closeModal={() => setShowAddReviewModal(false)}
            backgroundCloseModal={backgroundCloseModal}
            onSubmit={postReview}
            score={score}
            setScore={score => setScore(score)}
            heading={heading}
            setHeading={setHeading}
            textBody={textBody}
            setTextBody={setTextBody}
         />
      </div>
   )
}

export default UserReviews;
