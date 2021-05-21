import React, { Component, CSSProperties } from 'react';
import Product from '../../../interfaces-objects/Product';
import useScreenWidth, { numberItemsHorizontalScrollablelList } from '../../../util/useScreenWidth';
import styles from '../../../styles/products-list/HorizontalScrollableProductList.module.css';
import HorizontalProductsList from './HorizontalProductsList';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from 'react-icons/ri';
import SlideSelectors from '../../elements/slide-selectors/SlideSelectors';

interface WrapperProps {
   readonly relatedProducts: Product[];
   readonly useSelectors?: boolean;
   readonly innerStyle?: CSSProperties;
   readonly useSlide?: boolean;
}

interface Props {
   readonly screenWidth: number;
   readonly relatedProducts: Product[];
   readonly useSelectors?: boolean;
   readonly innerStyle?: CSSProperties;
   readonly useSlide?: boolean;
}

interface State {
   numberItemsShown: number,
   listPagination: number
}



const HorizontalScrollableProductList: React.FC<WrapperProps> = ({
   relatedProducts,
   innerStyle,
   useSelectors,
   useSlide
}) => {
   const screenWidth = useScreenWidth();

   return (
      <ScrollableProductList
         screenWidth={screenWidth}
         relatedProducts={relatedProducts}
         useSelectors={useSelectors}
         innerStyle={innerStyle ? innerStyle : {}}
         useSlide={useSlide}
      />
   )
}


const INTERVAL_TIME = 6000;

class ScrollableProductList extends Component<Props, State> {

   private interval: NodeJS.Timeout;

   constructor(props) {
      super(props);

      this.state = {
         numberItemsShown: numberItemsHorizontalScrollablelList(this.props.screenWidth),
         listPagination: 1
      }

      this.increasePagination = this.increasePagination.bind(this);
      this.decreasePagination = this.decreasePagination.bind(this);
      this.selectPagination = this.selectPagination.bind(this);
      this.runInterval = this.runInterval.bind(this);
   }

   componentDidMount() {
      const { useSlide } = this.props;
      if (useSlide) {
         this.manageInterval('start');
      }
   }

   componentDidUpdate() {
      if (numberItemsHorizontalScrollablelList(this.props.screenWidth) !== this.state.numberItemsShown)
         this.setState({ numberItemsShown: numberItemsHorizontalScrollablelList(this.props.screenWidth) });
   }

   componentWillUnmount() {
      const { useSlide } = this.props;
      if (useSlide) {
         this.manageInterval('stop');
      }
   }

   getShownList(): Product[] {
      const { relatedProducts } = this.props;
      const { numberItemsShown, listPagination } = this.state;
      const max = numberItemsShown * listPagination;

      const shownList = relatedProducts.slice(max - numberItemsShown, max < relatedProducts.length ? max : relatedProducts.length);

      return shownList;
   }

   private getMaxPagination(): number {
      return Math.ceil(this.props.relatedProducts.length / this.state.numberItemsShown);
   }

   private increasePagination() {
      const { listPagination } = this.state;
      const { useSlide } = this.props;
      if (listPagination < this.getMaxPagination()) {
         if (useSlide) this.manageInterval('stop');
         this.setState({ listPagination: listPagination + 1 });
         if (useSlide) this.manageInterval('start');
      }
   }

   private decreasePagination() {
      const { listPagination } = this.state;
      const { useSlide } = this.props;
      if (listPagination > 1) {
         if (useSlide) this.manageInterval('stop');
         this.setState({ listPagination: listPagination - 1 });
         if (useSlide) this.manageInterval('start');
      }
   }

   private selectPagination(pagination: number) {
      const { listPagination } = this.state;
      const { useSlide } = this.props;
      if (this.state.listPagination !== pagination + 1) {
         if (useSlide) this.manageInterval('stop');
         this.setState({ listPagination: pagination + 1 });
         if (useSlide) this.manageInterval('start');
      }
   }

   private runInterval() {
      const { listPagination } = this.state;
      if (listPagination >= this.getMaxPagination()) {
         this.selectPagination(0);
      } else {
         this.increasePagination();
      }
   }

   private manageInterval(action: 'stop' | 'start') {
      if (action === 'start')
         this.interval = setInterval(this.runInterval, INTERVAL_TIME)
      else
         clearInterval(this.interval);
   }

   render() {
      const { listPagination, numberItemsShown } = this.state;
      const { useSelectors, innerStyle, relatedProducts } = this.props;

      const dotsNumber = Math.ceil(relatedProducts.length / numberItemsShown);
      const values: string[] = [];
      for (let i = 1; i <= dotsNumber; i++) values.push(`dot #${i}`);

      return (
         <div className={styles.container}>
            {
               !useSelectors && listPagination !== 1 &&
               <div className={styles.arrowLeft} onClick={this.decreasePagination}><RiArrowLeftCircleFill /></div>
            }

            <HorizontalProductsList productItems={this.getShownList()} style={innerStyle} />

            {
               !useSelectors && listPagination !== this.getMaxPagination() &&
               <div className={styles.arrowRight} onClick={this.increasePagination}><RiArrowRightCircleFill /></div>
            }

            {
               useSelectors &&
               <SlideSelectors
                  values={values}
                  index={listPagination - 1}
                  goToChosenImg={this.selectPagination}
               />
            }
         </div>
      )
   }
}

export default HorizontalScrollableProductList;
