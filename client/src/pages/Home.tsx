import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/slices/userSlice";
import { useState } from "react";
import LoadingBar from "../components/loading/LoadingBar";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const user: any = useSelector((state: RootState) => state.user.user);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!user || !isUserAuthenticated) {
        navigate('/login');
        return;
    };

    const handleLogout = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post(`${BASE_URL}/logout`, {}, {
                withCredentials: true
            });

            setLoading(false);
            setMessageSuccess(response.data.message);
            dispatch(logout());
        } catch (error: any) {
            console.error(error);
            setMessageFailed(error.response.data.message);
            setLoading(false);
        }
    };
    
    return (
        <div>
            <p>This is user homepage.</p>
            <p>Hello: {user.name}</p>
            <p>Your email is: {user.email}</p>
            <p>You joined on: {new Date (user.createdAt).toLocaleString()}</p>
            <p>You last logged in on: {user && new Date(user.lastLogin).toLocaleString()}</p>
            <button onClick={handleLogout}>Log Out</button>
            { loading && <LoadingBar /> }
            { messageSuccess && <span className='message-success'>{messageSuccess}</span> }
            { messageFailed && <span className='message-failed'>{messageFailed}</span> }
        </div>
    )
}

export default Home
