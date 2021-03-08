import React from 'react'
import TextInput from '../text-input/TextInput'

interface Props {
   value: string,
   placeholder: string,
   changeHandler: Function,
   isGlobalSearch: boolean
}

const SearchField: React.FC<Props> = ({ value, placeholder, changeHandler, isGlobalSearch }) => {
   return (
      <div>
         {
            isGlobalSearch &&
            <label htmlFor='search-field-input'>SEARCH</label>
         }
         <TextInput
            type='text'
            name='search-field-input'
            value={value}
            placeholder={isGlobalSearch ? placeholder : 'SEARCH'}
            changeHandler={changeHandler}
            />
      </div>
   )
}

export default SearchField
