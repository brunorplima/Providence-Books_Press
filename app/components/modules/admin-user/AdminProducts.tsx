import React, { useEffect, useState } from 'react';
import Product from '../../../interfaces-objects/Product';
import Loading from '../loading/Loading';
import ProductsOverview from './ProductsOverview';
import Tabs from './Tabs';
import withTabState from './withTabState';

interface Props {
   readonly list: Product[];
   readonly tabs: string[];
   readonly currentTab?: string;
   readonly setCurrentTab?: (tab: string) => void;
}

const AdminProducts: React.FC<Props> = ({
   list,
   tabs,
   currentTab,
   setCurrentTab
}) => {
   
   useEffect(() => {
      setCurrentTab(tabs[0]);
   }, []);

   return (
      <>
         <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
         />

         {/* {
            currentTab === tabs[0] ?
               list.length ?
                  <ProductsOverview
                     list={list}
                  />
                  : <Loading />
               : null
         } */}
      </>
   )
}

export default withTabState<Props>(AdminProducts);