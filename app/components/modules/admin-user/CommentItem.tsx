import React, { useState } from 'react'
import clsx from 'clsx'
import { RiDeleteBin6Line, RiEdit2Line, RiSave3Fill } from 'react-icons/ri'
import { deleteAny } from '../../../firebase/delete'
import { Comment } from '../../../interfaces-objects/interfaces'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'
import { getFromArticles } from '../../../util/productModelHelper'
import Dialog from '../dialog/Dialog'
import styles from '../../../styles/admin-user/CommentItem.module.css'
import listStyles from '../../../styles/admin-user/AccountList.module.css'
import Link from 'next/link'
import TextTableData from './TextTableData'
import { MdClose } from 'react-icons/md'
import { updateComment } from '../../../firebase/update'
import { firestore } from '../../../firebase/firebase'


interface Props {
   readonly comment: Comment
}

const CommentItem: React.FC<Props> = ({ comment }) => {
   const [text, setText] = useState<string | null>(null)
   const article = getFromArticles(comment._articleId)

   async function deleteComment(articleId: string, commentId: string) {
      await deleteAny(`articles/${articleId}/comments`, commentId)
   }

   async function saveComment(articleId: string, commentId: string, data: { body: string }) {
      await updateComment(articleId, commentId, data)
   }

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
               <TextTableData limit={150} text={comment.body} editText={text} setEditText={setText} />
            </div>

            <div className={listStyles.controllers1}>
               {
                  text === null &&
                  <>
                     <div onClick={() => setText(comment.body)}><RiEdit2Line /></div>
                     &nbsp;&nbsp;
                     <div onClick={() => openDialog(comment._id)}><RiDeleteBin6Line /></div>
                  </>
               }
               {
                  text !== null &&
                  <>
                     <div onClick={async () => {
                        await firestore.doc(`articles/${comment._articleId}/comments/${comment._id}`).update({ body: text })
                        // saveComment(comment._articleId, comment._id, { body: text })
                        setText(null)
                     }}><RiSave3Fill /></div>
                     &nbsp;&nbsp;
                     <div onClick={() => setText(null)}><MdClose /></div>
                  </>
               }
            </div>
         </div>

         <div className={listStyles.controllers2}>
            {
               text === null &&
               <>
                  <div onClick={() => setText(comment.body)}><RiEdit2Line /> Edit</div>
                  &nbsp;&nbsp;
                  <div onClick={() => openDialog(comment._id)}><RiDeleteBin6Line /> Delete</div>
               </>
            }
            {
               text !== null &&
               <>
                  <div onClick={async () => {
                     // await firestore.doc(`articles/${comment._articleId}/comments/${comment._id}`).update({ body: text })
                     await saveComment(comment._articleId, comment._id, { body: text })
                     setText(null)
                  }}><RiSave3Fill /> Save</div>
                  &nbsp;&nbsp;
                  <div onClick={() => setText(null)}><MdClose /> Cancel</div>
               </>
            }
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
}

export default CommentItem