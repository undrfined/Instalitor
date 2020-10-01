import Header from "../fragments/main/Header";
import React from "react";
import "../scss/Main.scss";

function SettingsPage() {
    return (
        <div className="main">
            <Header/>
            <main>
                Settings
            </main>
        </div>
    );
}

export default SettingsPage