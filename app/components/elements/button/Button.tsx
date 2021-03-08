import React from 'react'

interface Props {
   label: string,
   clickHandler: Function
}

const Button: React.FC<Props> = ({ label, clickHandler }) => {
   return (
      <button onClick={e => clickHandler(e)}>
         {label}
      </button>
   )
}

export default Button
