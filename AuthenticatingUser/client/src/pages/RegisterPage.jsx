import React, {useRef} from 'react';
//import RegisterForm from "../components/RegisterForm.jsx";

const RegisterPage = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const passTwoRef = useRef();

  const register = () => {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
      passwordTwo: passTwoRef.current.value
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(user)
    }

    fetch("http://localhost:3500/register", options)
      .then(res => res.json())
      .then( data => {
        console.log(data)
      })
  }

  return (
    <div className="d-flex j-center">
      {/*<RegisterForm />*/}
      <input type="text" ref={emailRef} placeholder="email"/>
      <input type="text" ref={passRef} placeholder="password"/>
      <input type="text" ref={passTwoRef} placeholder="password two"/>
      <button onClick={register}>REGISTER</button>
    </div>
  );
};

export default RegisterPage;