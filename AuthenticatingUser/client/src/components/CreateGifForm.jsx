import {useRef} from 'react';

const CreateGifForm = ({set}) => {
  const gifRef = useRef()

  const createGif = () => {
    const item = {
      url: gifRef.current.value
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:3600/creategif", options)
      .then(res => res.json())
      .then( data => {
        console.log(data)
        set(data.gifs)
      })
  }

  return (
    <div>
      <input ref={gifRef} type="text" placeholder="gif url"/>
      <button onClick={createGif}>Create Gif</button>
    </div>
  );
};

export default CreateGifForm;