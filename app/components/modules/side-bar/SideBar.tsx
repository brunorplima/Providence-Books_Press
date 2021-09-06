import React, { Component } from 'react';
import SearchField from '../../elements/search-field/SearchField';
import FilterBox from '../../elements/filter-box/FilterBox';
import Frame from '../../layouts/Frame';
import styles from '../../../styles/side-bar/Sidebar.module.css';
import globalStyles from '../../../styles/globals.module.css';

export interface SidebarProps {
   readonly checkedCategories: string[];
   readonly setCheckedCategories: (categories: string[]) => void;
   readonly checkedAuthors: string[];
   readonly setCheckedAuthors: (author: string[]) => void;
   readonly checkedPublishers: string[];
   readonly setCheckedPublishers: (publisher: string[]) => void;
   readonly search?: string;
   readonly setSearch?: (value: string) => void;
   readonly categories?: string[];
   readonly authors?: string[];
   readonly publishers?: string[];
   readonly isPortal?: boolean;
}

export class Sidebar extends Component<SidebarProps> {

   constructor(props) {
      super(props);
   }

   render() {
      const {
         checkedCategories,
         setCheckedCategories,
         checkedAuthors,
         setCheckedAuthors,
         checkedPublishers,
         setCheckedPublishers,
         search,
         setSearch,
         categories,
         authors,
         publishers,
         isPortal
      } = this.props;

      const frameStyle = {
         paddingLeft: '1rem'
      }
      
      return (
         <div className={`${styles.sideBar} ${globalStyles.yellowFont} ${isPortal ? styles.sideBarModal : ''}`}>
            <Frame style={frameStyle}>
               {
                  search !== undefined &&
                  <SearchField value={search} changeHandler={setSearch} isGlobalSearch={false} />
               }
            </Frame>
            {
               categories?.length && categories?.length > 1 ?
               <FilterBox
                  idIncrement={isPortal ? 'portal' : 'regular'}
                  boxTitle='CATEGORY'
                  optionsList={categories}
                  optionsChecked={checkedCategories}
                  setCheckedList={setCheckedCategories}
               /> : null
            }

            {
               authors?.length && authors?.length > 1 ?
               <FilterBox
                  idIncrement={isPortal ? 'portal' : 'regular'}
                  boxTitle='AUTHOR'
                  optionsList={authors}
                  optionsChecked={checkedAuthors}
                  setCheckedList={setCheckedAuthors}
               /> : null
            }

            {
               publishers?.length && publishers?.length > 1 ?
               <FilterBox
                  idIncrement={isPortal ? 'portal' : 'regular'}
                  boxTitle='PUBLISHER'
                  optionsList={publishers}
                  optionsChecked={checkedPublishers}
                  setCheckedList={setCheckedPublishers}
               /> : null
            }
         </div>
      )
   }
}

export default Sidebar
