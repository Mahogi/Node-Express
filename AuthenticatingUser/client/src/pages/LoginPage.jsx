import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = ({setSecret, setImage}) => {
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
    }

    fetch("http://localhost:3500/login", options)
      .then(res => res.json())
      .then( data => {
        if(data.success) {
          setSecret(data.secret);
          setImage(data.image);
          nav("/");
        }
      })
  }

  return (
    <div className="d-flex column">
      <input type="text" ref={emailRef} placeholder="email"/>
      <input type="text" ref={passRef} placeholder="password"/>
      <button onClick={login}>LOGIN</button>
    </div>
  );
}

export default LoginPage;