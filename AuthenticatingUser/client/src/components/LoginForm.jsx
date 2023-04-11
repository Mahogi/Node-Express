import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import http from "../plugins/http";

const LoginForm = ({setUser}) => {
  const [getError, setError] = useState('');
  const nav = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const callFetch = async (user) => {
    const res = await http.post(user, "login")

    if(!res.success) {
      setError(res.message)
    } else {
      nav("/posts")
      setUser(res.email)
      console.log(res)

      localStorage.setItem("userSecret", res.secret)

      console.log("LOGIN SUCCESSFULLY")
      console.log(user);
    }
  }

  const loginValid = () => {
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    // const emailValid = emailValidate.valid(user.email)
    // if(!emailValid) return setError("Email is invalid")
    // if(user.password.length < 5 && user.password.length > 20) return setError("Password length max 20 min 5")
    //
    //
    // let hasUpperCase = false
    // let hasNumber = false
    // for (let i = 0; i < user.password.length ; i++) {
    //   if(!Number(user.password[i])) {
    //     if(user.password[i].toUpperCase() === user.password[i]) {
    //       hasUpperCase = true
    //     }
    //   }
    //   if(Number(user.password[i]) || Number(user.password[i]) === 0) {
    //     hasNumber = true
    //   }
    // }

    setError("")
    return callFetch(user)
  }


  return (
    <div className="d-flex column form">
      <input type="text" ref={emailRef} placeholder="email"/>
      <input type="text" ref={passwordRef} placeholder="password"/>

      {getError && <ErrorMessage error={getError}/>}

      <button onClick={loginValid}>Login</button>
    </div>
  );

}

export default LoginForm;