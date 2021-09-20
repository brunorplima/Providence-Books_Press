import { useRouter } from "next/router"
import { useAuth } from "../components/contexts/AuthProvider"
import firebase from '../firebase/firebase'

export const redirectLoggedUser = (user: firebase.User) => {
   const router = useRouter()
   const { isUserAdmin } = useAuth()
   if (user) {
      if (isUserAdmin()) {
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
   const { isUserAdmin } = useAuth()
   if (!user || !user?.emailVerified) {
      router.replace('/sign-in')
      return true
   }
   if (isUserAdmin()) {
      router.replace('/admin')
      return true
   }
   return false
}

export const redirectUnauthorizedAdmin = (user: firebase.User) => {
   const router = useRouter()
   const { isUserAdmin } = useAuth()
   if (!user) {
      router.replace('/sign-in')
      return true
   }
   if (!isUserAdmin()) {
      router.replace('/account')
      return true
   }
   return false
}