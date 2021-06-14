import React from 'react';
import styles from '../../../styles/loading/Loading.module.css';
import { VscLoading } from 'react-icons/vsc';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

interface Props {
   readonly reduxIsLoading?: boolean;
   readonly localIsLoading?: boolean;
}

const Loading: React.FC<Props> = ({ reduxIsLoading, localIsLoading }) => {
   
   if (!reduxIsLoading && !localIsLoading) return null;

   if (localIsLoading) {
      return (
         <div className={styles.container} style={localIsLoading ? { position: 'relative' } : {}}>
            <div className={styles.icon}>
               <VscLoading />
            </div>
         </div>
      )
   }

   return createPortal(
      <div className={styles.container}>
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
