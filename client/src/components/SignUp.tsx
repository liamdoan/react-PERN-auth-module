import { useState } from 'react';
import Input from './form-components/Input';
import './SignUp.css'
import SubmitButton from './form-components/SubmitButton';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignup = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="signup-wrapper">
            <div className='signup-form'>
                <h1>Create your account</h1>
                <form className='signup-form-input' action="" onSubmit={handleSignup}>
                    <Input
                        type="text"
                        placeholder='Full name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton title="Sign Up"/>
                    <div className='notice-already-have-account'>
                        <span className='notice-span'>Already have an account? </span>
                        <Link className='login-direct' to={"/login"}>Please login.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp