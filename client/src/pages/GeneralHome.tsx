import "./GeneralHome.css";
import { Link } from 'react-router-dom';

const GeneralHome = () => {
    return (
        <div>
            <div className="navbar">
                <h2>MERN AUTH</h2>
                <Link className="login-button" to={"/login"}>
                    Log in
                </Link>
            </div>
            <div className="main-section">
                <h1>WELCOME TO MERN FULL AUTH MODEL</h1>
                <Link className="create-account-button" to={"/sign-up"}>
                    Create account
                </Link>
            </div>
        </div>
    )
}

export default GeneralHome

// This GeneralHome page is to be replaced depending on each project
// This is a simple home page to direct to Sign Up and Login page.
