import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const [getError, setError] = useState(null);

  const emailRef = useRef();
  const passRef = useRef();
  const passTwoRef = useRef();

  const nav = useNavigate();

  const register = () => {
    const user = {
      email: emailRef.current.value,
      passwordOne: passRef.current.value,
      passwordTwo: passRef.current.value
    };

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:3800/register", options)
      .then(res => res.json())
      .then( data => {
        console.log(data);
        if(data.success) {
          alert('Successfully registered! You can now login');
          setError(null);
          nav("/login");
        } else {
          //alert('Registration failed: ' + data.message);
          setError(data.message);
        }
      }).catch(err => alert(err));
  }

  return (
    <>
      {getError && <div className="error"> {getError} </div>}
    <div className="d-flex column width-500 margin-auto">
      <input type="text" ref={emailRef} placeholder="Email" className="line-height-30"/>
      <input type="text" ref={passRef} placeholder="Password" className="line-height-30"/>
      <input type="text" ref={passTwoRef} placeholder="Repeat password" className="line-height-30"/>

      <button onClick={register} className="line-height-30">Register</button>
    </div>
    </>
  );
};

export default RegisterPage;