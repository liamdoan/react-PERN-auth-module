import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import Input from './form-components/Input';
import SubmitButton from './form-components/SubmitButton';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="login-wrapper">
            <div className='login-form'>
                <h1>Log in</h1>
                <form className='login-form-input' action="" onSubmit={handleLogin}>
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
                    <SubmitButton title="Log In"/>
                    <div className='notice-already-have-account'>
                        <span className='notice-span'>
                            Forgot your password?
                            <span>&nbsp;</span>
                        </span>
                        <Link className='forgot-password-direct' to={"/forgot-password"}>Click here.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
