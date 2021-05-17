import React from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { BiSend } from 'react-icons/bi';

interface Props {
   readonly primary: boolean;
   readonly isMenuHidden: boolean | null;
   readonly searchField: string;
   readonly setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly search: (value: string) => void;
}

const NavbarSearch: React.FC<Props> = ({
   primary,
   isMenuHidden,
   searchField,
   setSearch,
   search
}) => {
   return (
      <li className={`
            ${styles.navbarOption}
            ${primary ? styles.primaryNavbarOption : styles.secondaryNavbarOption}
            ${isMenuHidden !== null ? styles.mobileNavbarOption : ''}
         `}>
         <form
            className={`
               ${styles.navbarSearch}
               ${primary ? styles.primaryNavbarSearch : styles.secondaryNavbarSearch}
               ${isMenuHidden !== null ? styles.mobileNavbarSearch : ''}
            `}
         >
            <label htmlFor='search-input'>SEARCH</label>
            <input
               id='search-input'
               type='text'
               value={searchField}
               onChange={e => setSearch(e)}
               placeholder={isMenuHidden !== null ? 'Type search' : ''}
            />
            <div
               id='search-button'
               className={`${styles.submit} ${primary ? styles.primarySubmit : styles.secondarySubmit}`}
               onClick={() => search(searchField)}
            >
               <BiSend />
            </div>
         </form>
      </li>
   )
}

export default NavbarSearch
