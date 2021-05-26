import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { useDispatch } from 'react-redux';
import createLoadingAction from '../../../redux/actions/loadingAction';
import styles from '../../../styles/navbar/NavbarItem.module.css';
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

   const dispatch = useDispatch();

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
            <a 
               className={`${styles.anchor} ${primary ? styles.primaryAnchor : styles.secondaryAnchor}`}
               onClick={() => dispatch(createLoadingAction(true))}
            >
               {
                  label && label
               }
               {
                  Icon && <Icon fontSize={30}/>
               }
               {
                  Icon && totalBookshelfItems &&
                  <div className={styles.bookshelfTotal}>
                     {totalBookshelfItems}
                  </div>
               }
            </a>
         </Link>
      </li>
   )
}

export default NavbarItem;
