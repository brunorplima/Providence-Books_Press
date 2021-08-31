import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchDoc } from '../../firebase/fetch'
import firebase, { auth } from '../../firebase/firebase'
import { User } from '../../interfaces-objects/interfaces'

interface AuthContextType {
   readonly firebaseUser: firebase.User
   readonly providenceUser: User
   readonly signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>
   readonly signin: (email: string, password: string) => Promise<firebase.auth.UserCredential>
   readonly signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
   firebaseUser: null,
   providenceUser: null,
   signup: null,
   signin: null,
   signout: null
})

export const useAuth = () => {
   return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
   const [firebaseUser, setFirebaseUser] = useState<firebase.User>(null)
   const [providenceUser, setProvidenceUser] = useState<User>(null)


   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
         if (user) {
            const provUser = await fetchDoc<User>(`users/${user.uid}`)
            setFirebaseUser(user)
            setProvidenceUser(provUser)
            return
         }
         setFirebaseUser(null)
         setProvidenceUser(null)
      })
      return unsubscribe
   }, [])


   function signup(email: string, password: string) {
      return auth.createUserWithEmailAndPassword(email, password)
   }

   function signin(email: string, password: string) {
      return auth.signInWithEmailAndPassword(email, password)
   }

   function signout() {
      return auth.signOut()
   }


   const initialValue: AuthContextType = {
      firebaseUser,
      providenceUser,
      signup,
      signin,
      signout
   }

   return <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
