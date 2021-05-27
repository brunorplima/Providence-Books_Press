import React from 'react';
import { IconType } from 'react-icons';
import styles from '../../../styles/navbar/NavbarItem.module.css';
import LinkLoading from '../../elements/link-loading/LinkLoading';
import { MenuHidden } from './NavbarContainer';

interface Props {
   readonly label?: string;
   readonly Icon?: IconType;
   readonly href: string;
   readonly primary: boolean;
   readonly menuHidden: MenuHidden | null;
   readonly setMenuHidden: () => void;
   readonly isFirstItem: boolean;
   readonly totalBookshelfItems?: number;
}

const NavbarItem: React.FC<Props> = ({
   label,
   Icon,
   href,
   primary,
   menuHidden,
   setMenuHidden,
   isFirstItem,
   totalBookshelfItems
}) => {
   if (label && Icon) throw new Error('Props label and icon cannot exist simultaneously!');

   return (
      <li
         className={`
            ${styles.navbarOption}
            ${primary ? styles.primaryNavbarOption : styles.secondaryNavbarOption}
            ${menuHidden !== null ? styles.mobileNavbarOption : ''}
            ${isFirstItem && menuHidden !== null ? styles.firstMNO : ''}
         `}
         onClick={menuHidden !== null ? setMenuHidden : null}
      >
         <LinkLoading
            href={href}
            className={`${styles.anchor} ${primary ? styles.primaryAnchor : styles.secondaryAnchor}`}
         >
            {
               label && label
            }
            {
               Icon && <Icon fontSize={30} />
            }
            {
               Icon && totalBookshelfItems &&
               <div className={styles.bookshelfTotal}>
                  {totalBookshelfItems}
               </div>
            }
         </LinkLoading>
      </li>
   )
}

export default NavbarItem;
