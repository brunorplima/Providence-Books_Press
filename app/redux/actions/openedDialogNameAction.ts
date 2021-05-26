import { CHANGE_OPENED_DIALOG } from '../contants';
import { store } from '../store/store';

export type Action = {
   readonly type: typeof CHANGE_OPENED_DIALOG;
   readonly payload: string;
}

const createOpenedDialogNameAction = (dialogName: string): Action => {
   return {
      type: CHANGE_OPENED_DIALOG,
      payload: dialogName
   }
}

export const openDialog = (dialogName: string) => {
   store.dispatch(createOpenedDialogNameAction(dialogName));
}

export const closeDialog = () => {
   store.dispatch(createOpenedDialogNameAction(''));
}

export default createOpenedDialogNameAction;
