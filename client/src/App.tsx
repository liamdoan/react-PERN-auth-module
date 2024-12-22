import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import EmailVerificationCode from './pages/EmailVerificationCode'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/email-verification" element={<EmailVerificationCode />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </div>
    )
}

export default App
