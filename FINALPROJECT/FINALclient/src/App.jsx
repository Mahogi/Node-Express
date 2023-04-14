import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import './App.css';

import IndexPage from "./pages/IndexPage.jsx";
import Toolbar from "./components/Toolbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {

  const [secret, setSecret] = useState(null);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");


  const updatePhoto = (url) => {
    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify({
        secret,
        url
      })
    };

    fetch("http://localhost:3800/updatePhoto", options)
      .then(res => res.json())
      .then( data => {
        if(!data.error) {
          setImage(url);
        } else {
          alert('Error while updating photo');
        }
      });
  };

  // const handleEmailChange = (e) => {
  //   const newEmail = e.target.value;
  //   setEmail(newEmail);
  // }

  return (
    <div className="App">


      <BrowserRouter>
        <Toolbar image={image}/>
        <div className="mt-5">
          <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage setSecret={setSecret} setImage={setImage} setEmail={setEmail}/>}/>

            <Route path="/" element={<IndexPage secret={secret} email={email} />}/>
            <Route path="/profile" element={<ProfilePage secret={secret}
                                                         image={image}
                                                         updatePhoto={updatePhoto}
                                                         email={email}
                                                         setEmail={setEmail}
            />}/>
            {/*<Route path="/posts/:email" element={<SinglePostPage/>}/>*/}
            {/*<Route path="/post/:id" element={<PostByIdPage/>}/>*/}

            {/*<Route path="/chat" element={<ChatPage secret={secret}/>}/>*/}
            {/*<Route path="/gif/:id" element={<SingleGifPage secret={secret}/>}/>*/}
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;