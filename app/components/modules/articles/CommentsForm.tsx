import React from 'react';
import styles from '../../../styles/articles/Comments.module.css';

interface Props {
   readonly text: string;
   readonly setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   readonly submit: () => void;
}

const CommentsForm: React.FC<Props> = ({ text, setText, submit }) => {
   return (
      <form className={styles.form}>
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
   )
}

export default CommentsForm
