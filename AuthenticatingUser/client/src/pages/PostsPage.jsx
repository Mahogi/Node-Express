import React, {useEffect, useState} from 'react';
import CreatePost from "../components/CreatePost.jsx";
import http from "../plugins/http";
import SinglePost from "../components/SinglePost.jsx";


const PostsPage = () => {

  const [getPosts, setPosts] = useState([])

  const addPost = async (post) => {
    const userSecret = localStorage.getItem("userSecret")

    if(userSecret) {
      post.secret = userSecret
      const res = await http.post(post, "create")

      console.log(res)
      if(res.error) {
        console.log("ERROR")
      } else {
        setPosts(res.posts)
      }
    }

  }

  useEffect(() => {
    http.get("allPosts").then(res => {
      console.log(res)
      setPosts(res.posts)
    })

  }, [])


  return (
    <div>
      <CreatePost create={addPost}/>

      <div className="d-flex wrap mt-5">
        {getPosts.map((x, i) => <SinglePost post={x} key={i}/>)}
      </div>
    </div>
  );
};

export default PostsPage;