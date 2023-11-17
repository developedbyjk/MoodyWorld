import React ,{createContext} from "react";

import emoji1 from './assets/emojis/1.png';
import emoji2 from './assets/emojis/2.png';
import emoji3 from './assets/emojis/3.png';
import emoji4 from './assets/emojis/4.png';
import emoji5 from './assets/emojis/5.png';
import {auth} from './firebase'


const MyContext = createContext();
export default function Header(){


    const [user,Setuser]=React.useState({})
    const [mood,SetMood]=React.useState(0)
    console.log("the selected mood is " + mood);

    React.useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            console.log(user)
            if(user){
                Setuser(user)
            }else {
              console.log("no user found");
            }
          })
    },[])



    return(
        <>
        <MyContext.Provider value={mood}>
            <div className="user-section">
                        <img src = {user.photoURL} 
                        
                        id="user-profile-picture"/>
                        <h2 id="user-greeting"></h2>
                    </div>
                    
                    <div className="mood-emojis">
                        <button id="mood-1" className="mood-emoji-btn"  value="1" 
                        onClick={(e)=>{
                                SetMood(e.target.value)
                            }}>
                            <img src={emoji1}  />
                            Awful
                        </button>

                        <button id="mood-2" className="mood-emoji-btn" value="2" 
                        onClick={(e)=>{
                                SetMood(e.target.value)
                            }}>
                            <img src={emoji2}/>
                            Bad
                        </button>

                        <button id="mood-3" className="mood-emoji-btn" value="3" 
                        onClick={(e)=>{
                                SetMood(e.target.value)
                            }}>
                            <img src={emoji3}/>
                            Meh
                        </button>

                        <button id="mood-4" className="mood-emoji-btn" value="4" 
                        onClick={(e)=>{
                                SetMood(e.target.value)
                            }}>
                            <img src={emoji4}/>
                            Good
                        </button>

                        <button id="mood-5" className="mood-emoji-btn" value="5" 
                        onClick={(e)=>{
                                SetMood(e.target.value)
                            }}>
                            <img src={emoji5}/>
                            Amazing
                        </button>
                        
                    </div>
                    </MyContext.Provider>
           
        </>
    )
}