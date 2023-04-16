import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const SinglePost = ({post}) => {
  const nav = useNavigate();

  return (
    <div className="card text-center width-350 margin-auto">
      <div className="" onClick={() => nav(`/post/${post._id}`)}>
        <h2>{post.title}</h2>
        <img src={post.image} alt="" />

        <p>{post.description}</p>
      </div>
      <Link to={'/posts/'+post.email}>{post.email}</Link>
    </div>

  );
};

export default SinglePost;