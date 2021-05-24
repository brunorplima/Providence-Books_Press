import React from 'react';
import { Comment } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/articles/Comment.module.css';
import months from '../../../util/months';
import NameInitials from '../../elements/name-initials/NameInitials';

interface Props {
   readonly comment: Comment;
}

const CommentBox: React.FC<Props> = ({ comment }) => {
   const date = new Date(comment.dateTime);
   return (
      <div className={styles.container}>
         <div className={styles.nameDate}>
            <div>{comment.userName}</div>
            <div>{months[date.getMonth()]}.{date.getDate()}.{date.getFullYear()}</div>
            <div className={styles.nameInitials}>
               <NameInitials
                  name={comment.userName}
                  size={55}
                  fontSize={'18pt'}
               />
            </div>
         </div>

         <div className={styles.comment}>
            <div>
               {
                  comment.body.split('\n').map((paragraph, idx) => {
                     return <p key={idx + paragraph.substring(0, 50)}>{paragraph}</p>
                  })
               }
            </div>
         </div>
      </div>
   )
}

export default CommentBox;
