import { useState } from "react";
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit = async (event) => {
        console.log('handleSubmit');
        event.preventDefault();

        if(password !== confirmPassword){
            console.log("passwords don't match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword( email, password); 
            console.log(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('cannot create user, email is already in use');
            }else{
            console.log('could not create user', error);
            }
        }
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields,[name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label = 'Display Name' 
                    type='text' 
                    required 
                    onChange={handleOnChange} 
                    name = 'displayName' 
                    value = {displayName} 
                />

                
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


                <FormInput 
                    label = 'Confirm Password'
                    type='password' 
                    required 
                    onChange={handleOnChange} 
                    name = 'confirmPassword' 
                    value = {confirmPassword}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;