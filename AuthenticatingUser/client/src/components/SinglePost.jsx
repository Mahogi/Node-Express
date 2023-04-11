import React from 'react';

const SinglePost = ({post}) => {
  return (
    <div className="post">
      <img src={post.image} alt=""/>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <div>{post.email}</div>
    </div>
  );
};

export default SinglePost;