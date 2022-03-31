
import { signInWithGooglePopUp, createUserDocumentFromAuth,signInWithGoogleRedirect,} from "../../utils/firebase/firebase";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    
    

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef= await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <p>This is the sign in page</p>
            <button onClick={logGoogleUser}> sign in with google </button>
            <SignUpForm/>
        </div>
    )
}
export default SignIn;