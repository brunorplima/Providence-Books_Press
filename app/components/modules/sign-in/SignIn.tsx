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
import Dialog from '../dialog/Dialog';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import { SIGN_IN_EMAIL_NOT_VERIFIED, SIGN_UP_VERIFY_EMAIL } from '../dialog/dialogNames';

interface Props {
   readonly isSignIn: boolean;
   readonly email: string;
   readonly setEmail: (email: string) => void;
   readonly password: string;
   readonly setPassword: (password: string) => void;
   readonly passwordConfirm: string;
   readonly setPasswordConfirm: (passwordConfirm: string) => void;
   readonly firstName: string;
   readonly setFirstName: (firstName: string) => void;
   readonly lastName: string;
   readonly setLastName: (lastName: string) => void;
   readonly resetFormValues: () => void
   readonly signIn: () => void;
   readonly signUp: () => void;
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
   resetFormValues,
   signIn,
   signUp
}) => {
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState(false)
   const [isForgotPassword, setIsForgotPassword] = useState(false)
   const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState(false)
   const { signup, signin, firebaseUser, resetPassword, signout } = useAuth()
   const router = useRouter()

   if (redirectLoggedUser(firebaseUser)) return null

   async function validateSignup() {
      if (password !== passwordConfirm) {
         setError('Passwords provided don\'t match.')
         return
      }
      if (!firstName || !lastName || !email || !password || !passwordConfirm) {
         setError('All fields are required.')
         return
      }
      if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
         setError('Email format is invalid')
         return
      }
      setError('')
      try {
         setIsLoading(true)
         const user = await signup(email, password, { url: 'https://providencebp.vercel.app/sign-in' })
         const providenceUser = buildUser(user, firstName, lastName)
         await createUser(providenceUser)
         resetFormValues()
         openDialog(SIGN_UP_VERIFY_EMAIL)
         setIsLoading(false)
         await signout()
      } catch (err) {
         setError(formatError(err))
         setIsLoading(false)
      }
   }

   async function validateSignin() {
      setError('')
      try {
         setIsLoading(true)
         const { user } = await signin(email, password)
         if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
            router.push('/admin')
         } else {
            if (!user.emailVerified) {
               signout()
               openDialog(SIGN_IN_EMAIL_NOT_VERIFIED)
               setIsLoading(false)
               return
            }
            router.push('/account')
         }
      } catch (error) {
         setError(formatError(error))
         setIsLoading(false)
         setIsResetPasswordEmailSent(false)
      }
   }

   async function validateResetPasswordEmail() {
      setError('')
      try {
         setIsLoading(true)
         await resetPassword(email)
         setIsResetPasswordEmailSent(true)
         setIsLoading(false)
      } catch (error) {
         console.log(error)
         setError(formatError(error))
         setIsLoading(false)
      }
   }

   function formatError(error: any) {
      if (!error) return 'The email address is already in use by another account.'
      switch (error?.code) {
         case 'auth/wrong-password': return error.message.substring(0, 23) + '.'
         case 'auth/user-not-found': return error.message.substring(0, 57)
         case 'auth/network-request-failed':
            const msg = error.message
            return msg.substring(0, 16) + msg.substring(77) + ' Check your internet connection.'
         default: return 'Something went wrong. Please try again later. '
      }
   }

   function changeFormPurpose(bool: boolean) {
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      setIsResetPasswordEmailSent(false)
      setIsForgotPassword(bool)
      setError('')
   }

   return (
      <div className={styles.container}>
         <Dialog
            name={SIGN_UP_VERIFY_EMAIL}
            buttonsOptions={[
               {
                  label: 'CLOSE',
                  clickHandler: () => closeDialog(),
               }
            ]}
            message={`Thank you! We sent you an email confirmation link. Please confirm your email to log into your account.`}
         />
         <Dialog
            name={SIGN_IN_EMAIL_NOT_VERIFIED}
            buttonsOptions={[
               {
                  label: 'CLOSE',
                  clickHandler: () => closeDialog(),
               }
            ]}
            message='You must verify your email to be able to access your account.'
         />
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
               {
                  !isForgotPassword &&
                  <>
                     <div className={styles.signinSignup}>
                        <div
                           className={isSignIn ? styles.activeButton : styles.inactiveButton}
                           onClick={() => {
                              setError('')
                              resetFormValues()
                              signIn()
                           }}
                        >
                           SIGN IN
                        </div>

                        <div
                           className={isSignIn ? styles.inactiveButton : styles.activeButton}
                           onClick={() => {
                              setError('')
                              resetFormValues()
                              signUp()
                           }}
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
                              onChange={e => setFirstName(e.target.value)}
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
                              onChange={e => setLastName(e.target.value)}
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
                           onChange={e => setEmail(e.target.value)}
                        />
                     </div>

                     <div className={styles.formGroup}>
                        <label htmlFor='password'>PASSWORD:</label>
                        <input
                           id='password'
                           className={styles.input}
                           type='password'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
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
                              onChange={e => setPasswordConfirm(e.target.value)}
                           />
                        </div>
                     }
                     <div className={styles.submitContainer} style={isLoading ? { justifyContent: 'normal' } : {}}>
                        {
                           isLoading ?
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
                  </>
               }

               {
                  isForgotPassword &&
                  <>
                     {
                        isResetPasswordEmailSent &&
                        <>
                           <div className={styles.resetEmailSentMessage}>
                              An email with a link to reset your password was sent to your email address.
                              The link will expire in 15 minutes.
                           </div>
                        </>
                     }

                     {
                        !isResetPasswordEmailSent &&
                        <>
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

                           <div className={styles.formGroup}>
                              <label htmlFor='email'>EMAIL:</label>
                              <input
                                 id='email'
                                 className={styles.input}
                                 type='text'
                                 value={email}
                                 onChange={e => setEmail(e.target.value)}
                              />
                           </div>

                           <div className={styles.submitContainer} style={isLoading ? { justifyContent: 'normal' } : {}}>
                              {
                                 isLoading ?
                                    <Loading localIsLoading size={5} /> :
                                    <button
                                       type='submit'
                                       className={clsx(styles.activeButton, styles.submit)}
                                       onClick={validateResetPasswordEmail}
                                    >
                                       SEND EMAIL
                                    </button>
                              }
                           </div>
                        </>
                     }
                  </>
               }

               <div className={styles.forgotPassword}>
                  {
                     isForgotPassword ?
                        <div onClick={() => changeFormPurpose(false)}>Sign in</div> :
                        <div onClick={() => changeFormPurpose(true)}>Forgot your password?</div>
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
