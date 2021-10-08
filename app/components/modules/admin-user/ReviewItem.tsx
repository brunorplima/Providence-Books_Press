import Link from "next/link";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { RiEdit2Line, RiSave3Fill } from "react-icons/ri";
import { updateReview } from "../../../firebase/update";
import { Review } from "../../../interfaces-objects/interfaces";
import { getFromProducts } from "../../../util/productModelHelper";
import listStyles from '../../../styles/admin-user/AccountList.module.css'
import styles from '../../../styles/admin-user/ReviewItem.module.css'
import TextTableData from "./TextTableData";

interface ReviewItemProps {
   readonly review: Review
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
   const [text, setText] = useState<string | null>(null)
   const product = getFromProducts(review._productId)

   function getScoreStars(score: number) {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(<div key={'star' + i} className={styles.star}>{i <= score ? <AiFillStar /> : <AiOutlineStar />}</div>)
      }
      return stars;
   }

   return (
      <div className={listStyles.rowContainer}>
         <div className={listStyles.row}>
            <div className={listStyles.data} style={{ maxWidth: 40 }}>
               <img className={styles.productImage} src={product.images[0]} alt={product.name} />
            </div>

            <div className={listStyles.data} style={{ minWidth: 160 }}>
               <div style={{ display: 'flex', color: 'var(--mainYellow)' }}>{getScoreStars(review.score)}</div>
               <div style={{ textDecoration: 'underline' }}><Link href={`/product/${product._id}`}><a>{product.name}</a></Link></div>
               {
                  product.subtitle &&
                  <div style={{ textDecoration: 'underline' }}><Link href={`/product/${product._id}`}><a>{product.subtitle}</a></Link></div>
               }
            </div>

            <div className={listStyles.data} style={{ alignItems: 'center', minWidth: 75 }}>
               <div>{(review.dateTime as Date).toDateString()}</div>
            </div>

            <div className={listStyles.text} style={{ flexBasis: '40%' }}>
               <TextTableData limit={100} text={review.text} editText={text} setEditText={setText} />
            </div>

            <div className={listStyles.controllers1}>
               {text === null && <div onClick={() => setText(review.text)}><RiEdit2Line /></div>}
               {
                  text !== null &&
                  <>
                     <div onClick={() => {
                        updateReview(review._productId, review._id, { text })
                        setText(null)
                     }}><RiSave3Fill /></div>
                     &nbsp;&nbsp;
                     <div onClick={() => setText(null)}><MdClose/></div>
                  </>
               }
            </div>
         </div>

         <div className={listStyles.controllers2}>
            {text === null && <div onClick={() => setText(review.text)}><RiEdit2Line /> Edit</div>}
            {
               text !== null &&
               <>
                  <div onClick={() => {
                        updateReview(review._productId, review._id, { text })
                        setText(null)
                     }}><RiSave3Fill /> Save</div>
                  &nbsp;&nbsp;
                  <div onClick={() => setText(null)}><MdClose/>Cancel</div>
               </>
            }
         </div>
      </div>
   )
}

export default ReviewItem