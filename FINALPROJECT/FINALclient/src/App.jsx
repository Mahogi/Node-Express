import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './App.css';
import {Snackbar} from "@mui/material";

import IndexPage from "./pages/IndexPage.jsx";
import Toolbar from "./components/Toolbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import PostByIdPage from "./pages/PostByIdPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";

function App() {

  const [secret, setSecret] = useState(null);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
  const [openLogoutSnackbar, setOpenLogoutSnackbar] = React.useState(false);
  //const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3800/getAll")
  //     .then(res => res.json())
  //     .then( data => {
  //       setPosts(data.posts);
  //       console.log(posts);
  //     })
  // }, []);

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteSnackbar(false);
    setOpenLogoutSnackbar(false);
  };

  const logout = () => {
    setSecret(null);
    setImage(null);
    setEmail(null);
    setOpenLogoutSnackbar(true);
  }

  return (
    <div className="App">


      <BrowserRouter>
        <Toolbar image={image} logout={logout}/>
        <Snackbar
          open={openDeleteSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Review was deleted successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ></Snackbar>
        <Snackbar
          open={openLogoutSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Logged out successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ></Snackbar>
        <div className="mt-5">
          <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage setSecret={setSecret} setImage={setImage} setEmail={setEmail}/>}/>

            <Route path="/" element={<IndexPage secret={secret} email={email}/>}/>
            {/*<Route path="/" element={<IndexPage secret={secret} email={email} posts={posts}/>}/>*/}
            <Route path="/profile" element={<ProfilePage secret={secret}
                                                         image={image}
                                                         updatePhoto={updatePhoto}
                                                         email={email}
                                                         setEmail={setEmail}
            />}/>
            <Route path="/user/:id" element={<UserPage/>}/>
            <Route path="/posts/:email" element={<PostsPage/>}/>
            <Route path="/post/:id" element={<PostByIdPage
              secret={secret}
              email={email}
              setOpenDeleteSnackbar={setOpenDeleteSnackbar}
            />}/>

            <Route path="/createPost" element={<CreatePostPage secret={secret} />}/>

            {/*<Route path="/chat" element={<ChatPage secret={secret}/>}/>*/}
            {/*<Route path="/gif/:id" element={<SingleGifPage secret={secret}/>}/>*/}
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;