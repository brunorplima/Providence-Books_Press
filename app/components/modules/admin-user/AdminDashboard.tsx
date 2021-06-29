import React from 'react';
import Box from './Box';
import UserGreeting from './UserGreeting';

const AdminDashboard = () => {
   return (
      <>
         <UserGreeting userName={'Andrew'} />

         <Box
            title={'Stats'}
            paddingAll
         >
            <p>Marveo jest ino tarbunam manito dae ti covan danebias</p>
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
