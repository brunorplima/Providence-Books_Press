import React, { Component } from 'react'
import SearchField from '../../elements/search-field/SearchField'
import FilterBox from '../../elements/filter-box/FilterBox'
import Frame from '../../layouts/Frame';
import styles from '../../../styles/side-bar/Sidebar.module.css'

interface Props {
   search: string,
   setSearch: (value: string) => void,
   categories: string[],
   checkedCategories: string[],
   setCheckedCategories: (categories: string[]) => void,
   authors: string[],
   checkedAuthors: string[],
   setCheckedAuthors: (author: string[]) => void,
   publishers: string[],
   checkedPublishers: string[],
   setCheckedPublishers: (publisher: string[]) => void
}

export class Sidebar extends Component<Props> {

   constructor(props) {
      super(props);
   }

   render() {
      const {
         search,
         setSearch,
         categories,
         checkedCategories,
         setCheckedCategories,
         authors,
         checkedAuthors,
         setCheckedAuthors,
         publishers,
         checkedPublishers,
         setCheckedPublishers
      } = this.props;

      const frameStyle = {
         
      }

      return (
         <div className={styles.sideBar}>
            <Frame style={frameStyle}>
               <SearchField value={search} changeHandler={setSearch} isGlobalSearch={false}/>
               <FilterBox 
                  boxTitle='CATEGORY'
                  optionsList={categories}
                  optionsChecked={checkedCategories}
                  setCheckedList={setCheckedCategories}
               />
               <FilterBox
                  boxTitle='AUTHOR'
                  optionsList={authors}
                  optionsChecked={checkedAuthors}
                  setCheckedList={setCheckedAuthors}
               />
               <FilterBox
                  boxTitle='PUBLISHER'
                  optionsList={publishers}
                  optionsChecked={checkedPublishers}
                  setCheckedList={setCheckedPublishers}
               />
            </Frame>
         </div>
      )
   }
}

export default Sidebar
