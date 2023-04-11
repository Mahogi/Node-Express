import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SingleGifPage from "./pages/SingleGifPage";
import IndexPage from "./pages/IndexPage.jsx";
import Toolbar from "./components/Toolbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {useState} from "react";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import PostByIdPage from "./pages/PostByIdPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

function App() {

    const [secret, setSecret] = useState(null)
    const [image, setImage] = useState("")

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
        }

        fetch("http://localhost:3600/updatePhoto", options)
            .then(res => res.json())
            .then( data => {
                if(!data.error) {
                    setImage(url)
                }
            })
    }

  return (
    <div className="App">


      <BrowserRouter>
          <Toolbar image={image} updatePhoto={updatePhoto}/>
          <div className="mt-5">
              <Routes>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/login" element={<LoginPage setSecret={setSecret} setImage={setImage}/>}/>

                  <Route path="/" element={<IndexPage secret={secret}/>}/>
                  <Route path="/posts/:email" element={<SinglePostPage/>}/>
                  <Route path="/post/:id" element={<PostByIdPage/>}/>

                  <Route path="/chat" element={<ChatPage secret={secret}/>}/>
                  {/*<Route path="/gif/:id" element={<SingleGifPage secret={secret}/>}/>*/}
              </Routes>
          </div>

      </BrowserRouter>

    </div>
  );
}

export default App;
