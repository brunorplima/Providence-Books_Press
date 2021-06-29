import React from 'react';
import styles from '../../../styles/admin-user/Sidebar.module.css';

interface Props {
   readonly sections: string[];
   readonly currentSection: string;
   readonly setCurrentSection: (index: number) => void;
}

const Sidebar: React.FC<Props> = ({ sections, currentSection, setCurrentSection }) => {
   return (
      <div className={styles.container}>
         <div className={styles.h2}>
            <h2>Providence Books &amp; Press</h2>
         </div>

         {
            sections.map((section, idx) => {
               return (
                  <div
                     key={section}
                     className={styles.section}
                     style={section === currentSection ? { color: 'white' } : {}}
                     onClick={() => setCurrentSection(idx)}
                  >
                     {section}
                  </div>
               )
            })
         }
      </div>
   )
}

export default Sidebar;
