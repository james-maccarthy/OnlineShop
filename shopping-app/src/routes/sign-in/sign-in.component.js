import { signInWithGooglePopUp } from "../../utils/firebase/firebase";


const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopUp();
        console.log(response);
    }
    return (
        <div>
            This is the sign in page
            hello
            <button>button</button>
            <button onClick={logGoogleUser}> sign in with google </button>
        </div>
    )
}
export default SignIn;