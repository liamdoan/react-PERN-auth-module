import "./GeneralHome.css";
import { Link } from 'react-router-dom';

const GeneralHome = () => {
    return (
        <div>
            <div className="navbar">
                <h2>MERN AUTH</h2>
                <div className="login-button">
                    <Link className="navigate-link" to={"/login"}>Log in</Link>
                </div>
            </div>
            <div className="main-section">
                <h1>WELCOME TO MERN FULL AUTH MODEL</h1>
                <div className="create-account-button">
                    <Link className="navigate-link" to={"/sign-up"}>Create account</Link>
                </div>
            </div>
        </div>
    )
}

export default GeneralHome

// This GeneralHome page is to be replaced depending on each project
// This is a simple home page to direct to Sign Up and Login page.
