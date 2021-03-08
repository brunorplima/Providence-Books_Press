import React from 'react'

interface Props {
   boxTitle: string,
   optionsList: string[],
   optionsChecked: string[]
}

const FilterBox: React.FC<Props> = ({ boxTitle, optionsList, optionsChecked }) => {
   return (
      <div>
         <h4>{boxTitle}</h4>
         {
            optionsList.map((option => {
               return (
                  <div key={option}>
                     <input type='checkbox' name='name' defaultChecked={optionsChecked.includes(option)} />
                     <label htmlFor='name'>{option}</label>
                  </div>
               )
            }))
         }
      </div>
   )
}

export default FilterBox
