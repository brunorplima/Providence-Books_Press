import React from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { BiSend } from 'react-icons/bi';
import { MenuHidden } from './NavbarContainer';
import { useRouter } from 'next/router';

interface Props {
   readonly primary: boolean;
   readonly menuHidden: MenuHidden | null;
   readonly setMenuHidden: () => void;
   readonly searchField: string;
   readonly setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly search: (value: string) => void;
   readonly isLandscape: boolean;
}

const NavbarSearch: React.FC<Props> = ({
   primary,
   menuHidden,
   setMenuHidden,
   searchField,
   setSearch,
   search,
   isLandscape
}) => {
   const router = useRouter();

   return (
      <li className={`
            ${styles.navbarOption}
            ${primary ? styles.primaryNavbarOption : styles.secondaryNavbarOption}
            ${menuHidden !== null ? styles.mobileNavbarOption : ''}
         `}
         style={menuHidden !== null ? isLandscape ? { margin: '.7rem 0' } : { marginBottom: '.7rem' } : {}}
      >
         <form
            className={`
               ${styles.navbarSearch}
               ${primary ? styles.primaryNavbarSearch : styles.secondaryNavbarSearch}
               ${menuHidden !== null ? styles.mobileNavbarSearch : ''}
            `}
         >
            <label htmlFor='search-input'>SEARCH</label>
            <input
               id='search-input'
               type='text'
               value={searchField}
               onChange={e => setSearch(e)}
               placeholder={menuHidden !== null ? 'Type search' : ''}
            />
            <div
               id='search-button'
               className={`${styles.submit} ${primary ? styles.primarySubmit : styles.secondarySubmit}`}
               onClick={() => {
                  if (menuHidden) setMenuHidden();
                  search(searchField);
                  router.push('/search-results?search=' + searchField);
               }}
            >
               <BiSend />
            </div>
         </form>
      </li>
   )
}

export default NavbarSearch
