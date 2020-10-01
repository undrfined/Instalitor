import React, {useState} from "react";
import "../scss/Main.scss";
import instagram_logo_text from "../instagram_logo_text.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faCamera, faEllipsisV, faHeart as faHeartFilled} from "@fortawesome/free-solid-svg-icons";
import {connect, useDispatch, useSelector} from "react-redux";
import {addMessage} from "../actions";
import {FirebaseInstance} from "../Firebase";
import Header from "../fragments/main/Header";

export function Post() {
    const [liked, setLiked] = useState(false)
    // const todos = useSelector(state => state)
    // console.log(todos)
    // const dispatch = useDispatch()

    function like() {
        setLiked(!liked)
        // dispatch(addMessage("roflan"))
        // console.log("dispatched rofrlan")
    }
    let user = FirebaseInstance.auth.currentUser;
    console.log(user?.uid)

    return <div className={`post ${liked ? "liked" : ""}`}>
        <div className="header">
            <img src="https://miro.medium.com/max/2860/1*1XS8FoiyTOuxz5cdB-zxzQ.jpeg" alt="" className="avatar"/>
            <span className="username">@undrfined</span>
            <div className="more"><FontAwesomeIcon icon={faEllipsisV}/></div>
        </div>
        <img src="https://miro.medium.com/max/2860/1*1XS8FoiyTOuxz5cdB-zxzQ.jpeg" alt="shrek" onDoubleClick={like}/>
        <div className="footer">
            <div className={`like ${liked ? "liked" : ""}`} onClick={like}><FontAwesomeIcon icon={liked ? faHeartFilled : faHeart} /></div>

            <span>109 likes</span>
        </div>
    </div>
}



function MainPage() {
    return (
        <div className="main">
            <Header/>
            <main>
                <div className="feed">
                    <Post/><Post/><Post/><Post/><Post/><Post/><Post/><Post/><Post/><Post/><Post/><Post/>
                </div>
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

const mapStateToProps = () => ({
    // todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = () => ({
    // toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)