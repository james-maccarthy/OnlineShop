import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRirect, signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
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

//---------------Google sign-in-----------------------------
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account'

  });                           

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
//------------------------------------------------------------

// create connection to firestore database
export const db = getFirestore();
console.log(db);

//function to create a document in the database (db)
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid )
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
               
            });
        }catch(error){
            console.log("error creating the document in the database");
        }
    }
    return userDocRef;
};