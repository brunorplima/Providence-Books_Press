import React, { useState } from 'react';
import { Review } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/product-details/UserReviews.module.css';
import generalStyles from '../../../styles/product-details/ProductDetails.module.css';
import UserReview from './UserReview';
import Button from '../../elements/button/Button';
import ReviewsModal from './ReviewsModal';
import AddReviewModal from './AddReviewModal';
import { addReview } from '../../../firebase/add';
import { useAuth } from '../../contexts/AuthProvider';
import Dialog from '../dialog/Dialog';
import { ADD_REVIEW_COMMENT_UNLOGGED, ADD_REVIEW_REPEATED } from '../dialog/dialogNames';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import { useRouter } from 'next/router';

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
   const { providenceUser } = useAuth();
   const router = useRouter();
   const shortReviewsList = reviews.slice(0, 3);

   function backgroundCloseModal(e?: React.SyntheticEvent<HTMLDivElement>) {
      if (e.currentTarget === e.target) {
         setShowReviewsModal(false)
         setShowAddReviewModal(false)
      }
   }

   async function postReview() {
      const review: Review = {
         _id: Date.now().toString(),
         _userId: providenceUser._id,
         dateTime: new Date(Date.now()),
         text: textBody,
         userName: `${providenceUser.firstName} ${providenceUser.lastName}`,
         _productId: productId,
         score
      }
      if (heading) review.heading = heading;
      const reviewRef = await addReview(review, productId)
      if (reviewRef) {
         router.reload()
      }
   }

   function addYourVoice() {
      if (!providenceUser) {
         openDialog(ADD_REVIEW_COMMENT_UNLOGGED)
         return
      }
      for (const review of reviews) {
         if (review._userId === providenceUser._id) {
            openDialog(ADD_REVIEW_REPEATED)
            return
         }
      }
      setShowAddReviewModal(true)
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
                     style={{ width: 145 }}
                  />
               </div>
            }
            <Button
               label='ADD YOUR VOICE'
               clickHandler={() => addYourVoice()}
               style={{ width: 145 }}
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

         <Dialog
            name={ADD_REVIEW_COMMENT_UNLOGGED}
            message='You must have a Providence account and be logged in to post reviews!'
            buttonsOptions={[
               {
                  label: 'CLOSE',
                  clickHandler: closeDialog,
                  secondaryStyle: true
               }
            ]}
         />

         <Dialog
            name={ADD_REVIEW_REPEATED}
            message='You have already left a review for this product. You can only edit or delete your current review'
            buttonsOptions={[
               {
                  label: 'EDIT IT',
                  clickHandler: () => router.push('/account'),
                  secondaryStyle: true
               },
               {
                  label: 'CLOSE',
                  clickHandler: closeDialog
               }
            ]}
         />
      </div>
   )
}

export default UserReviews;
