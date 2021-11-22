// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB_dkPlqceLOgOvOnwo1bLYAM4AshSXkxI",
    authDomain: "fireblog-4b946.firebaseapp.com",
    projectId: "fireblog-4b946",
    storageBucket: "fireblog-4b946.appspot.com",
    messagingSenderId: "962252345173",
    appId: "1:962252345173:web:ebf74135aa01139955e9dc",
    measurementId: "G-W4RR03GF48"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

 const db = app.firestore();
 const auth = firebase.auth();

 export {db, auth}
