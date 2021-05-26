import { Action } from "../actions/openedDialogNameAction";
import { CHANGE_OPENED_DIALOG } from "../contants";


const openedDialogNameReducer = (dialogName = '', action: Action) => {
   if (action.type === CHANGE_OPENED_DIALOG) {
      return action.payload;
   }
   return dialogName;
}

export default openedDialogNameReducer;