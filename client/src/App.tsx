import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import UserHome from './pages/UserHome'
import EmailVerificationCode from './pages/EmailVerificationCode'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { loginSuccessful, logout } from './redux/slices/userSlice'
import General from './pages/General'
import PasswordForgot from './pages/PasswordForgot'
// import ProtectedRoute from './protected-route/ProtectedRoute' // Used if this project expands

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
    const user = useSelector((state: RootState) => state.user.user)
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated)
    const dispatch = useDispatch();

    const checkUserAuthenticated = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await axios.get(`${BASE_URL}/check-auth`, {
                withCredentials: true,
            });

            dispatch(loginSuccessful(response.data.user));
        } catch (error: any) {
            console.error(error.response.data);
            dispatch(logout());
        }
    };

    useEffect(() => {
        checkUserAuthenticated();
    }, [])

    useEffect(() => {
        console.log('User:', user);
        console.log('Is Authenticated:', isUserAuthenticated);
    }, [user]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<General />}/>
                 {/* protected candidate HOME */}
                <Route path="/home" element={<UserHome />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/email-verification" element={<EmailVerificationCode />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="forgot-password" element={<PasswordForgot />} />
            </Routes>
        </div>
    )
}

export default App

// ProtectedRoute component is used to wrap components which
// should only be visible to registed/validated users. Normal visitors
// can't see these components.

// Currently, only Home component needs protecting, so protecting logic
// is implement right in it. But later, when more components need
// protection, ProtectedRoute wrapper will be used to avoiding
// repeated logic.

{/* <Route
    path="/home"
    element={<ProtectedRoute component={<UserHome />} />}
/> */}
