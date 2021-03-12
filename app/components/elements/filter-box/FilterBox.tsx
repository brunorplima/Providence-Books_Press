import React from 'react'
import CheckboxInput from '../checkbox-input/CheckboxInput'

interface Props {
   boxTitle: string,
   optionsList: string[],
   optionsChecked: string[],
   setCheckedList: (value: string[]) => void 
}

const FilterBox: React.FC<Props> = ({ boxTitle, optionsList, optionsChecked, setCheckedList }) => {

   return (
      <div>
         <h4>{boxTitle}</h4>
         {
            optionsList.map(((option, idx) => {
               return (
                  <div key={option}>
                     <CheckboxInput
                        id={boxTitle + idx}
                        option={option}
                        optionsChecked={optionsChecked}
                        setCheckedList={setCheckedList}
                     />
                     <label htmlFor={boxTitle + idx}>{option.toUpperCase()}</label>
                  </div>
               )
            }))
         }
      </div>
   )
}

export default FilterBox
