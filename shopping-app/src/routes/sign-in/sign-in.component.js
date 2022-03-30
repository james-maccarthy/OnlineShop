import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase";


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        console.log(user);
        createUserDocumentFromAuth(user);
    }
    return (
        <div>
            This is the sign in page
            
            <button onClick={logGoogleUser}> sign in with google </button>
        </div>
    )
}
export default SignIn;