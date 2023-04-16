import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost.jsx";
import {useNavigate} from "react-router-dom";
import SingleReply from "../components/SingleReply.jsx";

const PostByIdPage = ({secret, email, setOpenDeleteSnackbar}) => {
  const {id} = useParams();
  const [post, setPost] = useState([]);
  const nav = useNavigate();
  const replyRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3800/getPostById/"+id)
      .then(res => res.json())
      .then( data => {
        setPost(data.post);
        //setMessages(post.replies);
      })
  }, [])


  const handleDelete = () => {
    fetch(`http://localhost:3800/deletePostById/${post._id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          // If the post is successfully deleted, you can redirect the user to a different page or perform any other action.
          console.log(data.message);
          setOpenDeleteSnackbar(true);
          nav("/");
        } else {
          console.log(data.message);
          setOpenDeleteSnackbar(false);
        }
      })
      .catch(error => console.log(error));
  }

  const sendReply = () => {
    const reply = {
      secret,
      id: post._id,
      reply: replyRef.current.value
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(reply)
    }

    console.log(reply);

    fetch("http://localhost:3800/reply", options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setPost(data.post);
        } else {
          alert(data.message);
        }
      })
  }

  return (
    <div className="margin-auto width-500 d-flex column text-center">
      {post && <SinglePost post={post}/>}
      {secret && email === post.email &&
        <button onClick={handleDelete} className="button">Delete my review</button>
      }
      <span className="font-size">Replies to your review:</span>
      <div>
        {post.replies && post.replies.map((x, i) => <SingleReply reply={x} key={i}/> )}
      </div>

      {secret && post &&
        <div>
          <p><label htmlFor="w3review">Reply to post:</label></p>
          <textarea ref={replyRef} rows="4" cols="50" placeholder="Enter your comment here"></textarea>
          <br/>
          <button onClick={sendReply}>SEND REPLY</button>
        </div>
      }

    </div>
  );
}

export default PostByIdPage;