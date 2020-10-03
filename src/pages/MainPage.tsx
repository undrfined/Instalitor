import React from "react";
import Header from "../fragments/main/Header";
import {Route, Switch} from "react-router-dom";
import FeedPage from "./FeedPage";
import AddPostPage from "./AddPostPage";
import ProfilePage from "./ProfilePage";

export default function MainPage() {
    return (
        <div className="main">
            <Header/>
            <Switch>
                <Route exact path='/' component={FeedPage}/>
                <Route exact path='/add' component={AddPostPage}/>
                <Route exact path='/profile' component={ProfilePage}/>
            </Switch>
        </div>
    );
}
