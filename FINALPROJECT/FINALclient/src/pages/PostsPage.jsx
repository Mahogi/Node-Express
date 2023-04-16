import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost";

const PostsPage = () => {
  const params = useParams()

  const [posts, setPosts] = useState([])


  useEffect(() => {

    fetch("http://localhost:3800/getPostsByEmail/"+params.email)
      .then(res => res.json())
      .then( data => {
        console.log(data)
        setPosts(data.post)
      })

  }, [])

  return (
    <div>
      <p className="font-size">Posts created by {params.email}</p>
      <div className="d-flex flex-wrap">
        {posts.map((x, i) => <SinglePost post={x} key={i}/>)}
      </div>
    </div>
  );
};

export default PostsPage;