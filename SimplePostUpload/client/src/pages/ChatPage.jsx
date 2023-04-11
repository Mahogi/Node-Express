import React, {useRef, useState} from 'react';
import SingleMessage from "../components/SingleMessage";

const ChatPage = ({secret}) => {
  const inpRef = useRef()

  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    const message = {
      secret,
      message: inpRef.current.value
    }


    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(message)
    }

    fetch("http://localhost:3600/createMessage", options)
      .then(res => res.json())
      .then(data => {
        console.log('-------------');
        console.log(data);
        setMessages(data.messages);
        console.log(messages);
      })

  }

  return (
    <div>
      <div>
        <input ref={inpRef} type="text" placeholder="message value"/>
        <button onClick={sendMessage}>SEND</button>
      </div>

      <div>
        {messages.map((x, i) => <SingleMessage setMessages={setMessages} secret={secret} item={x} key={i}/>)}
      </div>

    </div>
  );
};

export default ChatPage;