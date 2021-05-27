import React from 'react';
import styles from '../../../styles/elements/ArticleCard.module.css';
import { ArticleAuthor } from '../../../interfaces-objects/interfaces';
import { useDispatch } from 'react-redux';
import LinkLoading from '../link-loading/LinkLoading';

interface Props {
   readonly id: string;
   readonly image: string;
   readonly title: string;
   readonly author: ArticleAuthor;
   readonly subtitle?: string;
}

const ArticleCard: React.FC<Props> = ({ id, image, title, author, subtitle }) => {
   const dispatch = useDispatch();
   
   return (
      <div className={styles.container}>
         <LinkLoading href={'/articles/' + id}>
            <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
               
            </div>

            <div className={styles.info}>
               <h2 className={styles.title}>{title.toUpperCase()}</h2>
               {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
               
               <div className={styles.author}>AUTHOR: {author.name.toUpperCase()}</div>
            </div>
         </LinkLoading>
      </div>
   )
}

export default ArticleCard
