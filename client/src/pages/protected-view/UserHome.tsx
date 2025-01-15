import styles from "./UserHome.module.css";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { useState } from "react";
import LoadingBar from "../../components/loading/LoadingBar";
import Spinner from "../../components/loading/Spinner";
import { deleteUser, updateUserInfo, userLogout } from "../../utils/authApiCalls";
import ConfirmActionsPopup from "../../components/auth-model/ConfirmActionsPopup";
import EditInfoPopup from "../../components/auth-model/EditInfoPopup";

const UserHome = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const [loadingEditInfo, setLoadingEditInfo] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [isPopupEditInfoVisible, setIsPopupEditInfoVisible] = useState<boolean>(false);
    const [isPopupDeleteVisible, setIsPopupDeleteVisible] = useState<boolean>(false);

    const navigate = useNavigate();

    const user: any = useSelector((state: RootState) => state.user.user);
    const isCheckingUserAuthenticated = useSelector((state: RootState) => state.user.isCheckingUserAuthenticated);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);
    const dispatch = useDispatch();

    if (isCheckingUserAuthenticated) {
        return <div className={styles.spinnerWrapper}><Spinner /></div>;
    }

    if (!isUserAuthenticated) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await userLogout();

            setLoading(false);
            setMessageSuccess(response.data.message);
            dispatch(logout());
        } catch (error: any) {
            console.error(error);
            setMessageFailed(error.response.data.message);
            setLoading(false);
        }
    };

    const deleteMessage = user &&
        <p>
            Do you want to permanently delete your account?
            <br />
            <span>This action is irreversible.</span>
        </p>;

    const handleButtonClick = (type: 'edit-info' | 'delete') => {
        if (type === 'edit-info') {
            setIsPopupEditInfoVisible(true);
        } else {
            setIsPopupDeleteVisible(true);
        }
    };

    const handleConfirmEditInfo = async (updatedName: string, updatedEmail: string) => {
            setLoadingEditInfo(true);
    
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await updateUserInfo(user._id, updatedName, updatedEmail);
    
                setLoadingEditInfo(false);
                setIsPopupEditInfoVisible(false);

                window.location.reload();
            } catch (error) {
                console.error(error);
                setLoadingEditInfo(false);
                setIsPopupEditInfoVisible(false);
            }
        };

    const handleConfirmDelete = async () => {
        setLoadingDelete(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await deleteUser(user._id);

            setLoadingDelete(false);
            setIsPopupDeleteVisible(false);

            navigate("/");
        } catch (error) {
            console.error(error);
            setLoadingDelete(false);
            setIsPopupDeleteVisible(false);
        }
    };

    const handleButtonCancel = (type: 'edit-info' | 'delete') => {
        if (type === 'edit-info') {
            setIsPopupEditInfoVisible(false);
        } else {
            setIsPopupDeleteVisible(false);
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                    <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
                    {user.roles.includes("admin") &&
                        <button
                            className={styles.roleButton}
                            onClick={() => navigate("/admin-dashboard")}
                        >
                            Admin Dashboard
                        </button>
                    }
                    {user.roles.includes("manager") &&
                        <button
                            className={styles.roleButton}
                            onClick={() => navigate("/manager-dashboard")}
                        >
                            Manager Dashboard
                        </button>
                    }
                    <button
                        className={styles.editInfoButton}
                        onClick={() => handleButtonClick('edit-info')}
                    >
                        Edit Account Info
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={() => handleButtonClick('delete')}
                    >
                        Delete Account
                    </button>
            </div>
            <div className={styles.mainSection}>
                <h1>This is user homepage</h1>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoText}>
                        <p>Hello: {user.name}</p>
                        <p>Your email is: {user.email}</p>
                        <p>Your role is: {user.roles.join(', ')}</p>
                        <p>You joined on: {new Date (user.createdAt).toLocaleString()}</p>
                        <p>You last logged in on: {user && new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                    { loading && <LoadingBar /> }
                    { messageSuccess && <span className={styles.messageSuccess}>{messageSuccess}</span> }
                    { messageFailed && <span className={styles.messageFailed}>{messageFailed}</span> }
                </div>
            </div>
            {isPopupEditInfoVisible &&
                <EditInfoPopup
                    initialName={user.name}
                    initialEmail={user.email}
                    loadingState={loadingEditInfo}
                    onConfirm={handleConfirmEditInfo}
                    onCancel={() => handleButtonCancel('edit-info')}
                />
            }
            {isPopupDeleteVisible &&
                <ConfirmActionsPopup
                    loadingState={loadingDelete}
                    message={deleteMessage}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => handleButtonCancel('delete')}
                />
            }
        </div>
    )
}

export default UserHome
