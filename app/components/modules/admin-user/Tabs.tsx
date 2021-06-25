import React, { useState } from 'react';
import styles from '../../../styles/admin-user/Tabs.module.css';

interface Props {
   readonly tabs: string[];
   readonly currentTab: string;
   readonly setCurrentTab: React.Dispatch<React.SetStateAction<string>> | ((tab: string) => void);
}

const Tabs: React.FC<Props> = ({ tabs, currentTab, setCurrentTab }) => {

   return (
      <div className={styles.tabs}>
         {
            tabs.map(tab => {
               return (
                  <div
                     key={tab}
                     className={styles.tab}
                     style={tab === currentTab ? { borderBottom: '3px solid var(--darkYellow)', color: 'var(--darkYellow)' } : {}}
                     onClick={() => {
                        if (tab !== currentTab) setCurrentTab(tab);
                     }}
                  >
                     {tab}
                  </div>
               )
            })
         }
      </div>
   )
}

export default Tabs;
