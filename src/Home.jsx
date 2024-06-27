
import React, { useState, useCallback  } from "react";
import { Outlet,useNavigate } from "react-router-dom"


import Posts from "./Posts";
import signout from './assets/icons/icon-sign-out.svg';
import signin from './assets/icons/loginuser.png';
import {signOut, onAuthStateChanged} from 'firebase/auth';
import {app, auth} from './firebase'



import emoji1 from './assets/emojis/1.png';
import emoji2 from './assets/emojis/2.png';
import emoji3 from './assets/emojis/3.png';
import emoji4 from './assets/emojis/4.png';
import emoji5 from './assets/emojis/5.png';


import {addDoc,
     getFirestore,
     collection,
     serverTimestamp,query, where,orderBy } from 'firebase/firestore'


export default function Home(){

    

    const [user,Setuser]=React.useState({})
    const [mood,SetMood]=React.useState(0)
    // console.log("MOOD SELECTED IS " + mood);

    const [emojiStyle, SetEmojiStyle] = React.useState(null);
    // console.log("emoji style is"+ emojiStyle);

    const [postBody,SetPostBody] = React.useState("");
    const db = getFirestore(app) 
    // console.log(postBody)
    const [uid, setUid] = useState("");

    const[gotquery,SetGotquery] = React.useState();

    const Navigate = useNavigate();

    
    
   

   
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (user) {
            Setuser(user);
            setUid(user.uid); // Set uid in the state
          } else {
            console.log("user not signed in");
          }
        });
      }, []); 

     





async function addPostToDB() {

    


 

   
    if (mood === 0) {
        alert("Select a mood!");
        return;
    }
    if (!uid) {
        alert("Awesomeeeeeeeeeeeeeeeee!😍 lets join the moooooody world! 🚀🤩");
        
        auth.onAuthStateChanged(user=>{
        
          if(!user){
            // console.log("user not signed in and this is workinga but lets see and do some more testing")
            Navigate("/login")
          
          }else {
            Navigate("/")
          }
        })
        return;
    }

    try {

        

        const docRef = await addDoc(collection(db, "posts"), {
            body: postBody,
            uid: uid, 
            createdAt: serverTimestamp(),
            mood: mood,
            pic : user.photoURL,
            username : user.displayName.split(" ")[0]
        });

        clearTextArea()
        clearEmojiStyle()
        
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error(error.message);
    }
}

function clearTextArea(){
    SetPostBody("")
}

function clearEmojiStyle(){
    console.log("the style is being nulled...")
    SetEmojiStyle(null)

}

 

    function authSignOut() {
        signOut(auth)
            .then(() => {
            }).catch((error) => {
                console.error(error.message)
            })
    }

    function authSignIn(){
        auth.onAuthStateChanged(user=>{
            if(!user){
              // console.log("user not signed in and this is workinga but lets see and do some more testing")
              Navigate("/login")
            }else {
              Navigate("/")
            }
          })
    }


 
        // Use useCallback to memoize the function
        const handleInputChange = useCallback((event) => {
            SetPostBody(event.target.value);
        }, []);


//fethcing based on day and time!
const randomEmoji = () => {
    const emojis = [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
    ];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}




    
    return(
        <>
    
     <section id="logged-in-view">
     
            <div className="container">

            <div className="app-container">

                   <div className="desktop-view-1">
                        <nav className="mynav">
                            <button id="sign-out-btn"  onClick={authSignOut} className="icon-btn">
                                <img src={signout} className="icon-img-btn"/>
                            </button>

                            <button id="sign-out-btn"  onClick={authSignIn} className="icon-btn">
                                <img src={signin} className="icon-img-btn"/>
                            </button>
                        </nav>
                        
                 
                        {/* <Header/> */}

                        {/* HEADER PART GOES HERE */}
                        <div className="user-section">

                        {
                            user.photoURL ?
                            <img src={user.photoURL} id="user-profile-picture" />
                            :
                            <div className="profilepic">
                                <h1>{randomEmoji()}</h1>
                            </div>

                        }

                    
                        {/* <img src={user.photoURL ? user.photoURL : randomEmoji() }  id="user-profile-picture" /> */}
                        
                        <h2 id="user-greeting">
                            Hey{" "}
                            {user.displayName != null
                                ? user.displayName.split(" ")[0]
                                : null}{" "}
                            how you feel today?
                        </h2>
                        </div>
                            
                        <div className="mood-emojis">
                                <button id="mood-1" className={`mood-emoji-btn ${emojiStyle === 1 ? 'selected-emoji' : 'unselected-emoji'} ${emojiStyle===null && "unselected-emoji"}  `}   value="1"
                                onClick={(e)=>{
                                        // SetMood(e.target.value)
                                        SetEmojiStyle(1)
                                        SetMood(1)
                        
                                    }}>
                                    <img src={emoji1}  />
                                    Awful
                                </button>

                                <button id="mood-2" className={`mood-emoji-btn ${emojiStyle === 2 ? 'selected-emoji' : 'unselected-emoji'} ${emojiStyle===null && "unselected-emoji"}`} value="2" 
                                onClick={(e)=>{
                                        SetMood(2)
                                        SetEmojiStyle(2)
                                
                                    }}>
                                    <img src={emoji2}/>
                                    Bad
                                </button>

                                <button id="mood-3" className={`mood-emoji-btn ${emojiStyle===null ? "unselected-emoji" : emojiStyle === 3 ? 'selected-emoji' : 'unselected-emoji'} `} value="3" 
                                onClick={(e)=>{
                                    SetMood(3)
                                        SetEmojiStyle(3)
                                    }}>
                                    <img src={emoji3}/>
                                    Meh
                                </button>

                                <button id="mood-4" className={`mood-emoji-btn ${emojiStyle===null ? "unselected-emoji" : emojiStyle === 4 ? 'selected-emoji' : 'unselected-emoji'} `} value="4" 
                                onClick={(e)=>{

                                        // SetMood(e.target.id.split('-')[1])
                                        SetMood(4)
                                        SetEmojiStyle(4)
                                    }}>
                                    <img src={emoji4}/>
                                    Good
                                </button>

                                <button id="mood-5" className={`mood-emoji-btn ${emojiStyle === 5 ? 'selected-emoji' : 'unselected-emoji'} ${emojiStyle===null && "unselected-emoji"}`} value="5" 
                                onClick={(e)=>{
                                        SetMood(5)
                                        SetEmojiStyle(5)
                                    }}>
                                    <img src={emoji5}/>
                                    Amazing
                                </button>
                                
                            </div>
                            
                            <div className="post-section">
                                <textarea id="post-input" 
                                value={postBody} // Set textarea value from the state
                                onChange={handleInputChange} // Handle textarea input change
                                placeholder="Write down how you're feeling...">

                                </textarea>
                                <button id="post-btn" onClick={addPostToDB} className="primary-btn">Post</button>

                            </div>
                            
                            <div className="filters-and-posts-section">
                                <div className="filters-section">
                                
                                    <button id="week-filter-btn"  onClick={() => SetGotquery("worldMoods")} class="primary-btn">World Moods</button>
                                    <button id="month-filter-btn"  onClick={() => SetGotquery("myMoods")}class="primary-btn">My Moods</button>
                                    {/* <button id="all-filter-btn"  onClick={() => SetGotquery("")} className="filter-btn">All</button> */}
                                </div>
                            </div>


                    </div>

                    <div className="desktop-view-2">
                            <div id="posts" className="posts-section">
                                    {<Posts timefrompropjk={gotquery} />}
                        </div>
                    
                        <Outlet/>

                    </div>


                    
                </div>
            </div>
        </section> 
        </>
    )
}