import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import styles from '../../../styles/product-details/AddReviewModal.module.css'
import Button from '../../elements/button/Button'
import FormInput from '../form/FormInput'
import FormTextArea from '../form/FormTextArea'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { RiErrorWarningLine } from 'react-icons/ri'

interface Props {
   readonly showModal: boolean
   readonly backgroundCloseModal: (e?: React.SyntheticEvent<HTMLDivElement>) => void
   readonly onSubmit: () => void
   readonly closeModal: () => void
   readonly score: number
   readonly setScore: (score: number) => void
   readonly heading: string
   readonly setHeading: React.Dispatch<React.SetStateAction<string>>
   readonly textBody: string
   readonly setTextBody: React.Dispatch<React.SetStateAction<string>>
}

const AddReviewModal: React.FC<Props> = ({
   showModal,
   backgroundCloseModal,
   onSubmit,
   closeModal,
   score,
   setScore,
   heading,
   setHeading,
   textBody,
   setTextBody
}) => {
   if (!showModal) return null

   const [errorMessages, setErrorMessages] = useState<string[]>([])

   function getScoreStars() {
      const filledStars = [false, false, false, false, false]
      let newStars = filledStars;
      if (score) {
         newStars = filledStars.map((star, idx) => {
            if (idx + 1 <= score) return true
            return false
         })
      }
      return (
         <>
            {
               newStars.map((star, idx) => {
                  if (star) return <div key={idx} className={styles.star} onClick={() => setScore(idx + 1)}><AiFillStar size={30} /></div>
                  return <div key={idx} className={styles.star} onClick={() => setScore(idx + 1)}><AiOutlineStar size={30} /></div>
               })
            }
         </>
      )
   }

   function handleSubmit() {
      if (score && textBody) {
         onSubmit()
         closeModal()
         setScore(0)
         setHeading('')
         setTextBody('')
      }
      else {
         const errors: string[] = []
         if (!score) errors.push('Score is required')
         if (!textBody) errors.push('Review text is required')
         setErrorMessages(errors)
      }
   }

   return ReactDOM.createPortal(
      <div className={styles.AddReviewModalContainer} onClick={e => backgroundCloseModal(e)}>
         <div className={styles.AddReviewModal}>
            <div className={styles.closeIcon}>
               <div>Leave your review</div>
               <IoMdClose fontSize={28} onClick={closeModal} />
            </div>

            <div className={styles.form}>
               <div className={styles.score}>
                  {getScoreStars()}
               </div>

               <FormInput
                  type='text'
                  placeholder='Review title'
                  value={heading}
                  setValue={setHeading}
                  size='100%'
               />

               <FormTextArea
                  value={textBody}
                  setValue={setTextBody}
                  placeholder='Write your review here'
                  textareaClassName={styles.textarea}
                  isRequired
               />
            </div>

            {
               errorMessages.length ?
                  <div className={styles.errorMessages}>
                     {
                        errorMessages.map(error => <div key={error}><RiErrorWarningLine /> <span>{error}</span></div>)
                     }
                  </div> : null
            }

            <div style={{ flex: 1 }}></div>

            <div className={styles.buttons}>
               <Button
                  label='CANCEL'
                  clickHandler={closeModal}
                  style={{ width: 145 }}
               />
               <Button
                  label='POST'
                  clickHandler={handleSubmit}
                  style={{ width: 145 }}
               />
            </div>
         </div>
      </div>,
      document.getElementById('add-review-modal')
   )
}

export default AddReviewModal
