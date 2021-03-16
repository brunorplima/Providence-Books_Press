import React from 'react'
import CheckboxInput from '../checkbox-input/CheckboxInput'
import styles from '../../../styles/side-bar/FilterBox.module.css'

interface Props {
   boxTitle: string,
   optionsList: string[],
   optionsChecked: string[],
   setCheckedList: (value: string[]) => void 
}

const FilterBox: React.FC<Props> = ({ boxTitle, optionsList, optionsChecked, setCheckedList }) => {

   return (
      <div>
         <h4 className={styles.boxTitle}>{boxTitle}</h4>
         {
            optionsList.map(((option, idx) => {
               return (
                  <div className={styles.option} key={option} style={{paddingLeft: '1rem'}}>
                     <CheckboxInput
                        id={boxTitle + idx}
                        option={option}
                        optionsChecked={optionsChecked}
                        setCheckedList={setCheckedList}
                     />
                     <label className={styles.label} htmlFor={boxTitle + idx}>{option.toUpperCase()}</label>
                  </div>
               )
            }))
         }
      </div>
   )
}

export default FilterBox
