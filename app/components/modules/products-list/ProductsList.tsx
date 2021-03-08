import React, { Component } from 'react'
import Pagination from '../../elements/pagination/Pagination'
import ProductItem from '../../elements/product-item/ProductItem'
import Frame from '../../layouts/Frame'
import data from './data.json'

// interface Props {
//    data: any
// }

export class ProductsList extends Component {


   render() {
      const innerFrame = {
         padding: 10,
         display: 'flex',
         flexWrap: 'wrap'
      }

      const outerFrame = {
         padding: 10,
      }
      return (
         <Frame style={{}}>
            <Frame style={innerFrame}>
               {
                  data.map((val, i) => {
                     if (i >= 15) return null;
                     return <ProductItem
                        key={val.productId}
                        productId={val.productId}
                        author={val.author}
                        name={val.name}
                        price={val.price}
                        addToBookshelf={() => { }}
                     />
                  })
               }
            </Frame>
            <Frame style={{...innerFrame, justifyContent: 'end'}}>
               <Pagination />
            </Frame>
         </Frame>
      )
   }
}

export default ProductsList
