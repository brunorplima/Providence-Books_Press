import Link from 'next/link';
import React, { CSSProperties } from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { IoMenu, IoClose } from 'react-icons/io5'
import NavbarItem from './NavbarItem';
import NavbarSearch from './NavbarSearch';

interface Props {
   readonly searchField: string;
   readonly setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly search: (value: string) => void;
   readonly primary: boolean;
   readonly secondaryStyleOwnPage: boolean;
   readonly isMenuHidden: boolean | null;
   readonly setIsMenuHidden: () => void;
}

const Navbar: React.FC<Props> = ({
   searchField,
   setSearch,
   search,
   primary,
   secondaryStyleOwnPage,
   isMenuHidden,
   setIsMenuHidden
}) => {

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
                  ${isMenuHidden !== null ? styles.mobileNavbarOptions : ''}
                  ${isMenuHidden !== null ? isMenuHidden ? styles.slideOutNavbar : styles.slideInNavbar : ''}
               `}
               style={isMenuHidden === null ? shownStyle : isMenuHidden ? hiddenStyle : shownStyle}
            >
               {
                  isMenuHidden !== null &&
                  <div
                     className={styles.closeMenuButton}
                     onClick={setIsMenuHidden}
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
                           isMenuHidden={isMenuHidden}
                           setIsMenuHidden={setIsMenuHidden}
                           isFirstItem={!idx ? true : false}
                        />
                     )
                  })
               }

               <NavbarSearch
                  primary={primary}
                  isMenuHidden={isMenuHidden}
                  searchField={searchField}
                  setSearch={setSearch}
                  search={search}
               />

               <NavbarItem
                  label='SIGN IN'
                  href='/sign-in'
                  primary={primary}
                  isMenuHidden={isMenuHidden}
                  setIsMenuHidden={setIsMenuHidden}
                  isFirstItem={false}
               />
            </div>

            <div className={styles.logoArea}>
               <Link href='/'><a>Providence</a></Link>
            </div>
            <div
               className={`${styles.menuButton} ${primary ? styles.primaryMenuButton : styles.secondaryMenuButton}`}
               onClick={setIsMenuHidden}
            >
               <IoMenu />
            </div>
         </nav>
      </>
   )
}

export default Navbar
