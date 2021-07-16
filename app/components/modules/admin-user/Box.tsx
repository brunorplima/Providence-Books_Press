import React, { CSSProperties } from 'react';
import styles from '../../../styles/admin-user/Box.module.css';

interface Props {
   readonly title?: string;
   readonly paddingAll?: boolean;
   readonly paddingVertical?: boolean;
}

const Box: React.FC<Props> = ({
   children,
   title,
   paddingAll,
   paddingVertical
}) => {
   const containerStyle: CSSProperties = {};
   if (paddingVertical) containerStyle.padding = '0 0 1rem 0';
   if (paddingAll) containerStyle.padding = '0 1rem 1rem 1rem';

   const titleStyle: CSSProperties = {};
   if (!paddingAll) titleStyle.paddingLeft = '1rem'
   return (
      <div
         className={styles.container}
      >
         {title && <h3 style={titleStyle}>{title}</h3>}
         <div style={containerStyle}>
            {children}
         </div>
      </div>
   )
}

export default Box;
