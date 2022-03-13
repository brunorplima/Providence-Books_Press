import React, { createRef, useContext, useEffect, useState } from 'react'
import Box from './Box'
import ListSearch from './ListSearch'
import styles from '../../../styles/admin-user/BoxContent.module.css'
import ListPagination from './ListPagination'
import { User } from '../../../interfaces-objects/interfaces'
import { adminContext } from '../../contexts/AdminProvider'
import withListState, { ListWithState } from './withListState'
import ListItem from './ListItem'
import splitListInPages from '../../../util/splitListInPages'
import * as R from 'ramda'
import Modal from '../../elements/modal/Modal'
import UserInfo from './UserInfo'
import UserDetails from './UserDetails'

const AdminUsers: React.FC<ListWithState> = ({
   pagination,
   listPageMax,
   increasePage,
   decreasePage,
   toFirstPage,
   toLastPage,
   search,
   setSearch
}) => {
   const [isDetailsOpen, setIsDetailsOpen] = useState(false)
   const [selectedUser, setSelectedUser] = useState(null)
   const { users, listenForUsers } = useContext(adminContext)
   const container = createRef<HTMLDivElement>();

   useEffect(() => {
      listenForUsers()
   }, [])

   function getFilteredUsers() {
      const sortedUsers = R.sort(R.descend<User>(R.prop('since')))(users)
      if (!search) return sortedUsers
      return sortedUsers.filter(user => {
         return user.firstName.includes(search) ||
            user.lastName.includes(search) ||
            user.email.includes(search)
      })
   }

   function openDetails(user: User) {
      setSelectedUser(user)
      setIsDetailsOpen(true)
   }

   return (
      <div>
         <Box paddingVertical title='USERS'>
            <div className={styles.listHeader} ref={container}>
               <ListSearch search={search} setSearch={setSearch} />
            </div>

            <div className={styles.upperPagination}>
               <ListPagination
                  boxContainer={container}
                  listToRender={users}
                  pagination={pagination}
                  listPageMax={listPageMax}
                  increasePage={increasePage}
                  decreasePage={decreasePage}
                  toFirstPage={toFirstPage}
                  toLastPage={toLastPage}
               />
            </div>

            <div className={styles.list}>
               {
                  splitListInPages<User>(getFilteredUsers(), pagination, listPageMax)
                     .map((user, idx) => {
                        return (
                           <ListItem
                              key={user._id}
                              itemId={user._id}
                              item={user}
                              onDelete={() => { }}
                              itemType='user'
                              isFirstItem={!idx}
                              setItemToUpdate={() => { }}
                              allowedActions={{
                                 hasDetails: true
                              }}
                              openDetails={() => openDetails(user)}
                           >
                              <UserInfo user={user} />  
                           </ListItem>
                        )
                     })
               }
            </div>

            <div className={styles.listFooter}>
               {!search && <div>There are {users.length} users</div>}
               {search && <div>Found {getFilteredUsers().length} users with search criteria</div>}
               <ListPagination
                  boxContainer={container}
                  listToRender={users}
                  pagination={pagination}
                  listPageMax={listPageMax}
                  increasePage={increasePage}
                  decreasePage={decreasePage}
                  toFirstPage={toFirstPage}
                  toLastPage={toLastPage}
                  doesScroll
               />
            </div>
         </Box>

         {
            isDetailsOpen &&
            <Modal
               closeModal={() => setIsDetailsOpen(false)}
               title='USER INFO'
            >
               <UserDetails
                  selectedUser={selectedUser}
               />
            </Modal>
         }
      </div>
   )
}

export default withListState<ListWithState, User>(AdminUsers)
