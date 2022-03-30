import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRirect, signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
//--------------------initialize app----------------------
const firebaseConfig = {
    apiKey: "AIzaSyAeKeAU2EwPpHT-xL3b2jDdGwKfeVeqaN4",
    authDomain: "crown-clothing-db-804c8.firebaseapp.com",
    projectId: "crown-clothing-db-804c8",
    storageBucket: "crown-clothing-db-804c8.appspot.com",
    messagingSenderId: "864123458674",
    appId: "1:864123458674:web:b8fe78b3c8f3a8bec85eeb"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);
//----------------------------------------------------------

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account'

  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = ()=> signInWithPopup(auth, provider);
