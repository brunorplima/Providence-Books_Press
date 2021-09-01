import clsx from 'clsx';
import React from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { SectionType } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/admin-user/Sidebar.module.css';
import { useAuth } from '../../contexts/AuthProvider';

interface Props {
   readonly sections: SectionType[];
   readonly currentSection: string;
   readonly setCurrentSection: (index: number) => void;
}

const Sidebar: React.FC<Props> = ({ sections, currentSection, setCurrentSection }) => {
   const { signout } = useAuth()
   return (
      <div className={styles.container}>
         <div className={styles.h2}>
            <h2>Providence Books &amp; Press</h2>
         </div>

         {
            sections.map((section, idx) => {
               return (
                  <div
                     key={section.name}
                     className={styles.section}
                     style={section.name === currentSection ? { color: 'white' } : {}}
                     onClick={() => setCurrentSection(idx)}
                  >
                     <div><section.Icon size={20}/></div>&nbsp;&nbsp;
                     {section.name}
                  </div>
               )
            })
         }

         <div style={{ flex: 1 }}></div>

         <div className={clsx(styles.section, styles.signout)} onClick={signout}>
            <div><RiLogoutBoxLine size={20}/></div>&nbsp;&nbsp;
            <div>Logout</div>
         </div>
      </div>
   )
}

export default Sidebar;
