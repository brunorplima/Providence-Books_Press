import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import styles from '../../../styles/admin-user/ListSearch.module.css';

interface Props {
   readonly search: string;
   readonly setSearch: (search: string) => void;
}

const ListSearch: React.FC<Props> = ({ search, setSearch }) => {
   return (
      <div className={styles.search}>
         <div><BiSearchAlt /></div>
         <div>
            <input
               type='text'
               value={search}
               onChange={e => setSearch(e.currentTarget.value)}
               placeholder='Search'
            />
         </div>
      </div>
   )
}

export default ListSearch;