import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import UserParty from '../pages/UserParty';
import NoPage from '../pages/NoPage';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Game from '../pages/Game';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path="/home" element={<Home />}/>
                    <Route path="/party" element={<UserParty />}/>
                    <Route path="/profile" element={<UserProfile />}/>
                    <Route path="/game" element={<Game />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
