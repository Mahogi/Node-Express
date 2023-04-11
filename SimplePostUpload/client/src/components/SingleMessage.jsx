import React, {useRef} from 'react';

const SingleMessage = ({item, secret, setMessages}) => {

  const inpRef = useRef()

  const makeLike = () => {
    const data = {
      secret,
      id: item._id
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3600/like", options)
      .then(res => res.json())
      .then(data => {
        if(!data.error) {
          setMessages(data.messages)
        }
        console.log(data)
      })
  }

  const sendReply = () => {
    const data = {
      reply: inpRef.current.value,
      secret,
      id: item._id
    }

    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3600/reply", options)
      .then(res => res.json())
      .then(data => {
        if(!data.error) {
          setMessages(data.messages)
        }
      })
  }

  return (
    <div className="msg">
      <h3>{item.username}</h3>
      <div>{item.message}</div>
      <p>Likes: {item.likes}</p>
      <button onClick={makeLike}>Like</button>
      <div>
        <input type="text" ref={inpRef} placeholder="reply text"/>
        <button onClick={sendReply}>SEND REPLY</button>
      </div>

      <div>
        {item.replies.map((x, i) => <div key={i}>
          <b>{x.email}</b>
          <div>{x.message}</div>
        </div>)}
      </div>
    </div>
  );
};

export default SingleMessage;