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
   readonly router: NextRouter,
   readonly currentUser: User
}

const SigninPageContainer: React.FC = () => {
   const router = useRouter()
   const { providenceUser: currentUser } = useAuth()

   return <SigninPage {...{ router, currentUser }} />
}

export class SigninPage extends Component<Props, State> {

   constructor(props) {
      super(props);

      this.state = {
         isSignIn: true,
         email: '',
         password: '',
         passwordConfirm: '',
         firstName: '',
         lastName: '',
      }

      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setPasswordConfirm = this.setPasswordConfirm.bind(this);
      this.setFirstName = this.setFirstName.bind(this);
      this.setLastName = this.setLastName.bind(this);
      this.signIn = this.signIn.bind(this);
      this.signUp = this.signUp.bind(this);
   }

   componentDidMount() {
      const { router, currentUser } = this.props
      if (currentUser) currentUser.role === 'user' ? router.replace('/account') : router.replace('/admin')
   }

   async componentDidUpdate() {
      const { router, currentUser } = this.props
      if (currentUser) currentUser.role === 'user' ? router.replace('/account') : router.replace('/admin')
   }

   setEmail(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ email: e.target.value });
   }

   setPassword(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ password: e.target.value });
   }

   setPasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ passwordConfirm: e.target.value });
   }

   setFirstName(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ firstName: e.target.value });
   }

   setLastName(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ lastName: e.target.value });
   }

   signIn(e: React.SyntheticEvent) {
      e.preventDefault();
      const { isSignIn } = this.state;
      if (!isSignIn) {
         this.setState({ isSignIn: true })
         return;
      }
   }

   signUp(e: React.SyntheticEvent) {
      e.preventDefault();
      const { isSignIn } = this.state;
      if (isSignIn) {
         this.setState({ isSignIn: false })
         return;
      }
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
            signIn={this.signIn}
            signUp={this.signUp}
         />
      )
   }
}

export default SigninPageContainer
