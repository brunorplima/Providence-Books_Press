import { store } from "../redux/store/store"

export const generateUid = () => (Math.random() * Date.now() * Date.now()).toString(36).substr(0, 10).toUpperCase()

export const generateProductID = (existingIds = store.getState().products.map(product => product._id)) => {
   const getRandom = () => Math.ceil(Math.random() * (999999 - 100000) + 100000)
   let random = getRandom()
   while (existingIds.includes(String(random)) || random < 100000) {
      random = getRandom()
   }
   return random.toString()
}

export const generateID = (entity: 'product' | 'article' = 'article') => {
   const getRandom = () => Math.ceil(Math.random() * (999999 - 100000) + 100000)
   let random = getRandom()
   let existingIds: string[] = []
   if (entity === 'product')
      existingIds = store.getState().products.map(product => product._id)
   else
      existingIds = store.getState().articles.map(article => article._id)
   while (existingIds.includes(String(random)) || random < 100000) {
      random = getRandom()
   }
   return random.toString()
}