import React from 'react';
import styles from '../../../styles/loading/Loading.module.css';
import { VscLoading } from 'react-icons/vsc';
import { createPortal } from 'react-dom';
import { connect, useStore } from 'react-redux';

const Loading: React.FC = () => {
   const store = useStore();
   const isLoading = store.getState().isLoading;
   if (!isLoading) return null;

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
      isLoading: state.isLoading
   }
}

export default connect(mapStateToProps)(Loading);
