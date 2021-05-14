import React, { Component } from 'react';
import Banner from '../../app/components/elements/banner/Banner';
import styles from '../../app/styles/about-us/AboutUs.module.css';
import Image from 'next/image'
import useScreenWidth from '../../app/util/useScreenWidth';
import AboutUs from '../../app/components/modules/about-us/AboutUs';
import AboutUsFooter from '../../app/components/modules/about-us/AboutUsFooter';

export type Error = {
   emptyField: boolean;
   invalidEmail: boolean;
}

interface Props {
   readonly screenWidth: number;
}

interface State {
   name: string;
   email: string;
   message: string;
   showConfirmation: boolean;
   error: Error;
}

const IndexWrapper: React.FC = () => {

   const screenWidth = useScreenWidth()

   return <Index screenWidth={screenWidth} />
}

class Index extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         name: '',
         email: '',
         message: '',
         showConfirmation: false,
         error: {
            emptyField: false,
            invalidEmail: false
         },
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleMessageChange = this.handleMessageChange.bind(this);
      this.handleSendMessage = this.handleSendMessage.bind(this);
      this.setShowConfirmation = this.setShowConfirmation.bind(this);
   }

   /**
    * It sets the name state according with user input.
    * It also eliminates empty field error when applicable.
    * 
    * @param e Change event
    */
   handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         name: e.target.value
      }, () => this.updateFieldsError());
   }

   /**
    * It sets the email state according with user input.
    * It also eliminates empty field and invalid email errors when applicable.
    * 
    * @param e Change event
    */
   handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
         email: e.target.value
      }, () => {
         this.updateFieldsError();
         this.updateEmailError();
      });
   }

   /**
    * It sets the message state according with user input.
    * It also eliminates empty field error when applicable.
    * 
    * @param e Change event
    */
   handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      this.setState({
         message: e.target.value
      }, () => this.updateFieldsError());
   }

   /* NOT DONE YET - It needs to be refactored using backend service */
   handleSendMessage(e: React.SyntheticEvent) {
      e.preventDefault();
      if (!this.validateForm()) return;

      this.setState({
         name: '',
         email: '',
         message: '',
         error: {
            emptyField: false,
            invalidEmail: false
         }
      })
      this.setShowConfirmation();
   }

   /**
    * It sets the showConfirmation state to its opposite current value.
    * When set to true this state will show a "message sent" confirmation to the user.
    */
   setShowConfirmation() {
      this.setState({ showConfirmation: !this.state.showConfirmation });
   }

   /**
    * It sets the error.emptyField state to the passed in arg value.
    * 
    * @param hasError Whether there is or not an error
    */
   setEmptyFieldError(hasError: boolean) {
      this.setState({
         error: {
            ...this.state.error,
            emptyField: hasError
         }
      });
   }

   /**
    * It sets the error.invalidEmail state to the passed in arg value.
    * 
    * @param hasError Whether there is or not an error
    */
   setInvalidEmailError(hasError: boolean) {
      this.setState({
         error: {
            ...this.state.error,
            invalidEmail: hasError
         }
      });
   }

   /**
    * It checks whether the error.emptyField state is set to true.
    * If so, it checks if the fields are valid (not empty).
    * If so, it sets the error.emptyField to false.
    */
   updateFieldsError() {
      if (this.state.error.emptyField) {
         if (this.areFieldsValid())
            this.setEmptyFieldError(false);
      }
   }

   /**
    * It checks whether the error.invalidEmail state is set to true.
    * If so, it checks if the email is valid.
    * If so, it sets the error.invalidEmail to false.
    */
   updateEmailError() {
      if (this.state.error.invalidEmail) {
         if (this.isEmailValid())
            this.setInvalidEmailError(false);
      }
   }

   /**
    * It checks whether or not all fields are empty and returns true if any is or false if none is.
    * 
    * @returns Boolean value indicating whether or not there is any empty field
    */
   areFieldsValid() {
      const validName = this.state.name.length > 0;
      const validEmail = this.state.email.length > 0;
      const validMessage = this.state.message.length > 0;
      return validName && validEmail && validMessage;
   }

   /**
    * It checks whether or not the email is valid and returns true if it is or false if it isn't.
    * 
    * @returns Boolean value indicating whether or not the email is valid
    */
   isEmailValid() {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(this.state.email);
   }

   /**
    * It sets error.emptyField state according to validation check.
    * 
    * @returns Boolean value indicating whether or not the fields were validated
    */
   validateFields() {
      if (!this.areFieldsValid()) {
         this.setEmptyFieldError(true);
         return false;
      } else {
         if (this.state.error.emptyField)
            this.setEmptyFieldError(false);

         return true;
      }
   }

   /**
    * It sets error.invalidEmail state according to validation check.
    * 
    * @returns Boolean value indicating whether or not the email is validated
    */
   validateEmail() {
      if (!this.isEmailValid()) {
         this.setInvalidEmailError(true);
         return false;
      } else {
         if (this.state.error.invalidEmail)
            this.setInvalidEmailError(false);

         return true;
      }
   }

   /**
    * Makes use of validation functions for empty fields and invalid email.
    * 
    * @returns Boolean value indicating whether or not fields and email are valid
    */
   validateForm() {
      const validFields = this.validateFields();
      const validEmail = this.validateEmail();
      return validEmail && validFields;
   }

   /**
    * It creates and returns the content for the banner.
    * 
    * @returns content for the banner
    */
   getBannerContent() {
      const { screenWidth } = this.props;

      const width = screenWidth >= 768 ? 619 : screenWidth >= 550 ? 464 : screenWidth >= 400 ? 337 : 285;
      const height = screenWidth >= 768 ? 306 : screenWidth >= 550 ? 229 : screenWidth >= 400 ? 167 : 141;

      return (
         <div>
            <Image
               src='/full-logo-opacity-min.png'
               alt='Providence Books & Press'
               width={width}
               height={height}
            />
         </div>
      )
   }

   render() {
      return (
         <div className={styles.container}>
            <div className={styles.bannerContainer}>
               <Banner image='/banner/about-us-banner.jpg' content={this.getBannerContent()} />
            </div>

            <div className={styles.separator}></div>

            <AboutUs />

            <AboutUsFooter
               name={this.state.name}
               handleNameChange={this.handleNameChange}
               email={this.state.email}
               handleEmailChange={this.handleEmailChange}
               message={this.state.message}
               handleMessageChange={this.handleMessageChange}
               handleSendMessage={this.handleSendMessage}
               showConfirmation={this.state.showConfirmation}
               setShowConfirmation={this.setShowConfirmation}
               error={this.state.error}
            />
         </div>
      )
   }
}

export default IndexWrapper;
