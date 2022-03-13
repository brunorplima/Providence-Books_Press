import React from 'react';
import { RiDeleteBinFill, RiFileEditFill } from 'react-icons/ri';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import Dialog from '../dialog/Dialog';
import { CgDetailsMore } from 'react-icons/cg';
import { Article, Order, User } from '../../../interfaces-objects/interfaces';
import Product from '../../../interfaces-objects/Product';

interface Props {
   readonly itemId: string;
   readonly item: Product | Article | Order | User;
   readonly onDelete: (itemId: string) => any;
   readonly itemType: 'product' | 'article' | 'order' | 'user';
   readonly isFirstItem: boolean;
   readonly setItemToUpdate: Function;
   readonly openDetails?: () => void
   readonly allowedActions?: ItemActions
}

type ItemActions = {
   readonly hasDetails?: boolean
   readonly hasEdit?: boolean
   readonly hasDelete?: boolean
}

const ListItem: React.FC<Props> = ({ children, isFirstItem, itemId, item, openDetails, setItemToUpdate, onDelete, itemType, allowedActions = defaultItemActions }) => {

   let className = 'LI-item';

   if (isFirstItem) className += ' LI-borderTop';

   const dialogName = 'Delete-item-' + itemId;

   return (
      <>
         <div className={className}>
            {children}
            {
               allowedActions &&
               <div className='LI-actions'>
                  {allowedActions.hasDetails && <div onClick={openDetails}><CgDetailsMore /></div>}
                  {allowedActions.hasEdit && <div onClick={() => setItemToUpdate(item)}><RiFileEditFill /></div>}
                  {
                     allowedActions.hasDelete &&
                     <div onClick={() => openDialog(dialogName)}>
                        <RiDeleteBinFill />
                     </div>
                  }
               </div>
            }
         </div>

         <Dialog
            name={dialogName}
            message={`Do you want to permanently delete this ${itemType} from the database?`}
            buttonsOptions={[
               {
                  label: 'DELETE',
                  secondaryStyle: true,
                  clickHandler: async () => {
                     onDelete(itemId)
                     closeDialog();
                  }
               },
               {
                  label: 'CANCEL',
                  secondaryStyle: false,
                  clickHandler: () => closeDialog()
               }
            ]}
            dialogType={'warning'}
         />
      </>
   )
}

const defaultItemActions: ItemActions = {
   hasDetails: true,
   hasEdit: true,
   hasDelete: true
}

export default ListItem;
