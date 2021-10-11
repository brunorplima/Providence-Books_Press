import React, { useState } from 'react'
import { User } from '../../../interfaces-objects/interfaces'
import UserInformation from './UserInformation'
import EditUserInformation from './EditUserInformation'

interface Props {
   readonly currentUser: User
}

const UserInformationContainer: React.FC<Props> = ({ currentUser }) => {
   const [isEdit, setIsEdit] = useState(false)
   return (
      <>
         {
            isEdit &&
            <EditUserInformation {...{ currentUser, setIsEdit }} />
         }

         {
            !isEdit &&
            <UserInformation {...{ currentUser, setIsEdit }} />
         }
      </>
   )
}

export default UserInformationContainer
