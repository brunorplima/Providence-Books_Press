import React from 'react'
import { prop } from 'ramda'
import { User } from '../../../interfaces-objects/interfaces'
import NameInitials from '../../elements/name-initials/NameInitials'

interface Props {
   readonly user: User
}

const UserInfo: React.FC<Props> = ({ user }) => {

   function renderAddress(address) {
      const getProp = property => prop(property)(address)
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
      <>
         <div className='LI-image'>
            {
               user.photoURL ?
                  <img src={user.photoURL} style={{ maxWidth: '5rem' }} /> :
                  <NameInitials name={`${user.firstName} ${user.lastName}`} size={45} fontSize='15pt' />
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
      </>
   )
}

export default UserInfo