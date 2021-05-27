import { SET_LOADING } from '../contants';
import { Action } from '../reducers/isLoadingReducer';

const createLoadingAction = (isLoading: boolean): Action => {
   return {
      type: SET_LOADING,
      payload: isLoading
   }
}

export default createLoadingAction;