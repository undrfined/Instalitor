import app from "firebase";
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAY1VPtueLACOpkL6Y1KlFQhkm0P63QvaI",
    authDomain: "instagram-80094.firebaseapp.com",
    databaseURL: "https://instagram-80094.firebaseio.com",
    projectId: "instagram-80094",
    storageBucket: "instagram-80094.appspot.com",
    messagingSenderId: "234221364031",
    appId: "1:234221364031:web:85c5e0b7813a9d8be9e98a"
}

class Firebase {
    auth: firebase.auth.Auth;
    database: firebase.database.Database;
    storage: firebase.storage.Storage;

    constructor() {
        app.initializeApp(config)

        this.auth = app.auth();
        this.database = app.database();
        this.storage = app.storage();
    }
}

export const FirebaseInstance = new Firebase();