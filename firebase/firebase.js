// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  deleteDoc,
  collectionGroup,
  where,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyDkAf6TexWWlmXaccIiy3BQ5iFBXEBAkxo",
  authDomain: "my-lady-8b48f.firebaseapp.com",
  projectId: "my-lady-8b48f",
  storageBucket: "my-lady-8b48f.appspot.com",
  messagingSenderId: "921457340252",
  appId: "1:921457340252:web:4ed71b5b2844f0ca4e5b99"
};

const app = initializeApp(firebaseConfig);

export const instance = getFirestore(app);


const auth = getAuth();

const JAKE_CREDS = {
  email: 'jacobwilsonhamilton@gmail.com',
  password: 'Milady777'
}



// createUserWithEmailAndPassword(auth, JAKE_CREDS.email, JAKE_CREDS.password)
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   console.log('CREATED USER', user)
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   console.log('CREATED FAIL', errorMessage)
  // });




signInWithEmailAndPassword(auth, JAKE_CREDS.email, JAKE_CREDS.password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
console.log('AUTHED USER', user)
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
console.log('AUTH FAIL', errorMessage)
});




// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.PhoneAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };

// const auth = getAuth();


// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(auth);

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: app.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//       signInFlow: 'popup',
//       signInSuccessUrl: '<url-to-redirect-to-on-success>',

//     }
//   ]
// });


// signInWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//   // Signed in 
//   const user = userCredential.user;
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });


export const firestore = {
  collectionGroup: (path) => collectionGroup(instance, path),
  query,
  where,
  onSnapshot: (pathOrRef, pathSegments, callback) => onSnapshot(pathOrDocRef instanceof DocumentReference ? pathOrDocRef : doc(firestore, pathOrDocRef, ...pathSegments), callback),
  collection: (path, ...pathSegments) => collection(instance, path, ...pathSegments),
  doc: (path, ...pathSegments) => doc(instance, path, ...pathSegments),
  setDoc: (documentReference, data, options) => setDoc(documentReference, data),
  getDoc: (documentReference) => getDoc(documentReference),
  getDocs: (query) => getDocs(query),
  updateDoc: (documentReference, data) => updateDoc(instance,documentReference, data),
  getServerTimestamp: () => serverTimestamp(),
}