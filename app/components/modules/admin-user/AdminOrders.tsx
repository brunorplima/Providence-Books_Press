import React, { useEffect, useState } from 'react'
import { Order } from '../../../interfaces-objects/interfaces'
import { useAdminContext } from '../../contexts/AdminProvider'
import Loading from '../loading/Loading'
import Box from './Box'
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage'
import OrdersForm from './OrdersForm'
import OrdersOverview from './OrdersOverview'
import Tabs from './Tabs'
import withTabState from './withTabState'

interface Props {
   readonly currentTab?: string
   readonly setCurrentTab?: (tab: string) => void
   readonly tabs: string[]
}

const AdminOrders: React.FC<Props> = ({
   currentTab,
   setCurrentTab,
   tabs
}) => {
   const [orderSelected, setOrderSelected] = useState<Order>(null)
   const { orders, listenForOrders } = useAdminContext()

   useEffect(() => {
      setCurrentTab(tabs[0]);
      if (!orders) listenForOrders()
   }, [])

   useEffect(() => {
      if (orderSelected) setCurrentTab(tabs[2])
   }, [orderSelected])

   useEffect(() => {
      if (currentTab !== tabs[2] && orderSelected) setOrderSelected(null)
   }, [currentTab])

   return (
      <>
         <Tabs
            {...{ currentTab, setCurrentTab, tabs }}
         />

         {
            currentTab === tabs[0] ?
               orders?.length ?
                  <OrdersOverview
                     setItemToUpdate={setOrderSelected}
                     list={orders ? orders : []}
                  />
                  : <Loading localIsLoading />
               : null
         }

         {
            currentTab === tabs[1] &&
            <Box title='ADD BILLING TO THE DATABASE' paddingVertical>
               <OrdersForm />
            </Box>
         }

         {
            currentTab === tabs[2] &&
            <>
               {
                  orderSelected ?
                     <Box title='UPDATE EXISTING BILLING' paddingVertical>
                        <OrdersForm
                           currentOrder={orderSelected}
                           setCurrentOrder={setOrderSelected}
                        />
                     </Box> :
                     <EmptyUpdateFormMessage messageType='order' />
               }
            </>
         }
      </>
   )
}

export default withTabState<Props>(AdminOrders)
