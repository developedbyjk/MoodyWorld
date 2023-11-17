import React, { useState,useEffect } from 'react'
import Home from './Home'


import './App.css'
import {Routes,Route, useNavigate } from 'react-router-dom'
import {  onAuthStateChanged } from "firebase/auth";
import LoginPage from './LoginPage'

// import Test from './test'
import {auth} from './firebase'

function App() {
  const [user,SetUser] = React.useState(null)


  

  const Navigate = useNavigate()
  
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
  
      if(user){
        Navigate("/home")
      
      }else {
        Navigate("/login")
      }
    })
  },[])

  






  return (
    
    <>
 
        <Routes>
            
              <Route  path='/home'  element={<Home/>}>
       
              </Route>
           
        </Routes>

        {/* <Route  path='/home'  element={<Home/>}>
                    <Route path="world" element={<World />} /> 
                    <Route path="me" element={<Me />} /> 
              </Route> */}
        <Routes>
          <Route path='/login' element={<LoginPage/>}></Route>
        </Routes>
        
        {/* <Routes>
          <Route path='/test' element={<Test/>}></Route>
        </Routes> */}
   
  
    </>
  )
}

export default App
