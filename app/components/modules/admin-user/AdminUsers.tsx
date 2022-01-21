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
import NameInitials from '../../elements/name-initials/NameInitials'
import * as R from 'ramda'

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

   function getFilteredUsers() {
      const sortedUsers = R.sort(R.descend<User>(R.prop('since')))(users)
      if (!search) return sortedUsers
      return sortedUsers.filter(user => {
         return user.firstName.includes(search) ||
            user.lastName.includes(search) ||
            user.email.includes(search)
      })
   }

   function renderAddress(address) {
      const getProp = prop => R.prop(prop)(address)
      const mainString = getProp('main') ? getProp('main') : ''
      const cityString = getProp('city') ? `${mainString && ' - '}${getProp('city')}` : ''
      const stateString = getProp('stateProvince') ? getProp('stateProvince') : ''
      const countryString = getProp('country') ? `${stateString && ', '}${getProp('country')}` : ''
      if (!mainString && !cityString && !stateString && !countryString)
         return ['User did not add address']
      return [mainString + cityString, stateString + countryString]
   }

   const isAdmin = (user: User): boolean => user.role === 'master admin' || user.role === 'admin'

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
                              hasActions={false}
                           >

                              <div className='LI-image'>
                                 {
                                    user.photoURL ?
                                    <img src={user.photoURL} style={{ maxWidth: '5rem' }} /> :
                                    <NameInitials name={`${user.firstName} ${user.lastName}`} size={45} fontSize='15pt'/>
                                 }
                              </div>

                              <div className='LI-flex3'>
                                 <b style={isAdmin(user) ? { color: 'var(--mainYellow)' } : {}}>{user.firstName} {user.lastName}</b>
                                 {
                                    user.dateOfBirth &&
                                    <div>Date of birth: {new Date(user.dateOfBirth).toString().split(' ').slice(1, 4).join(' ')}</div>
                                 }
                                 {
                                    user.gender &&
                                    <div>Sex: {user.gender}</div>
                                 }
                                 <div>User since {(user.since as Date).toDateString().substring(4)}</div>
                              </div>

                              <div className='LI-flex3'>
                                 <strong>Address:</strong>
                                 {
                                    user.address ?
                                    renderAddress(user.address).map(el => {
                                       return <div key={JSON.stringify(el)}>{el}</div>
                                    }) :
                                    <div>User did not add address</div>
                                 }
                              </div>

                              <div className='LI-flex3'>
                                 <strong>Contact:</strong>
                                 <div style={{ marginBottom: 10 }}>Email: {user.email}</div>
                                 {(user.primaryContactNumber || user.secondaryContactNumber) && <div>Phone number:</div>}
                                 {user.primaryContactNumber && <div>{user.primaryContactNumber}</div>}
                                 {user.secondaryContactNumber && <div>{user.secondaryContactNumber}</div>}
                              </div>
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
      </div>
   )
}

export default withListState<ListWithState, User>(AdminUsers)
