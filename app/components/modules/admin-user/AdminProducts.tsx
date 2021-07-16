import React, { useEffect, useState } from 'react';
import Product from '../../../interfaces-objects/Product';
import Loading from '../loading/Loading';
import ProductsForm from './ProductsForm';
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
   const [productSelected, setProductSelected] = useState<Product>(null);
   
   useEffect(() => {
      setCurrentTab(tabs[0]);
   }, []);

   useEffect(() => {
      if (productSelected) setCurrentTab(tabs[2]);
   }, [productSelected])

   return (
      <>
         <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
         />

         {
            currentTab === tabs[0] ?
               list.length ?
                  <ProductsOverview
                     setItemToUpdate={setProductSelected}
                     list={list}
                  />
                  : <Loading />
               : null
         }

         {
            currentTab === tabs[1] &&
               <ProductsForm />
         }

         {
            currentTab === tabs[2] &&
               <ProductsForm
                  currentTab={currentTab}
                  tabs={tabs}
                  product={productSelected}
                  setProductSelected={setProductSelected}
               />
         }
      </>
   )
}

export default withTabState<Props>(AdminProducts);