import React, { CSSProperties } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { addToWishlist } from '../../../firebase/add'
import { useAuth } from '../../contexts/AuthProvider'
import styles from '../../../styles/elements/WishlistButton.module.css'
import { updateWishlist } from '../../../firebase/update'

interface Props {
   readonly productId: string
   readonly style?: CSSProperties
}

const WishlistButton: React.FC<Props> = ({ productId, style }) => {
   const { firebaseUser, userWishlist } = useAuth()
   if (!firebaseUser) return null
   return (
      <div className={styles.favoriteButton} style={style} onClick={async () => {
         if (userWishlist.includes(productId))
            await updateWishlist(productId, firebaseUser.uid)
         else
            await addToWishlist(firebaseUser.uid, productId)
      }}>
         {
            // !firebaseUser && <AiOutlineHeart />
         }
         {
            firebaseUser &&
            <>
               {
                  userWishlist && userWishlist.includes(productId) ?
                     <AiFillHeart /> :
                     <AiOutlineHeart />
               }
            </>

         }
      </div>
   )
}

export default WishlistButton
