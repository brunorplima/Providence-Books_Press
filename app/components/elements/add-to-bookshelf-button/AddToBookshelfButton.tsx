import React, { CSSProperties } from 'react'
import Frame from '../../layouts/Frame'
import Button from '../button/Button'

interface Props {
   clickHandler: () => void,
   style?: CSSProperties
}

const AddToBookshelfButton: React.FC<Props> = ({ clickHandler, style }) => {

   const frameStyle = {
      padding: '.5rem 0',
      display: 'flex',
      justifyContent: 'center'
   }

   return (
      <Frame style={frameStyle}>
         <Button label='ADD TO BOOKSHELF' clickHandler={clickHandler} style={style} />
      </Frame>
   )
}

export default AddToBookshelfButton
