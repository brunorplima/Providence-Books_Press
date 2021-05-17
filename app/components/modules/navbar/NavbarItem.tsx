import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';

interface Props {
   readonly label: string;
   readonly href: string;
   readonly primary: boolean;
   readonly isMenuHidden: boolean | null;
   readonly setIsMenuHidden: () => void;
   readonly isFirstItem: boolean;
}

const NavbarItem: React.FC<Props> = ({
   label,
   href,
   primary,
   isMenuHidden,
   setIsMenuHidden,
   isFirstItem
}) => {
   return (
      <li
         className={`
            ${styles.navbarOption}
            ${primary ? styles.primaryNavbarOption : styles.secondaryNavbarOption}
            ${isMenuHidden !== null ? styles.mobileNavbarOption : ''}
            ${isFirstItem && isMenuHidden !== null ? styles.firstMNO : ''}
         `}
         onClick={isMenuHidden !== null ? setIsMenuHidden : null}
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
