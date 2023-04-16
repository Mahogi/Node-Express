import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";

const CreatePostPage = ({secret}) => {
  return (
    <div className="text-center">
      <h2>Create Post</h2>
      <CreatePostForm secret={secret}  />
    </div>
  );
};

export default CreatePostPage;