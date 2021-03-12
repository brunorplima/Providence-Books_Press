import React from 'react'

interface Props {
   type: string,
   name: string,
   value: string,
   placeholder: string,
   changeHandler: Function
}

const TextInput: React.FC<Props> = ({ type, name, value, placeholder, changeHandler }) => {
   return (
      <input
         type={type}
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={e => changeHandler(e.currentTarget.value)}
      />
   )
}

export default TextInput
