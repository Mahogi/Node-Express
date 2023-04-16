import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";

const CreatePostPage = ({secret}) => {
  return (
    <div>
      <h1>Create Post</h1>
      <CreatePostForm secret={secret}  />
    </div>
  );
};

export default CreatePostPage;