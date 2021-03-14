import React, { Component } from 'react'
import Product from '../../../interfaces-objects/Product';
import Book from '../../../interfaces-objects/Book';
import ProductItem from '../../elements/product-item/ProductItem'
import Frame from '../../layouts/Frame'

interface Props {
   products: Product[]
}

export class ProductsList extends Component<Props> {


   render() {
      const { products } = this.props;

      const frameStyle = {
         padding: 10,
         display: 'flex',
         flexWrap: 'wrap'
      }

      const outerFrame = {
         padding: 10,
      }
      return (
         <Frame style={{}}>
            <Frame style={frameStyle}>
               {
                  products.map((product, i) => {
                     return (
                        <ProductItem
                           key={product._id}
                           productId={product._id}
                           images={product.images}
                           authors={(product as Book).authors}
                           name={product.name}
                           price={product.price}
                           addToBookshelf={() => { }}
                        />
                     )
                  })
               }
            </Frame>
         </Frame>
      )
   }
}

export default ProductsList
