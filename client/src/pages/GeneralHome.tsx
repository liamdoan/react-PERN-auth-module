import styles from "./GeneralHome.module.css";
import { Link } from 'react-router-dom';

const GeneralHome = () => {
    return (
        <div>
            <div className={styles.navbar}>
                <h2>MERN AUTH</h2>
                <Link className={styles.loginButton} to={"/login"}>
                    Log in
                </Link>
            </div>
            <div className={styles.mainSection}>
                <h1>WELCOME TO MERN FULL AUTH MODEL</h1>
                <Link className={styles.createAccountButton} to={"/sign-up"}>
                    Create account
                </Link>
            </div>
        </div>
    )
}

export default GeneralHome

// This GeneralHome page is to be replaced depending on each project
// This is a simple home page to direct to Sign Up and Login page.
