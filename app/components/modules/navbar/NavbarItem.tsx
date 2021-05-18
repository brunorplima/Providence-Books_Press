import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { MenuHidden } from './NavbarContainer';

interface Props {
   readonly label: string;
   readonly href: string;
   readonly primary: boolean;
   readonly menuHidden: MenuHidden | null;
   readonly setMenuHidden: () => void;
   readonly isFirstItem: boolean;
}

const NavbarItem: React.FC<Props> = ({
   label,
   href,
   primary,
   menuHidden,
   setMenuHidden,
   isFirstItem
}) => {
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
         <Link href={href}>
            <a className={`${styles.anchor} ${primary ? styles.primaryAnchor : styles.secondaryAnchor}`}>
               {label}
            </a>
         </Link>
      </li>
   )
}

export default NavbarItem;
