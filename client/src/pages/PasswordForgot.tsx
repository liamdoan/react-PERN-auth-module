
import "./PasswordForgot.css"
import SubmitButton from '../components/form-components/SubmitButton';
import Input from '../components/form-components/Input';
import LoadingBar from '../components/loading/LoadingBar';
import { useState } from 'react';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PasswordForgot = () => {
    const [email, setEmail] = useState<string>("");
    
    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const handleSubmitEmail = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post(`${BASE_URL}/forgot-password`, {
                email
            }, {
                withCredentials: true
            });

            setLoading(false);
            setEmail("");
            setMessageSuccess(response.data.message);
            setMessageFailed("");
        } catch (error: any) {
            setLoading(false);
            setMessageSuccess("");
            setMessageFailed(error.response.data.message)
        }
    };

    return (
        <div className="password-forgot-wrapper">
            <div className='password-forgot-form'>
                <h1>Forgot Password</h1>
                <p className="password-forgot-notice">After entering your email, a link to reset your password will be sent to your provided email address.</p>
                <form className='password-forgot-form-input' action="" onSubmit={handleSubmitEmail}>
                    <Input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubmitButton title="Send me reset password link" disabled={!email}/>
                    { loading && <LoadingBar /> }
                    { messageSuccess && <span className='message-success'>{messageSuccess}</span> }
                    { messageFailed && <span className='message-failed'>{messageFailed}</span> }
                </form>
            </div>
        </div>
    )
}

export default PasswordForgot
