import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



if (!firebase.apps.length) {
   firebase.initializeApp({
      apiKey: 'AIzaSyBjMVXghLWWIGxxaQe30U9ZoNxTJwaQxwM',
     authDomain: 'providencebookspress.firebaseapp.com',
     projectId: 'providencebookspress',
     storageBucket: 'providencebookspress.appspot.com',
     messagingSenderId: '4804954635',
     appId: '1:4804954635:web:fbc6d6bccc4a44af20d50e',
     measurementId: 'G-Z09M598Q6M',
   });
}
else {
   firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;