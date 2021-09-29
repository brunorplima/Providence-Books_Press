import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Article, User } from '../../../interfaces-objects/interfaces'
import Product from '../../../interfaces-objects/Product'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import { useAccountProvider } from '../../contexts/AccountProvider'
import AccountList from './AccountList'
import Box from './Box'
import UserGreeting from './UserGreeting'
import styles from '../../../styles/admin-user/UserDashboard.module.css'
import listStyles from '../../../styles/admin-user/AccountList.module.css'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Link from 'next/link'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import clsx from 'clsx'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { deleteAny } from '../../../firebase/delete'
import Dialog from '../dialog/Dialog'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'

interface Props {
   readonly user: User
   readonly products?: Product[]
   readonly articles?: Article[]
}

const UserDashboard: React.FC<Props> = ({ user, products, articles }) => {
   const {
      myReviews,
      listenForReviews,
      myComments,
      listenForComments,
      myOrders,
      listenForOrders
   } = useAccountProvider()

   useEffect(() => {
      if (myReviews && !myReviews.length) listenForReviews()
      if (myComments && !myComments.length) listenForComments()
      // if (myOrders && !myOrders.length) listenForOrders()
   }, [])

   function getProduct(id: string) {
      return products.find(product => product._id === id)
   }

   function getArticle(id: string) {
      return articles.find(article => article._id === id)
   }

   function getScoreStars(score: number) {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(<div key={'star' + i} className={styles.star}>{i <= score ? <AiFillStar /> : <AiOutlineStar />}</div>)
      }
      return stars;
   }

   async function deleteComment(articleId: string, commentId: string) {
      await deleteAny(`articles/${articleId}/comments`, commentId)
   }

   async function deleteReview(productId: string, reviewId: string) {
      await deleteAny(`products/${productId}/reviews`, reviewId)
   }

   return (
      <div>
         <UserGreeting userName={user?.firstName} />

         <Box title='YOUR ARTICLE COMMENTS' paddingAll>
            {
               !myComments?.length ? <p>You currently have no comments</p> : null
            }

            <AccountList>
               {
                  myComments?.map(comment => {
                     const article = getArticle(comment._articleId)
                     return (
                        <div key={comment._id + article._id} className={listStyles.rowContainer}>
                           <div className={listStyles.row}>
                              <div className={clsx(listStyles.data, styles.title)} style={{
                                 minWidth: 130
                              }}>
                                 <div style={{ textDecoration: 'underline' }}><Link href={`/articles/${article._id}`}><a>{article.title}</a></Link></div>
                                 {
                                    article.subtitle &&
                                    <div style={{ textDecoration: 'underline' }}><Link href={`/articles/${article._id}`}><a>{article.subtitle}</a></Link></div>
                                 }
                              </div>

                              <div className={listStyles.data} style={{ alignItems: 'center', minWidth: 75 }}>
                                 <div>{(comment.dateTime as Date).toDateString()}</div>
                              </div>

                              <div className={listStyles.text} style={{ flexBasis: '40%' }}>
                                 <TextTableData limit={150} text={comment.body} />
                              </div>

                              <div className={listStyles.controllers1}>
                                 <div><RiEdit2Line /></div>
                                 &nbsp;&nbsp;
                                 <div onClick={() => openDialog(comment._id)}><RiDeleteBin6Line /></div>
                              </div>
                           </div>

                           <div className={listStyles.controllers2}>
                              <div><RiEdit2Line /> Edit</div>
                              &nbsp;&nbsp;
                              <div onClick={() => openDialog(comment._id)}><RiDeleteBin6Line /> Delete</div>
                           </div>

                           <Dialog
                              name={comment._id}
                              message='Are you sure you want to delete this comment?'
                              buttonsOptions={[
                                 {
                                    label: 'CANCEL',
                                    clickHandler: closeDialog
                                 },
                                 {
                                    label: 'DELETE',
                                    clickHandler: () => deleteComment(comment._articleId, comment._id),
                                    secondaryStyle: true
                                 }
                              ]}
                           />
                        </div>
                     )
                  })
               }
            </AccountList>
         </Box>

         <Box title='YOUR PRODUCT REVIEWS' paddingAll>
            {
               !myReviews?.length ? <p>You currently have no reviews</p> : null
            }
            <AccountList>
               {
                  myReviews?.map(review => {
                     const product = getProduct(review._productId)
                     return (
                        <div key={review._id + product._id} className={listStyles.rowContainer}>
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
                                 <TextTableData limit={100} text={review.text} />
                              </div>

                              <div className={listStyles.controllers1}>
                                 <div><RiEdit2Line /></div>
                                 &nbsp;&nbsp;
                                 <div onClick={() => openDialog(review._id)}><RiDeleteBin6Line /></div>
                              </div>
                           </div>

                           <div className={listStyles.controllers2}>
                              <div><RiEdit2Line /> Edit</div>
                              &nbsp;&nbsp;
                              <div onClick={() => openDialog(review._id)}><RiDeleteBin6Line /> Delete</div>
                           </div>

                           <Dialog
                              name={review._id}
                              message='Are you sure you want to delete this review?'
                              buttonsOptions={[
                                 {
                                    label: 'CANCEL',
                                    clickHandler: closeDialog
                                 },
                                 {
                                    label: 'DELETE',
                                    clickHandler: () => deleteReview(review._productId, review._id),
                                    secondaryStyle: true
                                 }
                              ]}
                           />
                        </div>
                     )
                  })
               }
            </AccountList>
         </Box>

         <Box title='YOUR PURCHASES' paddingAll>
            {
               !myOrders?.length ? <p>You currently have no known orders</p> : null
            }
         </Box>
      </div>
   )
}

const mapStateToProps = ({ products, articles }: ReduxState) => ({ products, articles })

export default connect(mapStateToProps)(UserDashboard)

interface TextTableDataProps {
   readonly limit: number
   readonly text: string
}

const TextTableData: React.FC<TextTableDataProps> = ({ limit, text }) => {
   const [showingMore, setShowingMore] = useState(false)

   function buildText() {
      if (text.length <= limit) return text

      if (showingMore) return text
      else return text.substr(0, limit) + '...'
   }
   return (
      <>
         <div>
            {
               buildText() 
            }
         </div>
         {
            text.length > limit &&
            <div className={styles.seeMore} onClick={() => setShowingMore(!showingMore)}>
               See {showingMore ? 'less' : 'more'}
            </div>
         }
      </>
   )
}
