import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";

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
    
    const handleSubmit = async (event) => {
        console.log('handleSubmit');
        event.preventDefault();
        
        
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