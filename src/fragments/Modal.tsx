import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../reducers";

export default function Modal() {
    const modal = useSelector((state: RootState) => state.posts)
    console.log(modal)
    return <div></div>
}

