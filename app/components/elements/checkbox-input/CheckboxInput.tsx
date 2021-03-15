import React, { useEffect, useState } from 'react'

interface Props {
   id: string,
   option: string,
   optionsChecked: string[],
   setCheckedList: (options: string[]) => void
}

const CheckboxInput: React.FC<Props> = ({ id, option, optionsChecked, setCheckedList }) => {

   const [checked, setChecked] = useState<boolean>(false);

   useEffect(() => {
      if (optionsChecked.includes(option)) {
         setChecked(true)
      }
   }, []);

   useEffect(() => {
      if (checked) {
         const newOptionsChecked = [...optionsChecked]
         newOptionsChecked.push(option);
         setCheckedList(newOptionsChecked);
      } else {
         const newOptionsChecked = optionsChecked.filter(opt => opt !== option);
         setCheckedList(newOptionsChecked)
      }
   }, [checked]);

   return (
      <input
         type='checkbox'
         id={id}
         onChange={() => setChecked(!checked)}
         checked={checked}
      />
   )
}

export default CheckboxInput
