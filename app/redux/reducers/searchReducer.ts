export type Action = {
   readonly type: 'SET_SEARCH';
   readonly payload: string;
}

const searchReducer = (search = '', action: Action) => {
   if (action.type === 'SET_SEARCH') {
      return action.payload;
   }
   return search;
}

export default searchReducer;