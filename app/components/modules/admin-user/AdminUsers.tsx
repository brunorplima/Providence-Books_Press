import React, { createRef, useContext, useEffect } from 'react'
import Box from './Box'
import ListSearch from './ListSearch'
import styles from '../../../styles/admin-user/BoxContent.module.css'
import ListPagination from './ListPagination'
import { User } from '../../../interfaces-objects/interfaces'
import { adminContext } from '../../contexts/AdminProvider'
import withListState, { ListWithState } from './withListState'
import ListItem from './ListItem'
import splitListInPages from '../../../util/splitListInPages'

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
   const { users, listenForUsers } = useContext(adminContext)
   const container = createRef<HTMLDivElement>();

   useEffect(() => {
      listenForUsers()
   }, [])

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
                  splitListInPages<User>(users, pagination, listPageMax)
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
                           >

                              <div className='LI-image'>
                                 <img src={user.photoURL}/>
                              </div>

                              <div className='LI-flex3'>
                                 <b>{user.firstName} {user.lastName}</b>
                              </div>

                              {
                                 user.address &&
                                 <>
                                    <div className='LI-flex3'>
                                       <div>{user.address.main} - {user.address.city}</div>
                                       <div>{user.address.stateProvince}, {user.address.country}</div>
                                    </div>
                                 </>
                              }

                              <div className='LI-flex3'>
                                 <div style={{ marginBottom: 10 }}>Email: {user.email}</div>
                                 {(user.primaryContactNumber || user.secondaryContactNumber) && <div>Contact:</div>}
                                 {user.primaryContactNumber && <div>{user.primaryContactNumber}</div>}
                                 {user.secondaryContactNumber && <div>{user.secondaryContactNumber}</div>}
                              </div>
                           </ListItem>
                        )
                     })
               }
            </div>

            <div className={styles.listFooter}>
               <div>There are {users.length} users</div>
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
      </div>
   )
}

export default withListState<ListWithState, User>(AdminUsers)
