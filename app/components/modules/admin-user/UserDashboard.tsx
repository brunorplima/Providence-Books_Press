import React from 'react'
import { User } from '../../../interfaces-objects/interfaces'
import UserGreeting from './UserGreeting'

interface Props {
   user: User
}

const UserDashboard: React.FC<Props> = ({ user }) => {
   return (
      <div>
         <UserGreeting userName={user?.firstName} />
      </div>
   )
}

export default UserDashboard
