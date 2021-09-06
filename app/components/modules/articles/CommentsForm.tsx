import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { User } from '../../../interfaces-objects/interfaces';
import { closeDialog } from '../../../redux/actions/openedDialogNameAction';
import styles from '../../../styles/articles/Comments.module.css';
import Dialog from '../dialog/Dialog';
import { ADD_REVIEW_COMMENT_UNLOGGED } from '../dialog/dialogNames';

interface Props {
   readonly text: string;
   readonly setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   readonly submit: () => void;
   readonly providenceUser: User
}

const CommentsForm: React.FC<Props> = ({ text, setText, submit, providenceUser }) => {

   return (
      <>
         <form className={styles.form}>
            {!providenceUser && <div className={styles.loginMessage}><AiOutlineInfoCircle /> &nbsp; Only logged in users can post comments</div>}
            <textarea
               className={styles.textarea}
               placeholder='Leave your comment here'
               value={text}
               onChange={e => setText(e)}
            />
            <button
               className={styles.submit}
               onClick={submit}
            >
               SUBMIT
            </button>
         </form>

         <Dialog
            name={ADD_REVIEW_COMMENT_UNLOGGED}
            message='You must have a Providence account and be logged in to post comments!'
            buttonsOptions={[
               {
                  label: 'CLOSE',
                  secondaryStyle: true,
                  clickHandler: closeDialog
               }
            ]}
         />
      </>
   )
}

export default CommentsForm
