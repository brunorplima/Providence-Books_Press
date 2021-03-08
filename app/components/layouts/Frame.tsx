import React from 'react'

interface Props {
   style: Object,
}

const Frame: React.FC<Props> = ({ style, children }) => {
   return (
      <div style={style}>
         {children}
      </div>
   )
}

export default Frame
