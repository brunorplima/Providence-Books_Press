import React, { useEffect, useState } from 'react';
import { Comment, User } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/articles/Comment.module.css';
import months from '../../../util/months';
import NameInitials from '../../elements/name-initials/NameInitials';
import { useAuth } from '../../contexts/AuthProvider';
import DropdownMenu from '../../elements/dropdown-menu/DropdownMenu';
import { RiDeleteBin6Line, RiFileEditFill } from 'react-icons/ri';
import Button from '../../elements/button/Button';
import { updateComment } from '../../../firebase/update';
import { deleteAny } from '../../../firebase/delete';
import { useRouter } from 'next/router';
import { fetchDocs } from '../../../firebase/fetch';

interface Props {
   readonly comment: Comment;
}

const CommentBox: React.FC<Props> = ({ comment }) => {
   const [isMenuOpened, setIsMenuOpened] = useState(false)
   const [isEdit, setIsEdit] = useState(false)
   const [editText, setEditText] = useState(comment.body)
   const [commentOwner, setCommentOwner] = useState<User>(null)
   const { firebaseUser } = useAuth()
   const router = useRouter()
   const date = new Date(comment.dateTime);

   useEffect(() => {
      setOwnerUser()
   }, [])

   async function setOwnerUser() {
      const user = await fetchDocs<User>('users/', {
         field: '_id',
         condition: '==',
         value: comment._userId
      })
      setCommentOwner(user[0])
   }

   async function handleSave() {
      try {
         await updateComment(comment._articleId, comment._id, { body: editText })
         setIsEdit(false)
         router.reload()
      }
      catch (error) {
         console.error(error)
      }
   }

   async function handleDelete() {
      try {
         await deleteAny(`articles/${comment._articleId}/comments`, comment._id)
         setIsEdit(false)
         router.reload()
      }
      catch (error) {
         console.error(error)
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.nameDate}>
            <div>{comment.userName}</div>
            <div className={styles.date}>{months[date.getMonth()]}.{date.getDate()}.{date.getFullYear()}</div>
            <div style={{ flex: 1 }}></div>
            {
               comment._userId === firebaseUser?.uid &&
               <DropdownMenu
                  {...{ isMenuOpened, setIsMenuOpened }}
                  customStyle={{
                     borderTopWidth: 0,
                     right: '-16px',
                     top: '36px'
                  }}
               >
                  <div onClick={() => setIsEdit(true)} style={{ minWidth: 115 }}>
                     <RiFileEditFill /> &nbsp; Edit
                  </div>
                  <div onClick={handleDelete} style={{ minWidth: 115 }}>
                     <RiDeleteBin6Line /> &nbsp; Delete
                  </div>
               </DropdownMenu>
            }


            <div className={styles.nameInitials}>
               {
                  commentOwner && commentOwner.photoURL ?
                     <div className={styles.ownerPhoto} style={{ background: `url("${commentOwner.photoURL}")` }}></div> :
                     <NameInitials
                        name={comment.userName}
                        size={55}
                        fontSize={'18pt'}
                     />
               }
            </div>
         </div>

         <div className={styles.comment}>
            {
               isEdit ?
                  <div className={styles.editContainer}>
                     <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                     ></textarea>
                     <div className={styles.editControllers}>
                        <Button
                           label='CANCEL'
                           clickHandler={() => setIsEdit(false)}
                           style={{ width: '100px' }}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <Button
                           label='SAVE'
                           clickHandler={handleSave}
                           style={{ width: '100px' }}
                        />
                     </div>
                  </div> :
                  <div>
                     {
                        comment.body.split('\n').map((paragraph, idx) => {
                           return <p key={idx + paragraph.substring(0, 50)}>{paragraph}</p>
                        })
                     }
                  </div>
            }
         </div>
      </div>
   )
}

export default CommentBox;
