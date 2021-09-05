import { useRouter } from "next/router"
import firebase from '../firebase/firebase'

export const redirectLoggedUser = (user: firebase.User) => {
   const router = useRouter()
   if (user) {
      if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
         router.replace('/admin')
         return true
      }
      if (user.emailVerified) {
         router.replace('/account')
         return true
      }
   }
   return false
}

export const redirectUnauthorizedUser = (user: firebase.User) => {
   const router = useRouter()
   if (!user || !user?.emailVerified) {
      router.replace('/sign-in')
      return true
   }
   if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.replace('/admin')
      return true
   }
   return false
}

export const redirectUnauthorizedAdmin = (user: firebase.User) => {
   const router = useRouter()
   if (!user) {
      router.replace('/sign-in')
      return true
   }
   if (user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.replace('/account')
      return true
   }
   return false
}