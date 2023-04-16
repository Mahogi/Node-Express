import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const SinglePost = ({post}) => {
  const nav = useNavigate();

  return (
    <div className="card" onClick={() => nav(`/post/${post._id}`)}>
      <h2>{post.title}</h2>
      <img src={post.image} alt="" />

      <p>{post.description}</p>
      <Link to={'/posts/'+post.email}>{post.email}</Link>
      {/*<hr/>*/}
      {/*REPLIES:*/}
      {/*{post.replies && post.replies.map((x, i) => <div>{x}</div> )}*/}
    </div>
  );
};

export default SinglePost;