import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import Input from '../components/form-components/Input';
import SubmitButton from '../components/form-components/SubmitButton';
import { useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccessful } from '../redux/slices/userSlice';
import axios from 'axios';
import LoadingBar from '../components/loading/LoadingBar';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
            const response = await axios.post(`${BASE_URL}/login`, {
                email, password
            }, {
                withCredentials: true
            })

            if (response.data.user) {
                const {name, email} = response.data.user;
                dispatch(loginSuccessful({name, email}));
            };

            setLoading(false);
            setMessageSuccess(response.data.message);
            setTimeout(() => setMessageSuccess(""), 3000);
            resetForm();

            navigate("/");
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
