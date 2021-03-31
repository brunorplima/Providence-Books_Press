

const listPageReducer = (state: number = 1, action) => {
   if (action.type === 'CHANGE_LIST_PAGE') return action.payload;
   return state;
}

export default listPageReducer;