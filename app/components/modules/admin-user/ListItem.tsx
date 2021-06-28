import React from 'react';
import { RiDeleteBinFill, RiFileEditFill } from 'react-icons/ri';
import { deleteAny } from '../../../firebase/delete';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import Dialog from '../dialog/Dialog';
import { CgDetailsMore } from 'react-icons/cg';

interface Props {
   readonly itemId: string;
   readonly firestorePath: string;
   readonly itemType: 'product' | 'article' | 'order';
   readonly isFirstItem: boolean;
}

const ListItem: React.FC<Props> = ({ children, isFirstItem, itemId, firestorePath, itemType }) => {

   let className = 'LI-item';

   if (isFirstItem) className += ' LI-borderTop';

   const dialogName = 'Delete-item-' + itemId;

   return (
      <>
         <div className={className}>
            {children}
            <div className='LI-actions'>
               <div><CgDetailsMore /></div>
               <div><RiFileEditFill /></div>
               <div onClick={() => openDialog(dialogName)}>
                  <RiDeleteBinFill />
               </div>
            </div>
         </div>

         <Dialog
            name={dialogName}
            message={`Do you want to permanently delete this ${itemType} from the database?`}
            buttonsOptions={[
               {
                  label: 'Delete',
                  secondaryStyle: true,
                  clickHandler: async () => {
                     
                     closeDialog();
                  }
               },
               {
                  label: 'Cancel',
                  secondaryStyle: false,
                  clickHandler: () => closeDialog()
               }
            ]}
            dialogType={'warning'}
         />
      </>
   )
}

export default ListItem;
