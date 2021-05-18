import React from 'react';
import styles from '../../../styles/sign-in/SignIn.module.css';
import BackButton from '../../elements/back-button/BackButton';

interface Props {
   readonly isSignIn: boolean;
   readonly username: string;
   readonly setUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly password: string;
   readonly setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly passwordConfirm: string;
   readonly setPasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
   readonly signIn: (e: React.SyntheticEvent) => void;
   readonly signUp: (e: React.SyntheticEvent) => void;
}

const SignIn: React.FC<Props> = ({
   isSignIn,
   username,
   setUsername,
   password,
   setPassword,
   passwordConfirm,
   setPasswordConfirm,
   signIn,
   signUp
}) => {
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
               <div>
                  <label htmlFor='username'>USERNAME:</label>
                  <input
                     id='username'
                     className={styles.input}
                     type='text'
                     value={username}
                     onChange={e => setUsername(e)}
                  />
               </div>

               <div>
                  <label htmlFor='password'>PASSWORD:</label>
                  <input
                     id='password'
                     className={styles.input}
                     type='text'
                     value={password}
                     onChange={e => setPassword(e)}
                  />
               </div>

               {
                  !isSignIn &&
                  <div>
                     <label htmlFor='password-confirm'>CONFIRM PASSWORD:</label>
                     <input
                        id='password-confirm'
                        className={styles.input}
                        type='text'
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e)}
                     />
                  </div>
               }

               <div>
                  <input
                     className={styles.signInButton}
                     type='submit'
                     value='SIGN IN'
                     onClick={e => signIn(e)}
                  />

                  <button
                     className={styles.signUpButton}
                     onClick={e => signUp(e)}
                  >
                     SIGN UP
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default SignIn
