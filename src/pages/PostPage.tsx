import React from "react";
import instagram_logo_text from "../instagram_logo_text.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

export class PostPage extends React.Component<{}, {}> {
    render() {
        return (
            <div className="main">
                <header>
                    <FontAwesomeIcon icon={faCamera}/>
                    <img src={instagram_logo_text} className="logo" alt="logo"/>
                </header>
                <main>
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