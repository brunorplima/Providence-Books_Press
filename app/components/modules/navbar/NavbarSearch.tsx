import React from 'react';
import styles from '../../../styles/navbar/Navbar.module.css';
import { BiSend } from 'react-icons/bi';
import { MenuHidden } from './NavbarContainer';
import { useDispatch } from 'react-redux';
import createLoadingAction from '../../../redux/actions/loadingAction';
import { useRouter } from 'next/router';

interface Props {
   readonly primary: boolean;
   readonly menuHidden: MenuHidden | null;
   readonly searchField: string;
   readonly setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly search: (value: string) => void;
}

const NavbarSearch: React.FC<Props> = ({
   primary,
   menuHidden,
   searchField,
   setSearch,
   search
}) => {
   const dispatch = useDispatch();
   const router = useRouter();

   return (
      <li className={`
            ${styles.navbarOption}
            ${primary ? styles.primaryNavbarOption : styles.secondaryNavbarOption}
            ${menuHidden !== null ? styles.mobileNavbarOption : ''}
         `}>
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
                  dispatch(createLoadingAction(true));
                  search(searchField);
                  router.push('/search-results');
               }}
            >
               <BiSend />
            </div>
         </form>
      </li>
   )
}

export default NavbarSearch
