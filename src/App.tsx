import React, {useState} from 'react';
import './scss/App.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import {FirebaseInstance} from "./Firebase";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Switch, Route, Redirect } from 'react-router-dom'
import Modal from "./fragments/Modal";


function App() {
    const [user, loading] = useAuthState(FirebaseInstance.auth);

    return (
        <div className="app">
            <Modal/>
            {loading ? null : <Switch>
                <Route exact path='/login' render={({location}) =>
                    !user ? <LoginPage/> : <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                }/>
                <Route exact path='/register' render={({location}) =>
                    !user ? <RegisterPage/> : <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                }/>
                <Route path='/' render={({location}) =>
                    !!user ? <MainPage/> : <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                }/>

            </Switch>}
        </div>
    );
}

export default App;
