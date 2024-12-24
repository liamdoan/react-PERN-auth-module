import { Route, Routes, useNavigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import EmailVerificationCode from './pages/EmailVerificationCode'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { loginSuccessful, logout } from './redux/slices/userSlice'
import General from './pages/General'

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
    const user = useSelector((state: RootState) => state.user.user)
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUserAuthenticated = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/check-auth`, {
                withCredentials: true,
            });

            dispatch(loginSuccessful(response.data.user));
        } catch (error: any) {
            console.error(error.response.data);

            dispatch(logout());
            navigate('/login');
        }
    };

    useEffect(() => {
        checkUserAuthenticated();
    }, [])

    useEffect(() => {
        console.log('User:', user);
        console.log('Is Authenticated:', isUserAuthenticated);
    }, [user, isUserAuthenticated]);

    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/email-verification" element={<EmailVerificationCode />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </div>
    )
}

export default App
