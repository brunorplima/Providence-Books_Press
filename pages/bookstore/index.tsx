import React, { Component } from 'react'
import Head from 'next/head'
import Frame from '../../app/components/layouts/Frame'
import Sidebar from '../../app/components/modules/side-bar/SideBar';
import ProductsList from '../../app/components/modules/products-list/ProductsList';

export class index extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      const frameStyle = {
         padding: '1rem 1rem 1rem 0',
         display: 'flex'
      };
      const dummyCategories = ['DOCTRINE', 'CHURCH & CULTURE', 'SERMONS', 'COMMENTARIES'];
      const dummyAuthors = ['BAUCHAM, VODDIE', 'GILLEY, GARY', 'CALVIN, JOHN', 'AUGUSTINE'];
      const dummyPublishers = ['PROVIDENCE PRESS', 'CROSSWAY'];
      return (
         <>
            <Head>
               <title>Bookstore</title>
               <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Frame style={frameStyle}>
               <Sidebar 
                  categories={dummyCategories}
                  authors={dummyAuthors}
                  publishers={dummyPublishers}
                  checkedCategories={[]}
                  checkedAuthors={[]}
                  checkedPublishers={[]}
               />
               <ProductsList />
            </Frame>

         </>
      )
   }
}

export default index
