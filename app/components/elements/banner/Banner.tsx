import React, { Fragment } from 'react'
import styles from '../../../styles/elements/Banner.module.css'
import useScrollPosition from '../../../util/useScrollPosition';

interface Props {
   readonly image: string;
   readonly title?: string;
   readonly subtitle?: string;
   readonly content?: JSX.Element
}

const Banner: React.FC<Props> = ({ image, title, subtitle, content }) => {

   if ((title || subtitle) && content) throw new Error('Banner cannot have a title and a content simultaneously.');

   return (
      <div
         className={styles.container}
         style={image ? { background: `url(${image})`, backgroundRepeat: 'no-repeat' } : {}}
      >
         <div className={styles.overlay}>
            {
               title &&
               <div className={styles.title}>
                  <div>{title}</div>
                  {
                     subtitle &&
                     <div className={styles.subtitle}>{subtitle}</div>
                  }
               </div>
            }

            {
               content && content
            }
         </div>
      </div>
   )
}

export default Banner
