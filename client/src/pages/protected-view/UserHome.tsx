import styles from "./UserHome.module.css";
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Navigate } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import Navbar from "../../components/auth-model/Navbar";

const UserHome = () => {
    const user: any = useSelector((state: RootState) => state.user.user);
    const isCheckingUserAuthenticated = useSelector((state: RootState) => state.user.isCheckingUserAuthenticated);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);

    if (isCheckingUserAuthenticated) {
        return <div className={styles.spinnerWrapper}><Spinner /></div>;
    }

    if (!isUserAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.userInfo}>
                <p>Hello: {user.name}</p>
                <p>Your email is: {user.email}</p>
                <p>Your role is: {user.roles.join(', ')}</p>
                <p>You joined on: {new Date (user.createdAt).toLocaleString()}</p>
                <p>You last logged in on: {user && new Date(user.lastLogin).toLocaleString()}</p>
            </div>
            <div className={styles.mainSection}>
                <h1>This is user homepage</h1>
            </div>
        </div>
    )
}

export default UserHome
