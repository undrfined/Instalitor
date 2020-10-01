import React, {useState} from "react";
import "../scss/Main.scss";
import instagram_logo_text from "../instagram_logo_text.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {Post} from "./MainPage";


export class PostPage extends React.Component<{}, {}> {
    render() {
        return (
            <div className="main">
                <header>
                    <FontAwesomeIcon icon={faCamera}/>
                    <img src={instagram_logo_text} className="logo" alt="logo"/>
                </header>
                <main>
                    <Post/>
                    {/*<div className="photos">*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*    <Photo/>*/}
                    {/*</div>*/}
                </main>
            </div>
        );
    }
}