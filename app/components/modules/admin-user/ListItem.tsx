import React from 'react';
import { RiDeleteBinFill, RiFileEditFill } from 'react-icons/ri';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import Dialog from '../dialog/Dialog';
import { CgDetailsMore } from 'react-icons/cg';
import { Article } from '../../../interfaces-objects/interfaces';
import Product from '../../../interfaces-objects/Product';

interface Props {
   readonly itemId: string;
   readonly item: Product | Article;
   readonly firestorePath: string;
   readonly itemType: 'product' | 'article' | 'order';
   readonly isFirstItem: boolean;
   readonly setItemToUpdate: Function;
}

const ListItem: React.FC<Props> = ({ children, isFirstItem, itemId, item, setItemToUpdate, firestorePath, itemType }) => {

   let className = 'LI-item';

   if (isFirstItem) className += ' LI-borderTop';

   const dialogName = 'Delete-item-' + itemId;

   return (
      <>
         <div className={className}>
            {children}
            <div className='LI-actions'>
               <div><CgDetailsMore /></div>
               <div onClick={() => setItemToUpdate(item)}><RiFileEditFill /></div>
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
