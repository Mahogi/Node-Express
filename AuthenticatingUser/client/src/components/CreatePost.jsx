import {useRef} from 'react';

const CreatePost = ({create}) => {
  const imageRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()

  const createPost = () => {
    const post = {
      image: imageRef.current.value,
      title: titleRef.current.value,
      description: descRef.current.value
    }
    create(post)
  }

  return (
    <div className="mt-5">
      <input type="text" ref={imageRef} placeholder="image"/>
      <input type="text" ref={titleRef} placeholder="title"/>
      <input type="text" ref={descRef} placeholder="description"/>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePost;