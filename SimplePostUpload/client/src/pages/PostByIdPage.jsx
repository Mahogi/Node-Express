import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost.jsx";

const PostByIdPage = () => {
  const {id} = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3600/getPostById/"+id)
      .then(res => res.json())
      .then( data => {
        console.log("-------")
        console.log(data)
        setPost(data.post)
      })
   // console.log(post)
    console.log("-------")
  }, [])

  return (
    <div>
      {id}
      {post && <SinglePost post={post}/>}
    </div>
  );
}

export default PostByIdPage;