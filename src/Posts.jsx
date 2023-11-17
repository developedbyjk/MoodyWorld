import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, onSnapshot, where, orderBy, doc,
    updateDoc, deleteDoc } from "firebase/firestore";
import { app,auth } from './firebase'; // Import your firebase configuration here
import {onAuthStateChanged} from  'firebase/auth'


import emoji1 from './assets/emojis/1.png';
import emoji2 from './assets/emojis/2.png';
import emoji3 from './assets/emojis/3.png';
import emoji4 from './assets/emojis/4.png';
import emoji5 from './assets/emojis/5.png';

const moodEmojiMap = {
    1: emoji1,
    2: emoji2,
    3: emoji3,
    4: emoji4,
    5: emoji5
};

export default function Post(props) {
 const {timefrompropjk} = props
    // console.log(props.queryfromprop)
    const db = getFirestore(app)
    const [posts, setPosts] = useState([]);
    

    const[docID,SetdocID] = React.useState("")
    const [postuid, setPostUid] = useState('');
    const [fromtimejk,SetFromtimejk] = React.useState(timefrompropjk)
    // console.log("got from prop time " + fromtimejk)

    const [canEdit, SetCanEdit]=React.useState(false)

    
    useEffect(() => {
        // Update fromtimejk whenever props.timefrompropjk changes
        SetFromtimejk(props.timefrompropjk);
    }, [props.timefrompropjk]);


    useEffect(() => {

        const db = getFirestore(app);
        const postsRef = collection(db, "posts")

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            console.log("user is "+ user);
            if (user) {
                setPostUid(user.uid);
            } else {
                console.log("user not signed in")
            }
        });



        const timeRanges = {
            startOfDay: new Date(),
            startOfWeek: (() => {
                const startOfWeek = new Date();
                startOfWeek.setHours(0, 0, 0, 0);
                if (startOfWeek.getDay() === 0) {
                    startOfWeek.setDate(startOfWeek.getDate() - 6);
                } else {
                    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
                }
                return startOfWeek;
            })(),
            startOfMonth: (() => {
                const startOfMonth = new Date();
                startOfMonth.setHours(0, 0, 0, 0);
                startOfMonth.setDate(1);
                return startOfMonth;
            })(),
            endOfDay: (() => {
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                return endOfDay;
            })()
        };



            // const q = query(postsRef,  where("uid", "==", postuid),
            // where("createdAt", ">=", timeRanges[fromtimejk] || new Date()),
            // where("createdAt", "<=", timeRanges.endOfDay),
            // orderBy("createdAt", "desc"))
        

            //     console.log("query is " + q);
            //     console.log("timeraneg[fromtimejk] value is " + timeRanges[fromtimejk])

            // const unsubscribePosts = onSnapshot(q,(querySnapshot) => {

                // const unsubscribePosts =   onSnapshot(collection(db, "posts"), (querySnapshot) => {



            const q = fromtimejk === "myMoods" ? query(postsRef,  where("uid", "==", postuid), orderBy("createdAt", "desc")) :
            query(postsRef, orderBy("createdAt", "desc"))


            if(fromtimejk === "myMoods"){
                SetCanEdit(true)
            }

            if(fromtimejk === "worldMoods"){
                SetCanEdit(false)
            }

            
                


            const unsubscribePosts = onSnapshot(q,(querySnapshot) => {
            const fetchedPosts = [];
            
            querySnapshot.forEach((doc) => {
                SetdocID(doc.id)
                fetchedPosts.push({ id: doc.id, ...doc.data() });
            });

            setPosts(fetchedPosts);
            
        });

        return () => {
            unsubscribePosts()
            unsubscribeAuth()
        }


        console.log("i just runned!");
    }, [fromtimejk, postuid]); 




    function displayDate(firebaseDate) {
        if (!firebaseDate) {
            return "Date processing"
        }
        
        const date = firebaseDate.toDate()
        
        const day = date.getDate()
        const year = date.getFullYear()
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const month = monthNames[date.getMonth()]
    
        let hours = date.getHours()
        let minutes = date.getMinutes()
        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
    
        // return `${day} ${month} ${year} - ${hours}:${minutes}`
        return `${day} ${month} (${hours}:${minutes})`
    }

    function EditPost(post){
        const newBody = prompt("Edit the post", post.body);

        if (newBody !== null) {
            updatePostInDB(post.id, newBody);
        }
    }

    async function updatePostInDB(docID, newBody) {
        const postRef = doc(db, "posts", docID);
        await updateDoc(postRef, {
            body: newBody
        })
    }

    async function DeletePost(post){
        alert("you are about to delete!")
        await deleteDoc(doc(db, "posts",post.id))
    }

    return (
        <>
            <div className="posts">
                {posts.map((post) => (
                    <>

                    <div className="post" key={post.id}>

                        {/* <div className="foreditbtn"> */}

                            {/* <div> */}

                                    <div className="profile">
                                    <h3 id="posteddate"> {`${displayDate(post.createdAt)}`}</h3>

                                        <img src={post.pic} alt="Profile picture" />
                                    
                                    </div>
                                    
                                    <div className="header">
                                        
                                        <div className="bar">

                                            <div>
                                            <p>{post.username}</p>
                                            </div>

                                            <div>
                                            <p>is feeling</p>
                                            </div>
                                            
                                            <div>
                                            <img src={moodEmojiMap[post.mood]} alt={`Emoji for mood ${post.mood}`} />
                                            </div>

                                    

                                        </div>
                                    
                                        <div>
                                        <p id="postbody">{post.body}
                                        
                                        </p>
                                        </div>
                                    
                                        <div className="footer">
                                        {
                                            canEdit ?  
                                            <>  
                                            <br/>                    
                                            <button className="edit-color" onClick={()=>{EditPost(post)}}>Edit</button>
                                            <button className="delete-color" onClick={()=>{DeletePost(post)}}>Delete</button>
                                            </> 
                                            : null 
                                        }                    
                                    </div>


                                    </div>
                        
                    

                    {/* </div> */}
                        {/* <h3 id="posteddate"> - {`${displayDate(post.createdAt)}`}</h3> */}
                    
                    </div>
                    <br/>
                    </>
                ))}
            </div>
        </>
    );
}
