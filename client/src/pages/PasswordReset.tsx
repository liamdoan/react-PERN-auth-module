import "./PasswordReset.css";
import { useState } from "react";
import Input from "../components/form-components/Input";
import SubmitButton from "../components/form-components/SubmitButton";
import LoadingBar from "../components/loading/LoadingBar";
import { Link, useParams } from "react-router-dom";
import IconTick from "../components/form-components/IconTick";
import { resetPassword } from "../utils/apiCalls";

const PasswordReset = () => {
    const {token} = useParams();
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");

    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");
    const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

    const messageConfirmString = "Passwords don't match.";
    const [messageConfirm, setMessageConfirm] = useState<string>("");

    const checkPasswordsMatch = () => {
        if (newPassword !== confirmedNewPassword) {
            setLoading(false);
            setMessageConfirm(messageConfirmString);
            return false;
        } else {
            return true;
        };
    };

    const handleSubmitResetPassword = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (!checkPasswordsMatch()) {
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await resetPassword(token, newPassword);

            setLoading(false);
            setNewPassword("");
            setConfirmedNewPassword("");
            setMessageSuccess(response.data.message);
            setMessageFailed("");
            setSubmitSuccess(true);
        } catch (error: any) {
            setLoading(false);
            setMessageSuccess("");
            setMessageFailed(error.response.data.message);
            setSubmitSuccess(false);
        }
    }

    return (
        <div className="password-reset-wrapper">
            <div className='password-reset-form'>
                <h1>Reset your password</h1>
                <form className='password-reset-form-input' action="" onSubmit={handleSubmitResetPassword}>
                    <Input
                        type="text"
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value),
                            setMessageConfirm("")
                        }}
                    />
                    <Input
                        type="text"
                        placeholder='Confirm New Password'
                        value={confirmedNewPassword}
                        onChange={(e) => {
                            setConfirmedNewPassword(e.target.value),
                            setMessageConfirm("")
                        }}
                    />
                    <SubmitButton title="Confirm new password" disabled={!newPassword || !confirmedNewPassword}/>
                    { loading && <LoadingBar /> }
                    { messageConfirm && <span className='message-failed'>{messageConfirm}</span> }
                    { messageFailed && <span className='message-failed'>{messageFailed}</span> }
                    {submitSuccess &&
                        <div className="footer">
                            <IconTick />
                            { messageSuccess && <span className='message-success'>{messageSuccess}</span> }
                            <button className="back-to-login">
                                <Link className='back-to-login-link' to={"/login"}>&larr; Back to login page.</Link>
                            </button>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default PasswordReset