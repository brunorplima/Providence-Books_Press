import React from 'react';
import styles from '../../../styles/loading/Loading.module.css';
import { VscLoading } from 'react-icons/vsc';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

interface Props {
   readonly reduxIsLoading?: boolean;
   readonly localIsLoading?: boolean;
   readonly size?: number;
}

const Loading: React.FC<Props> = ({ reduxIsLoading, localIsLoading, size = 6 }) => {

   if (!reduxIsLoading && !localIsLoading) return null;

   const containerSize = (size * 10);
   const fontSize = (size * 5) + 'pt'

   const containerStyle = {
      width: containerSize,
      height: containerSize
   }

   if (localIsLoading) {
      return (
         <div className={styles.container} style={localIsLoading ? { position: 'relative', ...containerStyle } : { ...containerStyle }}>
            <div className={styles.icon} style={{ fontSize: fontSize }}>
               <VscLoading />
            </div>
         </div>
      )
   }

   return createPortal(
      <div className={styles.container} style={containerStyle}>
         <div className={styles.icon}>
            <VscLoading />
         </div>
      </div>,
      document.getElementById('loading-modal')
   )
}

const mapStateToProps = (state: { isLoading: boolean }) => {
   return {
      reduxIsLoading: state.isLoading
   }
}

export default connect(mapStateToProps)(Loading);
