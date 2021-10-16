import React from 'react'
import Product from '../../../interfaces-objects/Product'
import { getFromProducts } from '../../../util/productModelHelper'
import styles from '../../../styles/admin-user/Wishlist.module.css'
import Box from './Box'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Link from 'next/link'
import useScreenWidth from '../../../util/useScreenWidth'
import { updateWishlist } from '../../../firebase/update'

interface Props {
   readonly wishtlist: string[]
   readonly userId: string
}

const Wishlist: React.FC<Props> = ({ wishtlist, userId }) => {
   const products: Product[] = wishtlist.map(id => getFromProducts(id))
   const screenWisth = useScreenWidth()

   return (
      <Box title='WISHLIST' paddingVertical>
         <div className={styles.table}>
            {
               products.length > 0 &&
               products.map((product, idx) => (
                  <div key={product._id}>
                     <div className={styles.row} style={idx % 2 == 0 ? { backgroundColor: 'var(--almostWhite' } : {}}>
                        <div className={styles.cell1}>
                           <Link href={`product/${product._id}`}>
                              <a>
                                 <img src={product.images[0]} alt={product.name}></img>
                              </a>
                           </Link>
                        </div>

                        <div className={styles.cell2}>
                           <Link href={`product/${product._id}`}>
                              <a>
                                 <div>{product.name}</div>
                                 {product.subtitle && <div>{product.subtitle}</div>}
                              </a>
                           </Link>
                           {
                              screenWisth <= 500 &&
                              <div className={styles.price}>
                                 <div>${product.price.toFixed(2)}</div>
                              </div>

                           }
                        </div>

                        {
                           screenWisth > 500 &&
                           <div className={styles.price}>
                              <div>${product.price.toFixed(2)}</div>
                           </div>
                        }

                        <div className={styles.controller}>
                           <div onClick={() => updateWishlist(product._id, userId)}>
                              <RiDeleteBin6Line />
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            }

            {
               products.length <= 0 &&
               <div className={styles.emptyList}>
                  <p>You have no products in you wish list</p>
               </div>
            }
         </div>
      </Box>
   )
}

export default Wishlist
