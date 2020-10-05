import React, {useEffect} from 'react';
import './scss/App.scss';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Switch, Route, Redirect } from 'react-router-dom'
import {useSelf} from "./Hooks";
import {useAuthState} from "react-firebase-hooks/auth";
import {FirebaseInstance} from "./Firebase";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "./actions/UserActions";
import {RootState} from "./reducers";


function App() {
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users)

    const [user] = useSelf()
    const [firebaseUser, firebaseLoading] = useAuthState(FirebaseInstance.auth)

    console.log("USER", user)
    useEffect(() => {
        if(firebaseUser != null && user == null && !users.authorizationStarted) {
            console.log("FETCHING NEW USER WOW")
            dispatch(userActions.fetchUser(firebaseUser.uid))
        }
    })

    return (
        <div className="app">
            {firebaseLoading || (firebaseUser && !user) ? null : <Switch>
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
