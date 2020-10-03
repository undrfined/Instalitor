import React, {useState} from "react";
import PhotoPicker from "../fragments/PhotoPicker";
import {Input} from "../fragments/Input";
import {Button} from "../fragments/Button";
import {FirebaseInstance} from "../Firebase";
import { useHistory } from "react-router-dom";
import {nanoid} from "nanoid";

export default function AddPostPage() {
    const [photo, setPhoto] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function post() {
        setLoading(true)
        // TODO move logic to action?
        const storageRef = FirebaseInstance.storage.ref(`post/${nanoid()}`)
        const task = storageRef.put(await fetch(photo).then(r => r.blob()))
        task.then(async result => {
            const url = await result.ref.getDownloadURL()
            FirebaseInstance.database.ref().child('posts').push({
                "likedBy": [],
                "image": url,
                "caption": caption,
                "postedBy": FirebaseInstance.auth.currentUser?.uid,
                "comments": [],
                "date": +new Date()
            }).then(() => {
                history.push("/")
            })

        })
    }
    return <div className="content">
        <PhotoPicker onPhotoChanged={setPhoto} big/>
        <Input hint="Caption (optional)" onChange={setCaption}/>
        <Button text="Post" onClick={post}/>
    </div>
}