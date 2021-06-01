import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import styles from '../../../styles/elements/OpenSearchFilterButton.module.css';

interface Props {
   readonly setModalOpen: (value: boolean) => void;
}

const OpenSearchFilterButton: React.FC<Props> = ({ setModalOpen }) => {
   return (
      <div className={styles.openPortal} onClick={() => setModalOpen(true)}><BiSearchAlt /></div>
   )
}

export default OpenSearchFilterButton
