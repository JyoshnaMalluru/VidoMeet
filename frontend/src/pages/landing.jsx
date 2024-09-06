import React from "react";
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage(){
    const router = useNavigate();
    return(
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>Vido Meet</h2>
                </div>
                <div className="navlist">
                    {/* <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">Login</div> */}
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#eba534"}}>Connect</span> with your Loved Ones</h1>
                    <p>Cover your distance by Vido Meet</p>
                    <div role="button">
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}