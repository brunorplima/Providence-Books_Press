import { NextRouter, useRouter } from 'next/router';
import React, { Component } from 'react';
import { useAuth } from '../../app/components/contexts/AuthProvider';
import SignIn from '../../app/components/modules/sign-in/SignIn';
import firebase from '../../app/firebase/firebase'
import { User } from '../../app/interfaces-objects/interfaces';

interface State {
   isSignIn: boolean;
   email: string;
   password: string;
   passwordConfirm: string;
   firstName: string;
   lastName: string;
}

interface Props {
   readonly router: NextRouter
   readonly firebaseUser: firebase.User
   readonly providenceUser: User
}

const SigninPageContainer: React.FC = () => {
   const router = useRouter()
   const { providenceUser, firebaseUser } = useAuth()

   return <SigninPage {...{ router, providenceUser, firebaseUser }} />
}

const initialStateValue = {
   isSignIn: true,
   email: '',
   password: '',
   passwordConfirm: '',
   firstName: '',
   lastName: '',
}

export class SigninPage extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = initialStateValue

      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setPasswordConfirm = this.setPasswordConfirm.bind(this);
      this.setFirstName = this.setFirstName.bind(this);
      this.setLastName = this.setLastName.bind(this);
      this.resetValues = this.resetValues.bind(this);
      this.signIn = this.signIn.bind(this);
      this.signUp = this.signUp.bind(this);
   }

   setEmail(email: string) {
      this.setState({ email });
   }

   setPassword(password: string) {
      this.setState({ password });
   }

   setPasswordConfirm(passwordConfirm: string) {
      this.setState({ passwordConfirm });
   }

   setFirstName(firstName: string) {
      this.setState({ firstName });
   }

   setLastName(lastName) {
      this.setState({ lastName });
   }

   resetValues() {
      this.setState(initialStateValue)
   }

   signIn() {
      const { isSignIn } = this.state;
      if (!isSignIn) this.setState({ isSignIn: true })
   }

   signUp() {
      const { isSignIn } = this.state;
      if (isSignIn) this.setState({ isSignIn: false })
   }


   render() {
      return (
         <SignIn
            {...this.state}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            setPasswordConfirm={this.setPasswordConfirm}
            setFirstName={this.setFirstName}
            setLastName={this.setLastName}
            resetFormValues={this.resetValues}
            signIn={this.signIn}
            signUp={this.signUp}
         />
      )
   }
}

export default SigninPageContainer
