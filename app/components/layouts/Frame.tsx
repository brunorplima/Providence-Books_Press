import React from 'react'

interface Props {
   style?: React.CSSProperties,
   className?: string
}

const Frame: React.FC<Props> = ({ style, className, children }) => {
   return (
      <div className={className} style={style}>
         {children}
      </div>
   )
}

export default Frame
