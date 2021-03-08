import React from 'react'

interface Props {
   flag: string
}

const ProductItemFlag: React.FC<Props> = ({ flag }) => {
   return (
      <div>
         <div>{flag}</div>
      </div>
   )
}

export default ProductItemFlag
