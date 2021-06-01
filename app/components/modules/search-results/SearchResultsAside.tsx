import React from 'react';
import styles from '../../../styles/search-results/SearchResultsAside.module.css';
import Sidebar, { SidebarProps } from '../side-bar/SideBar';
import SideBarModal from '../side-bar/SideBarModal';
import { ALL, BOOKS } from './constants';

interface AsideProps {
   readonly view: string;
   readonly modalOpen: boolean;
   readonly setModalOpen: (isOpen: boolean) => void;
}

type Props = AsideProps & SidebarProps;

const SearchResultsAside: React.FC<Props> = ({
   view,
   categories,
   authors,
   publishers,
   checkedCategories,
   checkedAuthors,
   checkedPublishers,
   setCheckedCategories,
   setCheckedAuthors,
   setCheckedPublishers,
   modalOpen,
   setModalOpen
}) => {
   return (
      <div className={styles.container}>
         <h3>Filter</h3>
         {
            view === ALL ?
               <div className={styles.viewAllFilter}>
                  <img src='/search-results/filter.png' alt='Filter results' />
                  <div>
                     Choose one result type in order to further filter the results
                  </div>
               </div> :
               <div className={styles.filter}>
                  <SideBarModal
                     portal={{
                        isOpen: modalOpen,
                        setModalOpen: setModalOpen
                     }}
                  >
                     <Sidebar
                        categories={categories}
                        authors={authors}
                        publishers={publishers}
                        checkedCategories={checkedCategories}
                        checkedAuthors={checkedAuthors}
                        checkedPublishers={checkedPublishers}
                        setCheckedCategories={setCheckedCategories}
                        setCheckedAuthors={setCheckedAuthors}
                        setCheckedPublishers={setCheckedPublishers}
                        isPortal={true}
                     />
                  </SideBarModal>
                  
                  <Sidebar
                     categories={categories}
                     authors={authors}
                     publishers={view === BOOKS ? publishers : undefined}
                     checkedCategories={checkedCategories}
                     checkedAuthors={checkedAuthors}
                     checkedPublishers={checkedPublishers}
                     setCheckedCategories={setCheckedCategories}
                     setCheckedAuthors={setCheckedAuthors}
                     setCheckedPublishers={view === BOOKS ? setCheckedPublishers : undefined}
                  />
               </div>
         }
      </div>
   )
}

export default SearchResultsAside;
