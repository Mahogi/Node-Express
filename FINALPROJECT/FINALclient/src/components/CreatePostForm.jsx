import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const CreatePostForm = ({secret}) => {

  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  const nav = useNavigate();

  const createPost = () => {
    const post = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      secret
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(post)
    }

    fetch("http://localhost:3800/createPost", options)
      .then(res => res.json())
      .then( data => {
        console.log(data)

        if(data.success) {
          nav("/post/"+data.id);
        } else {
          alert("ERROR: " + data.message);
        }
      })
  }

  return (
    <div>
      <input type="text" ref={titleRef} placeholder="title"/>
      <input type="text" ref={imageRef} placeholder="image"/>
      <input type="text" ref={descriptionRef} placeholder="description"/>


      <button onClick={createPost}>CREATE POST</button>
    </div>
  );
};

export default CreatePostForm;