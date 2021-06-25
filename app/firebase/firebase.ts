import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



if (!firebase.apps.length) {
   firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
     projectId: process.env.FIREBASE_PROJECT_ID,
     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.FIREBASE_APP_ID,
     measurementId: process.env.FIREBASE_MEASUREMENT_ID
   });
   firebase.firestore().enablePersistence().catch(err => console.log(err));
}
else {
   firebase.app();
}

// firebase.firestore.enablePersistence().catch(err => console.log(err));
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;