import React, { CSSProperties, useEffect, useState } from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { IoMenu, IoClose } from 'react-icons/io5';
import { GiBookshelf } from 'react-icons/gi';
import NavbarItem from './NavbarItem';
import NavbarSearch from './NavbarSearch';
import { MenuHidden } from './NavbarContainer';
import LinkLoading from '../../elements/link-loading/LinkLoading';
import { useRouter } from 'next/router';
import { store } from '../../../redux/store/store';
import createLoadingAction from '../../../redux/actions/loadingAction';
import useScreenWidth from '../../../util/useScreenWidth';
import useScreenHeight from '../../../util/useScreenHeight';
import { useAuth } from '../../contexts/AuthProvider';

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
   const router = useRouter();
   const screenWidth = useScreenWidth();
   const screenHeight = useScreenHeight();
   const { firebaseUser } = useAuth()
   const [isLandscape, setIsLandscape] = useState<boolean>(false);

   useEffect(() => {
      router.events.on('routeChangeStart', activateLoading);
      router.events.on('routeChangeComplete', deactivateLoading);
      return () => {
         router.events.off('routeChangeStart', activateLoading);
         router.events.off('routeChangeComplete', deactivateLoading);
      }
   }, []);
   
   useEffect(() => {
      if (screenHeight < screenWidth) {
         setIsLandscape(true);
      }
      else {
         setIsLandscape(false);
      }
   }, [screenWidth, screenHeight]);

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
      // { label: 'OTHER PRODUCTS', href: '/other-products' },
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
                           isLandscape={isLandscape}
                           isFirstItem={!idx ? true : false}
                        />
                     )
                  })
               }

               <NavbarSearch
                  primary={primary}
                  menuHidden={menuHidden}
                  setMenuHidden={setMenuHidden}
                  searchField={searchField}
                  setSearch={setSearch}
                  search={search}
                  isLandscape={isLandscape}
               />

               <NavbarItem
                  label={!firebaseUser ? 'SIGN IN' : firebaseUser.emailVerified ? 'ACCOUNT' : 'SIGN IN'}
                  href='/sign-in'
                  primary={primary}
                  menuHidden={menuHidden}
                  setMenuHidden={setMenuHidden}
                  isFirstItem={false}
                  isLandscape={isLandscape}
               />

               <NavbarItem
                  Icon={GiBookshelf}
                  href='/bookshelf'
                  primary={primary}
                  menuHidden={menuHidden}
                  setMenuHidden={setMenuHidden}
                  isFirstItem={false}
                  isLandscape={isLandscape}
                  totalBookshelfItems={totalBookshelfItems}
               />
            </div>

            <div className={styles.logoArea}>
               <LinkLoading href='/'>Providence</LinkLoading>
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

const activateLoading = (url, { shallow }) => {
   store.dispatch(createLoadingAction(true));
}

const deactivateLoading = (url, { shallow }) => {
   store.dispatch(createLoadingAction(false));
}

export default Navbar;
