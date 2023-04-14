import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";


const LoginPage = ({setSecret, setImage, setEmail}) => {
  const [getError, setError] = useState(null);

  const emailRef = useRef();
  const passRef = useRef();

  const nav = useNavigate();

  const login = () => {

    const user = {
      email: emailRef.current.value,
      password: passRef.current.value
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:3800/login", options)
      .then(res => res.json())
      .then( data => {
        console.log(data)
        if(data.success) {
          setSecret(data.secret);
          console.log(data.secret);
          setImage(data.image);
          setEmail(data.email);
          //localStorage.setItem("username", user.email);
          nav("/");
        } else {
          setError(data.message);
          //alert("Login failed, try again");
        }
      });
  };

  return (
    <>
    {getError && <div className="error"> {getError} </div>}
    <div className="d-flex column">
      <input type="text" ref={emailRef} placeholder="email"/>
      <input type="text" ref={passRef} placeholder="password"/>
      <button onClick={login}>LOGIN</button>
    </div>
    </>
  );
};

export default LoginPage;