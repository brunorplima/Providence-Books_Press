import React, { createRef, useEffect, useState } from 'react';
import CheckboxInput from '../checkbox-input/CheckboxInput';
import styles from '../../../styles/elements/FilterBox.module.css';

interface Props {
   readonly idIncrement: string;
   readonly boxTitle: string;
   readonly optionsList: string[];
   readonly optionsChecked: string[];
   readonly setCheckedList: (value: string[]) => void;
}

const FilterBox: React.FC<Props> = ({ idIncrement, boxTitle, optionsList, optionsChecked, setCheckedList }) => {
   const [needsScroll, setNeedsScroll] = useState(false);
   const optionsBox = createRef<HTMLDivElement>();

   useEffect(() => {
      if (optionsBox.current.clientHeight === 450) {
         setNeedsScroll(true);
      }
   }, []);

   return (
      <div>
         <h4 className={styles.boxTitle}>{boxTitle}</h4>
         <div ref={optionsBox} className={styles.options} style={needsScroll ? { overflowY: 'scroll' } : {}}>
            {
               optionsList.sort().map(((option, idx) => {
                  return (
                     <div className={styles.option} key={option} style={{ paddingLeft: '1rem' }}>
                        <CheckboxInput
                           id={`${boxTitle}-${idx}-${option}-${idIncrement}`}
                           option={option}
                           optionsChecked={optionsChecked}
                           setCheckedList={setCheckedList}
                        />
                        <label className={styles.label} htmlFor={`${boxTitle}-${idx}-${option}-${idIncrement}`}>
                           {option ? option.toUpperCase() : `< NO ${boxTitle} >`}
                        </label>
                     </div>
                  )
               }))
            }
         </div>
      </div>
   )
}

export default FilterBox;
