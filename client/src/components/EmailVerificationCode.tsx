import React, { useRef, useState } from 'react'
import "./EmailVerificationCode.css"
import { useNavigate } from 'react-router-dom';
import SubmitButton from './form-components/SubmitButton';

const EmailVerificationCode = () => {
    const [failMessage, setFailMessage] = useState(false);
    const [code, setCode] = useState(["", "", "", "", "", ""]); 
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [userTypedCode, setUserTypedCode] = useState<string>("");
    const navigate = useNavigate();

    const handleInputChange = (value: string, index: number) => {
        if (isNaN(Number(value)) || value.length > 1) return;
    
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    
        const isAllInputsFilled = newCode.every((digit) => digit !== "");

        if (failMessage && value!== '') {
            setFailMessage(false);
        };

        if (isAllInputsFilled) {
            setIsButtonDisabled(false);
            setUserTypedCode(newCode.join(""));
        } else if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && code[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmitCode = (e: any) => {
        e.preventDefault();

        console.log("SUBMIT");
        console.log("submitted code is:", userTypedCode)
        setCode(["", "", "", "", "", ""]);
        setIsButtonDisabled(true);
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="title">Enter verification code sent to your email</h1>
                <form className="form-container" onSubmit={handleSubmitCode}>
                    <div className="input-container">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="input-field"
                            />
                        ))}
                    </div>
                    <SubmitButton title="Send code" disabled={isButtonDisabled}/>
                </form>
                {failMessage && (
                    <p className="fail-message">Incorrect code. Please provide the correct code or contact us.</p>
                )}
            </div>
            <p className="footer">
                Should any issue arise, please contact us!
            </p>
        </div>
    );
};

export default EmailVerificationCode

// Planned flow of the code auth (twisted from cab-booking app):
// validate if input is number, and each input can only has 1 value.
// validate if all inputs are filled with number.
// If all inputs are filled, join values as a string, enable button.
// If code is correct, authorization is ok.
// After clicking button, reset all values, exit focus, disable button.
// if current input has value, and it's not the last input, switch focus to next one.
// If user hits backspace, focus will switch to previous input andits digit will be removed.
