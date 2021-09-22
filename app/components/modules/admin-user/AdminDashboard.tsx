import React from 'react';
import { User } from '../../../interfaces-objects/interfaces';
import Box from './Box';
import UserGreeting from './UserGreeting';

interface Props {
   readonly admin: User
}

const AdminDashboard: React.FC<Props> = ({ admin }) => {
   return (
      <>
         <UserGreeting userName={admin?.firstName} />

         <Box
            title={'Stats'}
            paddingAll
         >
            
         </Box>

         <Box
            title={'Next billings'}
            paddingVertical
         >
            
         </Box>

         <Box
            title={'Overdue billings'}
            paddingVertical
         >
            
         </Box>
      </>
   )
}

export default AdminDashboard;
