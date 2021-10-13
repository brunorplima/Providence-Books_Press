import React, { useState } from 'react'
import { Review } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/product-details/UserReviews.module.css'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import DropdownMenu from '../../elements/dropdown-menu/DropdownMenu'
import { RiFileEditFill } from 'react-icons/ri'
import { useAuth } from '../../contexts/AuthProvider'
import Button from '../../elements/button/Button'
import { useRouter } from 'next/router'
import { updateReview } from '../../../firebase/update'

interface Props {
   review: Review
}

const UserReview: React.FC<Props> = ({ review }) => {
   const [isMenuOpened, setIsMenuOpened] = useState(false)
   const [isEdit, setIsEdit] = useState(false)
   const [editText, setEditText] = useState(review.text)
   const { firebaseUser } = useAuth()
   const router = useRouter()

   function getScoreStars() {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(<div key={'star' + i} className={styles.star}>{i <= review.score ? <AiFillStar /> : <AiOutlineStar />}</div>)
      }
      return stars;
   }

   async function saveReview() {
      await updateReview(review._productId, review._id, { text: editText})
      router.reload()
   }

   return (
      <div className={styles.reviewContainer}>
         <div className={styles.reviewUserScore}>
            {
               getScoreStars()
            }
            <div className={styles.reviewUserName}>{review.userName}</div>
            <div style={{ flex: 1 }}></div>
            {
               review._userId === firebaseUser?.uid && !isEdit &&
               < DropdownMenu
                  {...{ isMenuOpened, setIsMenuOpened }}
                  customStyle={{ top: '100%' }}
               >
                  <div onClick={() => setIsEdit(true)}>
                     <RiFileEditFill /> &nbsp; Edit
                  </div>
               </DropdownMenu>
            }
         </div>

         {review.heading && <h4>{review.heading.toUpperCase()}</h4>}
         {
            !isEdit &&
            review.text.split('\n').map((paragraph, idx) => <p className={styles.reviewText} key={paragraph + idx}>{paragraph}</p>)
         }

         {
            isEdit &&
            <div>
               <textarea
                  className={styles.editText}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
               ></textarea>
               <div className={styles.editTextControllers}>
                  <Button
                     label='CANCEL'
                     clickHandler={() => setIsEdit(false)}
                     style={{ width: 120 }}
                  />

                  <Button
                     label='SAVE'
                     clickHandler={saveReview}
                     style={{ width: 120 }}
                  />
               </div>
            </div>
         }
      </div >
   )
}

export default UserReview
