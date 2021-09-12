import React, { useEffect, useState } from 'react'
import { Order } from '../../../interfaces-objects/interfaces'
import Loading from '../loading/Loading'
import OrdersOverview from './OrdersOverview'
import Tabs from './Tabs'
import withTabState from './withTabState'

interface Props {
   readonly currentTab?: string
   readonly setCurrentTab?: (tab: string) => void
   readonly tabs: string[]
   readonly list: Order[]
}

const AdminOrders: React.FC<Props> = ({
   currentTab,
   setCurrentTab,
   tabs,
   list
}) => {
   const [orderSelected, setOrderSelected] = useState<Order>(null)

   useEffect(() => {
      setCurrentTab(tabs[0]);
   }, [])

   return (
      <>
         <Tabs
            {...{ currentTab, setCurrentTab, tabs }}
         />

         {
            currentTab === tabs[0] ?
               list.length ?
                  <OrdersOverview
                     setItemToUpdate={setOrderSelected}
                     list={list}
                  />
                  : <Loading localIsLoading />
               : null
         }

         {
            currentTab === tabs[1] &&
            <></>
         }

         {
            currentTab === tabs[2] &&
            <></>
            // <ProductsForm
            //    currentTab={currentTab}
            //    tabs={tabs}
            //    currentProduct={(productSelected as Book | EBook | AudioBook)}
            //    setProductSelected={setProductSelected}
            // />
         }
      </>
   )
}

export default withTabState<Props>(AdminOrders)
