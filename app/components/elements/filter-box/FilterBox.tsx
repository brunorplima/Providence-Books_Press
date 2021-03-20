import React from 'react'
import CheckboxInput from '../checkbox-input/CheckboxInput'
import styles from '../../../styles/side-bar/FilterBox.module.css'

interface Props {
   idIncrement: string,
   boxTitle: string,
   optionsList: string[],
   optionsChecked: string[],
   setCheckedList: (value: string[]) => void 
}

const FilterBox: React.FC<Props> = ({ idIncrement, boxTitle, optionsList, optionsChecked, setCheckedList }) => {

   return (
      <div>
         <h4 className={styles.boxTitle}>{boxTitle}</h4>
         {
            optionsList.map(((option, idx) => {
               return (
                  <div className={styles.option} key={option} style={{paddingLeft: '1rem'}}>
                     <CheckboxInput
                        id={`${boxTitle}-${idx}-${option}-${idIncrement}`}
                        option={option}
                        optionsChecked={optionsChecked}
                        setCheckedList={setCheckedList}
                     />
                     <label className={styles.label} htmlFor={`${boxTitle}-${idx}-${option}-${idIncrement}`}>{option.toUpperCase()}</label>
                  </div>
               )
            }))
         }
      </div>
   )
}

export default FilterBox
