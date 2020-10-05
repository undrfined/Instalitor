import React, {useEffect, useState} from "react";
import PhotoPicker from "../fragments/PhotoPicker";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../actions/PostActions";
import {RootState} from "../reducers";

export default function AddPostPage() {
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)
    const [caption, setCaption] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.posts)

    const loading = posts.postAddStarted
    const errorMessage = posts.postAddError

    async function post() {
        if (photo) {
            dispatch(postActions.addPost(photo, caption))
        } else {
            dispatch(postActions.addPostError("No photo provided"))
        }
    }

    useEffect(() => {
        if (posts.postAdded) {
            history.push("/")
            dispatch(postActions.resetPostError())
        }
    })

    return <div className="content">
        {errorMessage && <p className="error">{errorMessage}</p>}
        <PhotoPicker onPhotoChanged={setPhoto} big disabled={loading}/>
        <Input hint="Caption (optional)" disabled={loading} onChange={setCaption}/>
        <Button text="Post" disabled={loading} onClick={post}/>
    </div>
}