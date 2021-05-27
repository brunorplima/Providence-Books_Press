import React, { CSSProperties } from 'react';
import Product from '../../../interfaces-objects/Product';
import Frame from '../../layouts/Frame';
import Button from '../../elements/button/Button';
import { store } from '../../../redux/store/store';
import { createAddToBookshelfAction } from '../../../redux/actions/bookshelfActions';
import styles from '../../../styles/add-to-bookshelf/AddToBookshelf.module.css';
import { GiCheckMark } from 'react-icons/gi';
import { BookshelfItem } from '../../../interfaces-objects/interfaces';
import LinkLoading from '../../elements/link-loading/LinkLoading';

interface Props {
   readonly product: Product;
   readonly style?: CSSProperties;
}

interface State {
   wasAdded: boolean
}

class AddToBookshelfButton extends React.Component<Props, State>  {

   constructor(props) {
      super(props);

      this.state = {
         wasAdded: false
      }

      this.addToBookshelf = this.addToBookshelf.bind(this);
   }

   componentDidMount() {
      const { product } = this.props;
      const bookshelf = store.getState().bookshelf;
      const bools = bookshelf.map((item: BookshelfItem) => item.id === product._id);
      if (bools.includes(true))
         this.setState({ wasAdded: true });
   }

   addToBookshelf() {
      const { product } = this.props
      store.dispatch(createAddToBookshelfAction(product))
      this.setState({ wasAdded: true });
   }


   render() {
      const frameStyle = {
         padding: '.5rem 0',
         display: 'flex',
         justifyContent: 'center'
      }

      const { style } = this.props;

      const { wasAdded } = this.state;

      return (
         <Frame style={frameStyle}>
            {
               wasAdded ?
                  <LinkLoading
                     href='/bookshelf'
                     className={styles.link}
                     style={style ? style : {}}
                  >
                     <div><GiCheckMark /></div>
                     <div>OPEN BOOKSHELF</div>
                  </LinkLoading> :
                  <Button label='ADD TO BOOKSHELF' clickHandler={this.addToBookshelf} style={style} />
            }
         </Frame>
      )
   }
}

export default AddToBookshelfButton;
