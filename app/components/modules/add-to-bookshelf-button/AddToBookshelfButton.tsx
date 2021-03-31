import React, { CSSProperties } from 'react'
import Product from '../../../interfaces-objects/Product'
import Frame from '../../layouts/Frame'
import Button from '../../elements/button/Button'
import { store } from '../../../redux/store/store'
import { createAddToBookshelfAction } from '../../../redux/actions/bookshelfActions'

interface Props {
   product: Product,
   style?: CSSProperties
}

class AddToBookshelfButton extends React.Component<Props>  {

   constructor(props) {
      super(props);

      this.addToBookshelf = this.addToBookshelf.bind(this);
   }

   addToBookshelf() {
      const { product } = this.props
      store.dispatch(createAddToBookshelfAction(product))
   }


   render() {
      const frameStyle = {
         padding: '.5rem 0',
         display: 'flex',
         justifyContent: 'center'
      }

      const { style } = this.props;

      return (
         <Frame style={frameStyle}>
            <Button label='ADD TO BOOKSHELF' clickHandler={this.addToBookshelf} style={style} />
         </Frame>
      )
   }
}

export default AddToBookshelfButton
