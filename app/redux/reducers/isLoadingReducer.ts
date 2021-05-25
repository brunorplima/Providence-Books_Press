
export type Action = {
   readonly type: 'SET_LOADING';
   readonly payload: boolean;
}

const isLoadingReducer = (isLoading = false, action: Action) => {
   if (action.type === 'SET_LOADING') return action.payload;
   return isLoading;
}

export default isLoadingReducer;