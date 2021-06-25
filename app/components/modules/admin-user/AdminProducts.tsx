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
   readonly listSearch?: Product[];
   readonly setListSearch?: (list: Product[]) => void;
   readonly search?: string;
   readonly setSearch?: (search: string) => void;
   readonly pagination?: number;
   readonly listPageMax?: number;
   readonly setListPageMax?: (listPageMax: number) => void;
   readonly increasePage?: () => void;
   readonly decreasePage?: () => void;
   readonly toFirstPage?: () => void;
   readonly toLastPage?: () => void;
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

         {
            // currentTab === tabs[0] ?
            //    list.length ?
            //       <ProductsOverview
            //          list={list}
            //       />
            //       : <Loading />
            //    : null
         }
      </>
   )
}

export default withTabState<Props>(AdminProducts);