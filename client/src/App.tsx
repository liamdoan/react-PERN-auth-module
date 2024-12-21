import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/signUp'
import Login from './components/login'
import Home from './components/Home'

function App() {
    return (
        <div className='main-wrapper'>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </div>
    )
}

export default App
