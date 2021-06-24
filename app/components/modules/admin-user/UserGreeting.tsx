import React from 'react';
import months, { week } from '../../../util/months';

interface Props {
   readonly userName: string;
}

const UserGreeting: React.FC<Props> = ({ userName }) => {
   const today = new Date(Date.now());
   return (
      <div style={{
         display: 'flex',
         justifyContent: 'space-between',
      }}>
         <div style={{ fontSize: '16pt' }}>
            Hi {userName}!
         </div>

         <div style={{ fontSize: '14pt' }}>
            {week[today.getDay()]}, {months[today.getMonth()]} {today.getDate()} {today.getFullYear()}
         </div>
      </div>
   )
}

export default UserGreeting
