import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



if (!firebase.apps.length) {
   firebase.initializeApp({
      apiKey: 'AIzaSyBjMVXghLWWIGxxaQe30U9ZoNxTJwaQxwM',//process.env.FIREBASE_API_KEY,
     authDomain: 'providencebookspress.firebaseapp.com',//process.env.FIREBASE_AUTH_DOMAIN,
     projectId: 'providencebookspress',//process.env.FIREBASE_PROJECT_ID,
     storageBucket: 'providencebookspress.appspot.com',//process.env.FIREBASE_STORAGE_BUCKET,
     messagingSenderId: '4804954635',//process.env.FIREBASE_MESSAGING_SENDER_ID,
     appId: '1:4804954635:web:fbc6d6bccc4a44af20d50e',//process.env.FIREBASE_APP_ID,
     measurementId: 'G-Z09M598Q6M'//process.env.FIREBASE_MEASUREMENT_ID
   });
}
else {
   firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firestore.enablePersistence().catch(err => console.log(err));
export const storage = firebase.storage();

export default firebase;