import React, { Component } from 'react'
import SearchField from '../../elements/search-field/SearchField'
import FilterBox from '../../elements/filter-box/FilterBox'
import Frame from '../../layouts/Frame';

interface Props {
   categories: string[],
   checkedCategories: string[],
   authors: string[],
   checkedAuthors: string[],
   publishers: string[]
   checkedPublishers: string[]
}

export class Sidebar extends Component<Props> {

   constructor(props) {
      super(props);
   }

   render() {
      const {
         categories,
         checkedCategories,
         authors,
         checkedAuthors,
         publishers,
         checkedPublishers
      } = this.props;

      const frameStyle = {
         
      }

      return (
         <div className='search-bar'>
            <Frame style={frameStyle}>
               <SearchField value='' placeholder='' changeHandler={() => { }} isGlobalSearch={false}/>
               <FilterBox boxTitle='CATEGORY' optionsList={categories} optionsChecked={checkedCategories} />
               <FilterBox boxTitle='AUTHOR' optionsList={authors} optionsChecked={checkedAuthors} />
               <FilterBox boxTitle='PUBLISHER' optionsList={publishers} optionsChecked={checkedPublishers} />
            </Frame>
         </div>
      )
   }
}

export default Sidebar
