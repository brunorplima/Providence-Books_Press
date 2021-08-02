import { store } from "../redux/store/store";


type SyncTargets = 'productsLastSync' | 'articlesLastSync'

export const hasSyncExpired = (syncTarget: SyncTargets, hoursDiff = 8) => {
   const earlier = store.getState()[syncTarget]
   const now = Date.now()
   const milliseconds = hoursDiff * 3600000

   if (!earlier) return true
   return now - earlier >  milliseconds
}