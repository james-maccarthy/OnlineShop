import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";

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
        <form onSubmit={handleSubmit}>
            <label>Display Name</label>
            <input type='text' required onChange={handleOnChange} name = 'displayName' value = {displayName} />

            <label>Email</label>
            <input type='email' required onChange={handleOnChange} name = 'email' value = {email}/>

            <label>Password</label>
            <input type='password' required onChange={handleOnChange} name = 'password' value = {password}/>

            <label>Confirm Password</label>
            <input type='password' required onChange={handleOnChange} name = 'confirmPassword' value = {confirmPassword}/>
            <button type='submit'></button>
        </form>
    )
}
export default SignUpForm;