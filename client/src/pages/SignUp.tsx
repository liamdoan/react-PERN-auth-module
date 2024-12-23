import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'
import Input from '../components/form-components/Input';
import SubmitButton from '../components/form-components/SubmitButton';
import PasswordStrengthIndicator from '../components/form-components/PasswordStrengthIndicator';
import axios from 'axios';
import LoadingBar from '../components/loading/LoadingBar';

const BASE_URL = "http://localhost:5000/api/auth";

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const handleSignup = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        if (!name || !email || !password) {
            return;
        };

        try {
            const response = await axios.post(`${BASE_URL}/signup`, {
                name, email, password
            });

            setLoading(false);

            setMessageSuccess(response.data.message);
            setTimeout(() => setMessageSuccess(""), 3000);

            setName("");
            setEmail("");
            setPassword("");
        } catch (error: any) {
            setLoading(false);
            setMessageFailed(error.response.data.message);
            setTimeout(() => setMessageFailed(""), 3000);
        }
    };

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
                    <PasswordStrengthIndicator password={password}/>
                    <SubmitButton title="Sign Up" disabled={!name || !email || !password}/>
                    { loading && <LoadingBar /> }
                    { messageSuccess && <span className='message-success'>{messageSuccess}</span> }
                    { messageFailed && <span className='message-failed'>{messageFailed}</span> }
                    <div className='notice-already-have-account'>
                        <span className='notice-span'>
                            Already have an account?
                            <span>&nbsp;</span>
                        </span>
                        <Link className='login-direct' to={"/login"}>Please login.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
