import React, {useState} from 'react';
import './scss/App.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import {FirebaseInstance} from "./Firebase";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
    const [user] = useAuthState(FirebaseInstance.auth);
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <div className="app">
            {!user ? (isRegistering ?
                <RegisterPage onSwitchLogin={() => setIsRegistering(!isRegistering)}/> :
                <LoginPage onSwitchLogin={() => setIsRegistering(!isRegistering)}/>) :
                <MainPage/>}
            {/*<a onClick={_ => FirebaseInstance.auth.signOut()}>sign out</a>*/}
            {/*<LoginPage/>*/}
            {/*<RegisterPage/>*/}
            {/*<MainPage/>*/}
            {/*<PostPage/>*/}
        </div>
    );
}

export default App;
