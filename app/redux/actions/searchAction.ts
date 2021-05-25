const createSearchAction = (value: string) => {
   return {
      type: 'SET_SEARCH',
      payload: value
   }
}

export default createSearchAction;