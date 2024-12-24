import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user: any = useSelector((state: RootState) => state.user.user);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);
    const navigate = useNavigate();

    if (!user || !isUserAuthenticated) {
        navigate('/login');
        return;
    }
    
    return (
        <div>
            <p>This is user homepage.</p>
            <p>Hello: {user.name}</p>
            <p>Your email is: {user.email}</p>
        </div>
    )
}

export default Home
