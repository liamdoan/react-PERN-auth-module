import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import EmailVerificationCode from './components/EmailVerificationCode'

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
