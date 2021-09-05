import React from 'react';
import { createPortal } from 'react-dom';
import { Review } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/product-details/ReviewsModal.module.css';
import Button from '../../elements/button/Button';
import UserReview from './UserReview';
import { IoMdClose } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai'

interface Props {
   readonly reviews: Review[];
   readonly showModal: boolean;
   readonly backgroundCloseModal: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
   readonly closeModal: () => void;
   readonly addYourVoice: () => void;
}

const ReviewsModal: React.FC<Props> = ({ reviews, showModal, backgroundCloseModal, closeModal, addYourVoice }) => {
   if (!showModal) return null;

   function getAverageScore() {
      let score = 0;
      reviews.forEach(review => score = score + review.score);
      return (score / reviews.length).toFixed(1);
   }

   return createPortal(
      <div className={styles.container} onClick={e => backgroundCloseModal(e)}>
         <div className={styles.reviews}>
            <div className={styles.closeIcon}>
               <div className={styles.icon} onClick={closeModal}>
                  <IoMdClose />
               </div>
            </div>

            <h3>REVIEWS</h3>

            <div className={styles.averageScore}>
               <div className={styles.score}>
                  <div>
                     <AiFillStar />
                  </div>
                  <div>
                     {getAverageScore()} / 5
                  </div>
               </div>
            </div>

            <div className={styles.reviewsList}>
               {
                  reviews.map(review => {
                     return (
                        <div key={review._id} className={styles.reviewItem}>
                           <UserReview review={review} />
                        </div>
                     )
                  })
               }
            </div>

            <div className={styles.buttons}>
               <Button
                  label='ADD YOUR VOICE'
                  clickHandler={addYourVoice}
               />
               <Button
                  label='CLOSE REVIEWS'
                  clickHandler={closeModal}
               />
            </div>
         </div>
      </div>,
      document.getElementById('dialog-modal')
   )
}

export default ReviewsModal;
