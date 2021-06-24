import React, { useState } from 'react';
import Product from '../../../interfaces-objects/Product';
import styles from '../../../styles/admin-user/AdminProducts.module.css';
import ProductsOverview from './ProductsOverview';

interface Props {
   readonly list: Product[];
   readonly tabs: string[];
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
   tabs
}) => {
   const [currentTab, setCurrentTab] = useState(tabs[0]);

   return (
      <>
         <div className={styles.tabs}>
            {
               tabs.map(tab => {
                  return (
                     <div
                        key={tab}
                        className={styles.tab}
                        style={tab === currentTab ? { borderBottom: '3px solid var(--darkYellow)', color: 'var(--darkYellow)' } : {}}
                        onClick={() => {
                           if (tab !== currentTab) setCurrentTab(tab);
                        }}
                     >
                        {tab}
                     </div>
                  )
               })
            }
         </div>


         {
            currentTab === tabs[0] &&
            <ProductsOverview
               list={list}
            />
         }
      </>
   )
}

export default AdminProducts;