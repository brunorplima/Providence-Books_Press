import React, { Component } from 'react';
import SignIn from '../../app/components/modules/sign-in/SignIn';
import createLoadingAction from '../../app/redux/actions/loadingAction';
import { store } from '../../app/redux/store/store';

interface State {
   isSignIn: boolean;
   username: string;
   password: string;
   passwordConfirm: string;
}

export class index extends Component<any, State> {

   constructor(props) {
      super(props);

      this.state = {
         isSignIn: true,
         username: '',
         password: '',
         passwordConfirm: ''
      }

      this.setUsername = this.setUsername.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setPasswordConfirm = this.setPasswordConfirm.bind(this);
      this.signIn = this.signIn.bind(this);
      this.signUp = this.signUp.bind(this);
   }


   setUsername(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ username: e.target.value });
   }

   setPassword(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ password: e.target.value });
   }

   setPasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ passwordConfirm: e.target.value });
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
      const {
         isSignIn,
         username,
         password,
         passwordConfirm
      } = this.state;
      return (
         <SignIn
            isSignIn={isSignIn}
            username={username}
            setUsername={this.setUsername}
            password={password}
            setPassword={this.setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={this.setPasswordConfirm}
            signIn={this.signIn}
            signUp={this.signUp}
         />
      )
   }
}

export default index
