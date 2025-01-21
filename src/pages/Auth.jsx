import React, { useEffect, useState } from 'react'
import '../styles/auth.css'
import { checkSession, createSession } from '../services/sessionManager'
import axios from 'axios'
import { readJWT } from '../services/jwtUtils'

function Auth() {
  console.log("re")
  const [authPage, setAuthPage] = useState("")
  const [isPassSame, setIsPassSame] = useState(false)
  const [formData, setFormData] = useState({
    // password: "",
    // confirmPassword: "",
  })
  console.log("final not", `${process.env.REACT_APP_CLIENT_URL}/client`)
  // session check
  useEffect(() => {
    
    (async () => {
      
      try {
        const sessionData = readJWT(localStorage.getItem("session_token"))
        console.log("session Data", sessionData)
        const localSessionToken = localStorage.getItem("session_token")
        console.log("token", localSessionToken)
        const isLoggedIn = await checkSession(sessionData.username, localSessionToken)
        console.log("loggedin", isLoggedIn)

        if (isLoggedIn) {
    
          // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/client`
          console.log("inside use effectx")
  
          // window.location.href = finalUrl;
        } else {
          
        }
      } catch (error) {
        console.log("session read error", error.message)
      }
      
      
    })()
  }, [])

  const setInputFormdata = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)

    // if (formData.password === formData.confirmPassword && formData.password !== "" && formData.confirmPassword !== "") {
    //   setIsPassSame(false)
    // } else {
    //   setIsPassSame(true)
    // }

  }

  const authSubmit = async (e) => {
    e.preventDefault()
    console.log("e", e.target.formSubmit, e.target.formSubmit.value)
    try {
      if (e.target.formSubmit.value == "Sign Up") {
        console.log("signup clicked")
        const endpoint = `${process.env.REACT_APP_SERVER_URL}/auth/signup`
        const response = await axios.post(endpoint, {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
  
        console.log("response", response.data)
  
        if (response) {
          const data = response.data;
          console.log("response got")
          createSession("session_token", data.session_token)
  
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/client`
        }
      } else {
        console.log("signin clicked")
        const endpoint = `${process.env.REACT_APP_SERVER_URL}/auth/signin`
        const response = await axios.post(endpoint, {
          username: formData.username,
          password: formData.password
        })
  
        console.log("response", response.data)
  
        if (response) {
          const data = response.data;
          console.log("response got")
          createSession("session_token", data.session_token)
  
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/client`
        }
      }
    } catch (error) {
      console.log("signup/signin error", error.message)
    }
    
  }
  

  
  console.log(formData, "yz")
  return (
    <>
      <div className="auth-con">
        
        <div className="form-con">
          <div className="auth-title">{ authPage == "signin" ? "Sign In" : "Sign Up"}</div>
          <form action="" className="auth-form" onSubmit={(e) => authSubmit(e)}>
            <input type="text" placeholder='username' name='username' onChange={(e) => setInputFormdata(e)} required /><br />
            
            {authPage == "signin" ? "" : <><input type='email' placeholder='email' name='email' onChange={(e) => setInputFormdata(e)} required/><br /></>}
            
            <input type="password" placeholder='password' name='password' onChange={(e) => setInputFormdata(e)} required/><br />
            
            {authPage == "signin" ? "" : <><input type="password" placeholder='confirm password' name='confirmPassword' onChange={(e) => setInputFormdata(e)} required/><br /></>}
            {authPage === "signin" ? "" : formData.password === formData.confirmPassword ? formData.password === "" ? <><label className='auth-warning' htmlFor="">passwords should match or not empty</label><br /></> : "" : <><label className='auth-warning' htmlFor="">passwords should match or not empty</label><br /></>}
            {/* {formData.password === formData.confirmPassword ? formData.password === "" ? <><label className='auth-warning' htmlFor="">passwords should match or not empty</label><br /></> : "" : <><label className='auth-warning' htmlFor="">passwords should match or not empty</label><br /></> } */}
            
            
            <input type="submit" value={authPage == 'signin' ? 'Sign In': 'Sign Up'} className='signup-btn' name='formSubmit'  />
          </form>

          <div className="auth-label" onClick={(e) => {
            if (authPage == "signin") {
              setAuthPage('signup')
            } else {
              setAuthPage('signin')
            }
          }}>
            {authPage == 'signin' ? 'New member? Sign Up' : 'already member? Sign in'}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
