import React from 'react'

interface Props {
   className: string,
   type: string,
   name: string,
   value: string,
   placeholder: string,
   changeHandler: Function
}

const TextInput: React.FC<Props> = ({ className, type, name, value, placeholder, changeHandler }) => {
   return (
      <input
         className={className}
         type={type}
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={e => changeHandler(e.currentTarget.value)}
      />
   )
}

export default TextInput
