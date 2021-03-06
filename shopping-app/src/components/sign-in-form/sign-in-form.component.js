import { useState } from "react";
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    
    email: '',
    password: '',
   
}

const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopUp();
    await createUserDocumentFromAuth(user);
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    console.log(formFields);
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit = async (event) => {
        console.log('handleSubmit');
        event.preventDefault();

        

        try{
           const response = await signInAuthUserWithEmailAndPassword(email,password);
           console.log(response);
        }catch(error){
           console.log(error);
           switch(error.code){
               case 'auth/wrong-password':
                    alert('password does not match email');
                    break;
                
               case 'auth/user-not-found':
                    alert('email not found');
                    break;

                default: console.log('unknown error signing in');   
           }
           
        }
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields,[name]: value });
    };
    return (
        <div className="sign-in-container">
            <h2>already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput 
                    label = 'Email'
                    type='email' 
                    required 
                    onChange={handleOnChange} 
                    name = 'email' 
                    value = {email}
                />
               
                <FormInput
                    label = 'Password'
                    type='password' 
                    required 
                    onChange={handleOnChange} 
                    name = 'password' 
                    value = {password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
                
            </form>
        </div>
    )
}
export default SignInForm;