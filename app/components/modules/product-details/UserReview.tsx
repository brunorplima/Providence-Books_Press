import React from 'react'
import { Review } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/product-details/UserReviews.module.css'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface Props {
   review: Review
}

const UserReview: React.FC<Props> = ({ review }) => {

   function getScoreStars() {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(<div key={'star' + i} className={styles.star}>{i <= review.score ? <AiFillStar /> : <AiOutlineStar />}</div>)
      }
      return stars;
   }

   return (
      <div className={styles.reviewContainer}>
         <div className={styles.reviewUserScore}>
            {
               getScoreStars()
            }
            <div className={styles.reviewUserName}>{review.userName}</div>
         </div>

         {review.heading && <h4>{review.heading.toUpperCase()}</h4>}
         {
            review.text.split('\n').map((paragraph, idx) => <p className={styles.reviewText} key={paragraph + idx}>{paragraph}</p>)
         }
      </div>
   )
}

export default UserReview
