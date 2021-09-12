import React, { useEffect, useState } from 'react'
import { Order } from '../../../interfaces-objects/interfaces'
import { useAdminContext } from '../../contexts/AdminProvider'
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
   const { orders, listenForOrders } = useAdminContext()

   useEffect(() => {
      setCurrentTab(tabs[0]);
      if (!orders) listenForOrders()
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
                     list={orders ? orders : []}
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
         }
      </>
   )
}

export default withTabState<Props>(AdminOrders)
