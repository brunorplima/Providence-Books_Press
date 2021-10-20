import React from 'react';
import styles from '../../../styles/about-us/AboutUsFooter.module.css';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { IoIosWarning } from 'react-icons/io';
import { Error } from '../../../../pages/about-us/index';

interface Props {
   readonly name: string;
   readonly handleNameChange: (e: React.ChangeEvent) => void;
   readonly email: string;
   readonly handleEmailChange: (e: React.ChangeEvent) => void;
   readonly message: string;
   readonly handleMessageChange: (e: React.ChangeEvent) => void;
   readonly handleSendMessage: (e: React.SyntheticEvent) => void;
   readonly showConfirmation: boolean;
   readonly setShowConfirmation: () => void;
   readonly error: Error;
}

const AboutUsFooter: React.FC<Props> = ({
   name,
   handleNameChange,
   email,
   handleEmailChange,
   message,
   handleMessageChange,
   handleSendMessage,
   showConfirmation,
   setShowConfirmation,
   error,
}) => {
   return (
      <div className={styles.container}>
         <div className={styles.textContainer}>
            <h2>Contact Us</h2>
            <p>providencebooksales@outlook.com</p>
            <p>780-294-9239</p>
            <p>BOX 3 SITE 15 RR2 BARRHEAD, ALBERTA, T7N 1N3</p>
            <div className={styles.logoContainer}>
               <Image
                  src='/full-logo-min.png'
                  width={247}
                  height={122}
               />
            </div>
         </div>

         <div className={styles.formContainer}>
            {/* <h3>Message Us</h3> */}

            <form className={styles.form}>

               {
                  showConfirmation &&
                  <div className={styles.confirmation}>
                     <div className={styles.closeIcon} onClick={setShowConfirmation}><IoClose /></div>
                     <div>Thank you for you message.</div>
                     <div>We will respond as soon as we can.</div>
                  </div>
               }

               {
                  error.emptyField &&
                  <div className={styles.errorMessage}><div><IoIosWarning /></div> All fields are required</div>
               }

               {
                  error.invalidEmail &&
                  <div className={styles.errorMessage}><div><IoIosWarning /></div> Email is not valid</div>
               }

               {
                  error.server &&
                  <div className={styles.errorMessage}><div><IoIosWarning /></div> Sorry, an error occurred. Try again later.</div>
               }

               <input
                  className={styles.input}
                  type='text'
                  placeholder='Your name...'
                  value={name}
                  onChange={e => handleNameChange(e)}
               />
               <input
                  className={styles.input}
                  type='email'
                  placeholder='Your email...'
                  value={email}
                  onChange={e => handleEmailChange(e)}
               />
               <textarea
                  className={styles.textarea}
                  placeholder='Your message...'
                  value={message}
                  onChange={e => handleMessageChange(e)}
               />
               <button
                  className={styles.submit}
                  onClick={handleSendMessage}
               >
                  SEND
               </button>
            </form>
         </div>
      </div>
   )
}

export default AboutUsFooter
