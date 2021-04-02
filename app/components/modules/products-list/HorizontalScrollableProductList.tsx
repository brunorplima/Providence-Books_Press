import React, { Component } from 'react'
import Product from '../../../interfaces-objects/Product';
import useScreenWidth, { numberItemsHorizontalScrollablelList } from '../../../util/useScreenWidth'
import styles from '../../../styles/products-list/HorizontalScrollableProductList.module.css'
import HorizontalProductsList from './HorizontalProductsList';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from 'react-icons/ri'
import RelatedProducts from '../product-details/RelatedProducts';

interface Props {
   relatedProducts: Product[],
   screenWidth: number
}

interface State {
   numberItemsShown: number,
   listPagination: number
}



const ComponentWrapper: React.FC<{ relatedProducts: Product[] }> = ({ relatedProducts }) => {
   const screenWidth = useScreenWidth();

   return <HorizontalScrollableProductList screenWidth={screenWidth} relatedProducts={relatedProducts} />
}



class HorizontalScrollableProductList extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = {
         numberItemsShown: numberItemsHorizontalScrollablelList(this.props.screenWidth),
         listPagination: 1
      }

      this.increasePagination = this.increasePagination.bind(this);
      this.decreasePagination = this.decreasePagination.bind(this);
   }

   componentDidUpdate() {
      if (numberItemsHorizontalScrollablelList(this.props.screenWidth) !== this.state.numberItemsShown)
         this.setState({ numberItemsShown: numberItemsHorizontalScrollablelList(this.props.screenWidth) });
   }

   getShownList(): Product[] {
      const { relatedProducts } = this.props;
      const { numberItemsShown, listPagination } = this.state;
      const max = numberItemsShown * listPagination;

      const shownList = relatedProducts.slice(max - numberItemsShown, max < relatedProducts.length ? max : relatedProducts.length);

      return shownList;
   }

   getMaxPagination(): number {
      return Math.ceil(this.props.relatedProducts.length / this.state.numberItemsShown);
   }

   increasePagination() {
      if (this.state.listPagination < this.getMaxPagination())
         this.setState({ listPagination: this.state.listPagination + 1 })
   }

   decreasePagination() {
      if (this.state.listPagination > 1)
         this.setState({ listPagination: this.state.listPagination - 1 })
   }

   render() {
      const { listPagination } = this.state;

      return (
         <div className={styles.container}>
            {
               listPagination !== 1 && <div className={styles.arrowLeft} onClick={this.decreasePagination}><RiArrowLeftCircleFill /></div>
            }

            <HorizontalProductsList productItems={this.getShownList()} />

            {
               listPagination !== this.getMaxPagination() && <div className={styles.arrowRight} onClick={this.increasePagination}><RiArrowRightCircleFill /></div>
            }
         </div>
      )
   }
}

export default ComponentWrapper;
