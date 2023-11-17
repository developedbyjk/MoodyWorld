import React from "react";
import googleLogo from './assets/providers/google.png';
import {signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){


const Navigate = useNavigate()
    
    


    const provider = new GoogleAuthProvider()

    function authSignInWithGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Signed in with Google")
                Navigate("/home")
            }).catch((error) => {
                console.error(error.message)
            })
    }




    return(
        <>

        <section id="logged-out-view">
         
         <div className="container">
             <h1 className="app-title">😁Moody <br/> World😜</h1>
             
             <div className="provider-buttons">
                 <button id="sign-in-with-google-btn" onClick={authSignInWithGoogle} className="provider-btn">
                     <img src={googleLogo} className="google-btn-logo"/>
                     Sign in with Google
                 </button>
             </div>
             
             <div className="auth-fields-and-buttons">

             </div>
             
         </div>
     </section>
     
        </>
    )
}