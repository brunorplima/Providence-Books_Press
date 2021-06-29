import React from 'react';
import styles from '../../../styles/admin-user/Section.module.css';

interface Props {
   readonly title: string;
   readonly tabs?: boolean;
}

const Section: React.FC<Props> = ({
   children,
   title,
   tabs
}) => {

   return (
      <div className={styles.container}>
         <h1>{title}</h1>
         {!tabs && <div className={styles.line}></div>}
         {children}
      </div>
   )
}

export default Section;
