import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import Input from '../components/auth-form-components/Input';
import SubmitButton from '../components/auth-form-components/SubmitButton';
import { useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccessful } from '../redux/slices/userSlice';
import LoadingBar from '../components/loading/LoadingBar';
import { userLogin } from '../utils/authApiCalls';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        dispatch(loginStart());

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await userLogin(email, password);

            if (response.data.user) {
                const {name, email, createdAt, lastLogin} = response.data.user;
                dispatch(loginSuccessful({name, email, createdAt, lastLogin}));
            };

            setLoading(false);
            setMessageSuccess(response.data.message);
            setTimeout(() => setMessageSuccess(""), 3000);
            resetForm();

            navigate("/home");
        } catch (error: any) {
            dispatch(loginFailed(error.response.data.message));
            
            setLoading(false);
            setMessageFailed(error.response.data.message);
            setTimeout(() => setMessageFailed(""), 3000);
        }
    };

    return (
        <div className="login-wrapper">
            <div className='login-form'>
                <h1>Log in</h1>
                <form className='login-form-input' action="" onSubmit={handleLogin}>
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
                    <SubmitButton title="Log In"/>
                    { loading && <LoadingBar /> }
                    { messageSuccess && <span className='message-success'>{messageSuccess}</span> }
                    { messageFailed && <span className='message-failed'>{messageFailed}</span> }
                    <div className='notice-forgot-password'>
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
