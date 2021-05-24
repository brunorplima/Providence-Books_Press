import React, { CSSProperties } from 'react';
import styles from '../../../styles/elements/CirclesUI.module.css';

interface Props {
   readonly style?: CSSProperties;
}

const CirclesUI:React.FC<Props> = ({ style }) => {
   return (
      <div className={styles.container}>
         <div className={styles.circle} style={style ? style : {}}></div>
         <div className={styles.circle} style={style ? style : {}}></div>
         <div className={`${styles.circle} ${styles.lastCircle}`} style={style ? style : {}}></div>
      </div>
   )
}

export default CirclesUI
