import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const SingleGifPage = ({secret}) => {
  const gifRef = useRef()
  const {id} = useParams()
  const nav = useNavigate()

  const [gif, setGif] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3600/getSingle/" + id)
      .then(res => res.json())
      .then( data => {
        console.log(data)
        setGif(data.gif)
      })
  }, [])

  const updateGif = () => {
    const item = {
      id: gif._id,
      url: gifRef.current.value
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:3500/updategif", options)
      .then(res => res.json())
      .then( data => {
        nav("/")
      })
  }

  const removeGif = () => {
    fetch("http://localhost:3500/removegif/" + id)
      .then(res => res.json())
      .then( data => {
        nav("/")
      })
  }

  return (
    <div className="d-flex">
      <div className="grow1">
        {gif && <img src={gif.url} alt=""/>}
      </div>
      <div className="grow1">
        {secret && <div>
          <div>
            <input type="text" ref={gifRef} placeholder="new url"/>
            <button onClick={updateGif}>UPDATE</button>
          </div>

          <button onClick={removeGif}>DELETE</button>
        </div>}
      </div>
    </div>
  );
};

export default SingleGifPage;