import React from "react";
import "../App.css"
export default function LandingPage(){
    return(
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>Vido Meet</h2>
                </div>
                <div className="navlist">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">Login</div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#eba534"}}>Connect</span> with your Loved Ones</h1>
                    <p>Cover your distance by Vido Meet</p>
                    <div role="button">
                        <a href="/auth">Get Started</a>
                    </div>
                </div>
                <div>
                    <img src="/mobile.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}