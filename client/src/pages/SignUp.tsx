import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'
import Input from '../components/auth-form-components/Input';
import SubmitButton from '../components/auth-form-components/SubmitButton';
import PasswordStrengthIndicator from '../components/auth-form-components/PasswordStrengthIndicator';
import LoadingBar from '../components/loading/LoadingBar';
import { userSignUp } from '../utils/authApiCalls';

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const navigate = useNavigate();

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            return;
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await userSignUp(name, email, password);

            setLoading(false);
            setMessageSuccess(response.data.message);
            setTimeout(() => setMessageSuccess(""), 3000);
            resetForm();

            navigate("/email-verification");
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
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
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
