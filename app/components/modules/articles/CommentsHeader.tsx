import React from 'react';
import styles from '../../../styles/articles/Comments.module.css';

interface Props {
   readonly totalComments: number;
}

const CommentsHeader: React.FC<Props> = ({ totalComments }) => {
   return (
      <div className={styles.header}>
         <h3>Comments</h3>
         <div>({totalComments})</div>
         <div></div>
      </div>
   )
}

export default CommentsHeader
