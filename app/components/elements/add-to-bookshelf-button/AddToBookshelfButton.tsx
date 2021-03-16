import React from 'react'
import Frame from '../../layouts/Frame'
import Button from '../button/Button'

interface Props {
   clickHandler: Function
}

const AddToBookshelfButton: React.FC<Props> = ({ clickHandler }) => {

   const frameStyle = {
      padding: '.5rem 0',
      display: 'flex',
      justifyContent: 'center'
   }

   return (
      <Frame style={frameStyle}>
         <Button label='ADD TO BOOKSHELF' clickHandler={clickHandler} />
      </Frame>
   )
}

export default AddToBookshelfButton
