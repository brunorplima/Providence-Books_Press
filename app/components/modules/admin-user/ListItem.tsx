import React from 'react';

interface Props {
   readonly isFirstItem: boolean;
}

const ListItem: React.FC<Props> = ({ children, isFirstItem }) => {

   let className = 'LI-item';

   if (isFirstItem) className += ' LI-borderTop';

   return (
      <div className={className}>
         {children}
      </div>
   )
}

export default ListItem;
