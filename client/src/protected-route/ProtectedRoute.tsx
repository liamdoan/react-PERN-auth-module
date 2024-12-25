import "./ProtectedRoute.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import Spinner from "../components/loading/Spinner";

const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
    const isCheckingUserAuthenticated = useSelector((state: RootState) => state.user.isCheckingUserAuthenticated);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);

    if (isCheckingUserAuthenticated) {
        return <div className="spinner-wrapper"><Spinner /></div>;
    }

    if (!isUserAuthenticated) {
        return <Navigate to="/login" />;
    }

    return component;
};

export default ProtectedRoute;
