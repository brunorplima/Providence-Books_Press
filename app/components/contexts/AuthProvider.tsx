import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchDoc } from '../../firebase/fetch'
import firebase, { auth, firestore } from '../../firebase/firebase'
import { User } from '../../interfaces-objects/interfaces'

interface AuthContextType {
   readonly firebaseUser: firebase.User
   readonly providenceUser: User
   readonly signup: (email: string, password: string, actionCodeSettings?: firebase.auth.ActionCodeSettings) => Promise<firebase.User>
   readonly signin: (email: string, password: string) => Promise<firebase.auth.UserCredential>
   readonly signout: () => Promise<void>
   readonly resetPassword: (email: string) => Promise<void>
   readonly updateEmail: (email: string) => Promise<void>
   readonly updatePassword: (password: string) => Promise<void>
   readonly isUserAdmin: () => boolean
   readonly userWishlist: string[]
}

const AuthContext = createContext<AuthContextType>({
   firebaseUser: null,
   providenceUser: null,
   signup: null,
   signin: null,
   signout: null,
   resetPassword: null,
   updateEmail: null,
   updatePassword: null,
   isUserAdmin: null,
   userWishlist: null
})

export const useAuth = () => {
   return useContext(AuthContext)
}

export const adminIds = [
   process.env.NEXT_PUBLIC_ADMIN_UID,
   process.env.NEXT_PUBLIC_ADMIN_UID2
]

const AuthProvider = ({ children }) => {
   const [firebaseUser, setFirebaseUser] = useState<firebase.User>(null)
   const [providenceUser, setProvidenceUser] = useState<User>(null)
   const [userWishlist, setUserWishlist] = useState<string[]>(null)


   useEffect(() => {
      let provUserUnsubscribe
      const unsubscribe = auth.onAuthStateChanged(async user => {
         if (user) {
            provUserUnsubscribe = firestore.collection('users').doc(user.uid).onSnapshot(doc => {
               const provUser = doc.data() as User
               if (provUser.dateOfBirth) provUser.dateOfBirth = new Date(provUser.dateOfBirth)
               setProvidenceUser(provUser)
            })

            setFirebaseUser(user)
            return
         }
         setFirebaseUser(null)
         setProvidenceUser(null)
      })
      return () => {
         unsubscribe()
         provUserUnsubscribe()
      }
   }, [])

   useEffect(() => {
      let unsubscribe = () => {};
      if (providenceUser && !userWishlist) {
         unsubscribe = firestore.doc(`users/${providenceUser._id}/wishlist/products`).onSnapshot(snapshot => {
            try {
               setUserWishlist(snapshot.data().ids as string[])
            }
            catch(error) {
               setUserWishlist([])
            }
         })
      }
      return unsubscribe
   }, [providenceUser])


   async function signup(email: string, password: string, actionCodeSettings?: firebase.auth.ActionCodeSettings) {
      try {
         const { user } = await auth.createUserWithEmailAndPassword(email, password)
         if (actionCodeSettings) await user.sendEmailVerification(actionCodeSettings)
         else await user.sendEmailVerification()
         return user
      } catch (error) {
         console.error(error)
         return null
      }
   }

   function signin(email: string, password: string) {
      return auth.signInWithEmailAndPassword(email, password)
   }

   function signout() {
      return auth.signOut()
   }

   function resetPassword(email: string) {
      return auth.sendPasswordResetEmail(email)
   }

   function updateEmail(email: string) {
      return firebaseUser.updateEmail(email)
   }

   function updatePassword(password: string) {
      return firebaseUser.updatePassword(password)
   }

   function isUserAdmin() {
      if (firebaseUser && adminIds.includes(firebaseUser?.uid)) {
         return true
      }
      return false
   }
   
   const initialValue: AuthContextType = {
      firebaseUser,
      providenceUser,
      signup,
      signin,
      signout,
      resetPassword,
      updateEmail,
      updatePassword,
      isUserAdmin,
      userWishlist
   }

   return <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
