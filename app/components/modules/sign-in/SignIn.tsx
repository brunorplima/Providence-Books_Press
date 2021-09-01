import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { createUser } from '../../../firebase/add';
import { User } from '../../../interfaces-objects/interfaces';
import styles from '../../../styles/sign-in/SignIn.module.css';
import { redirectLoggedUser } from '../../../util/authRouting';
import { useAuth } from '../../contexts/AuthProvider';
import BackButton from '../../elements/back-button/BackButton';
import Loading from '../loading/Loading';
import firebase from '../../../firebase/firebase'

interface Props {
   readonly isSignIn: boolean;
   readonly email: string;
   readonly setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly password: string;
   readonly setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly passwordConfirm: string;
   readonly setPasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly firstName: string;
   readonly setFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly lastName: string;
   readonly setLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly signIn: (e: React.SyntheticEvent) => void;
   readonly signUp: (e: React.SyntheticEvent) => void;
}

const SignIn: React.FC<Props> = ({
   isSignIn,
   email,
   setEmail,
   password,
   setPassword,
   passwordConfirm,
   setPasswordConfirm,
   firstName,
   setFirstName,
   lastName,
   setLastName,
   signIn,
   signUp
}) => {
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState(false)
   const [isRedirecting, setIsRedirecting] = useState(false)
   const { signup, signin, firebaseUser, providenceUser } = useAuth()
   const router = useRouter()

   if (redirectLoggedUser(firebaseUser)) return null

   async function validateSignup() {
      if (password !== passwordConfirm) {
         setError('Passwords provided don\'t match')
         return
      }
      setError('')
      try {
         setIsLoading(true)
         const { user } = await signup(email, password)
         setIsRedirecting(true)
         const providenceUser = buildUser(user, firstName, lastName)
         await createUser(providenceUser)
         router.push('/account')
      } catch {
         setError('Failed to create an account')
         setIsLoading(false)
      }
   }

   async function validateSignin() {
      setError('')
      try {
         setIsLoading(true)
         const { user } = await signin(email, password)
         setIsRedirecting(true)
         if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
            router.push('/admin')
         } else {
            router.push('/account')
         }
      } catch (error) {
         console.log(error)
         setError(formatError(error))
         setIsLoading(false)
      }
   }

   function formatError(error: any) {
      switch (error.code) {
         case 'auth/wrong-password': return error.message.substring(0, 23) + '.'
         case 'auth/user-not-found': return error.message.substring(0, 57)
         case 'auth/network-request-failed':
            const msg = error.message
            return msg.substring(0, 16) + msg.substring(77) + ' Check your internet connection.'
         default: return error.message
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <div className={styles.backButtonLeft}>
               <BackButton />
            </div>

            <div className={styles.providenceLogo}>
               <img src='/full-logo-min.png' alt='Providence Books & Press' />
            </div>
         </div>
         <div className={styles.right}>
            <div className={styles.backButtonRight}>
               <BackButton secondary />
            </div>

            <form className={styles.form}>
               <div className={styles.signinSignup}>
                  <div
                     className={isSignIn ? styles.activeButton : styles.inactiveButton}
                     onClick={e => signIn(e)}
                  >
                     SIGN IN
                  </div>

                  <div
                     className={isSignIn ? styles.inactiveButton : styles.activeButton}
                     onClick={e => signUp(e)}
                  >
                     SIGN UP
                  </div>
               </div>

               {
                  error ?
                     <div className={styles.errors}>
                        <div className={styles.error}>
                           <div><AiFillWarning /></div>
                           {error}
                        </div>
                     </div> :
                     null
               }

               {
                  !isSignIn &&
                  <div className={styles.formGroup}>
                     <label htmlFor='firstName'>FIRST NAME:</label>
                     <input
                        id='firstName'
                        className={styles.input}
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e)}
                     />
                  </div>
               }

               {
                  !isSignIn &&
                  <div className={styles.formGroup}>
                     <label htmlFor='lastName'>LAST NAME:</label>
                     <input
                        id='lastName'
                        className={styles.input}
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e)}
                     />
                  </div>
               }

               <div className={styles.formGroup}>
                  <label htmlFor='email'>EMAIL:</label>
                  <input
                     id='email'
                     className={styles.input}
                     type='text'
                     value={email}
                     onChange={e => setEmail(e)}
                  />
               </div>

               <div className={styles.formGroup}>
                  <label htmlFor='password'>PASSWORD:</label>
                  <input
                     id='password'
                     className={styles.input}
                     type='password'
                     value={password}
                     onChange={e => setPassword(e)}
                  />
               </div>

               {
                  !isSignIn &&
                  <div className={styles.formGroup}>
                     <label htmlFor='password-confirm'>CONFIRM PASSWORD:</label>
                     <input
                        id='password-confirm'
                        className={styles.input}
                        type='password'
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e)}
                     />
                  </div>
               }

               <div className={styles.submitContainer} style={isLoading ? { justifyContent: 'normal' } : {}}>
                  {
                     isLoading || isRedirecting ?
                        <Loading localIsLoading size={5} /> :
                        <button
                           type='submit'
                           className={clsx(styles.activeButton, styles.submit)}
                           onClick={isSignIn ? validateSignin : validateSignup}
                        >
                           {isSignIn ? 'SIGN IN' : 'SIGN UP'}
                        </button>
                  }
               </div>
            </form>
         </div>
      </div>
   )
}

const buildUser = (user: firebase.User, firstName: string, lastName: string): User => {
   const newUser: User = {
      _id: user.uid,
      firstName,
      lastName,
      email: user.email,
      isCustomer: false,
      since: new Date(Date.now()),
      role: 'user'
   }
   if (user.phoneNumber) newUser.primaryContactNumber = user.phoneNumber
   if (user.photoURL) newUser.photoURL = user.photoURL
   return newUser
}

export default SignIn
