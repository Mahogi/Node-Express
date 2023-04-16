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
    <div className="d-flex column width-500 margin-auto">
      <input type="text" ref={titleRef} placeholder="brand" className="line-height-30"/>
      <input type="text" ref={imageRef} placeholder="image" className="line-height-30"/>
      <input type="text" ref={descriptionRef} placeholder="description" className="line-height-30"/>

      <button onClick={createPost} className="button">CREATE POST</button>
    </div>
  );
};

export default CreatePostForm;