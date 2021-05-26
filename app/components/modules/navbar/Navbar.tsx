import Link from 'next/link';
import React, { CSSProperties } from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { IoMenu, IoClose } from 'react-icons/io5';
import { GiBookshelf } from 'react-icons/gi';
import NavbarItem from './NavbarItem';
import NavbarSearch from './NavbarSearch';
import { MenuHidden } from './NavbarContainer';

interface Props {
   readonly searchField: string;
   readonly setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly search: (value: string) => void;
   readonly primary: boolean;
   readonly secondaryStyleOwnPage: boolean;
   readonly menuHidden: MenuHidden | null;
   readonly setMenuHidden: () => void;
   readonly totalBookshelfItems: number;
}

const Navbar: React.FC<Props> = ({
   searchField,
   setSearch,
   search,
   primary,
   secondaryStyleOwnPage,
   menuHidden,
   setMenuHidden,
   totalBookshelfItems
}) => {

   function getAnimationClass() {
      const hiddenWithAnimation = menuHidden?.isIt && menuHidden?.useAnimation;
      const shownWithAnimation = !menuHidden?.isIt && menuHidden?.useAnimation
      if (hiddenWithAnimation) return styles.slideOutNavbar;
      if (shownWithAnimation) return styles.slideInNavbar;
      return '';
   }

   const navbarOptions = [
      { label: 'HOME', href: '/' },
      { label: 'BOOKSTORE', href: '/bookstore' },
      { label: 'ARTICLES', href: '/articles' },
      { label: 'ABOUT US', href: '/about-us' },
      { label: 'OTHER PRODUCTS', href: '/other-products' },
   ]

   const hiddenStyle: CSSProperties = { left: '120%' }
   const shownStyle: CSSProperties = { left: 0 }


   return (
      <>
         {
            (primary && secondaryStyleOwnPage) &&
            <div className={styles.placeholder}></div>
         }

         <nav className={`${styles.navbar} ${primary ? styles.primaryNavbar : styles.secondaryNavbar}`}>
            <div
               className={`
                  ${styles.navbarOptions}
                  ${primary ? styles.primaryNavbarOptions : styles.secondaryNavbarOptions}
                  ${menuHidden !== null ? styles.mobileNavbarOptions : ''}
                  ${getAnimationClass()}
               `}
               style={menuHidden === null ? shownStyle : menuHidden?.isIt ? hiddenStyle : shownStyle}
            >
               {
                  menuHidden !== null &&
                  <div
                     className={styles.closeMenuButton}
                     onClick={setMenuHidden}
                  >
                     <IoClose />
                  </div>
               }

               {
                  navbarOptions.map((opt, idx) => {
                     return (
                        <NavbarItem
                           key={idx + opt.label + opt.href}
                           label={opt.label}
                           href={opt.href}
                           primary={primary}
                           menuHidden={menuHidden}
                           setMenuHidden={setMenuHidden}
                           isFirstItem={!idx ? true : false}
                        />
                     )
                  })
               }

               <NavbarSearch
                  primary={primary}
                  menuHidden={menuHidden}
                  searchField={searchField}
                  setSearch={setSearch}
                  search={search}
               />

               <NavbarItem
                  label='SIGN IN'
                  href='/sign-in'
                  primary={primary}
                  menuHidden={menuHidden}
                  setMenuHidden={setMenuHidden}
                  isFirstItem={false}
               />

               <NavbarItem
                  Icon={GiBookshelf}
                  href='/bookshelf'
                  primary={primary}
                  menuHidden={menuHidden}
                  setMenuHidden={setMenuHidden}
                  isFirstItem={false}
                  totalBookshelfItems={totalBookshelfItems}
               />
            </div>

            <div className={styles.logoArea}>
               <Link href='/'><a>Providence</a></Link>
            </div>
            <div
               className={`${styles.menuButton} ${primary ? styles.primaryMenuButton : styles.secondaryMenuButton}`}
               onClick={setMenuHidden}
            >
               <IoMenu />
            </div>
         </nav>
      </>
   )
}

export default Navbar
