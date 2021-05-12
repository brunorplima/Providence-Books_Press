import React, { Fragment } from 'react'
import styles from '../../../styles/elements/Banner.module.css'
import useScrollPosition from '../../../util/useScrollPosition';

interface Props {
   readonly image: string,
   readonly title?: string,
   readonly subtitle?: string
}

const Banner: React.FC<Props> = ({ image, title, subtitle }) => {
   return (
      <div className={styles.container} style={image ? { background: `url(${image})`, backgroundRepeat: 'no-repeat' } : {}}>
         {
            title ?
            <div className={styles.title}>
               <div>{title}</div>
               {
                  subtitle &&
                  <div className={styles.subtitle}>{subtitle}</div>
               }
            </div> :
            <div>

            </div>
         }
      </div>
   )
}

export default Banner
