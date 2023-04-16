import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const SingleReply = ({reply}) => {

  const [user, setUser] = useState([]);

  useEffect( () => {
    //console.log(id);
    fetch("http://localhost:3800/getUserByEmail/"+reply.email)
      .then(res => res.json())
      .then(data => {

        //console.log(data);
        setUser(data.user);
      })
    //console.log("-------");
  }, []);

  //console.log("-------");

  return (
    <div className="d-flex reply-card space-btw">
      <img src={user.image} alt="" className="profileImage"/>
      <span>{reply.message}</span>
      <Link to={'/posts/'+reply.email}>{reply.email}</Link>
    </div>
  );
};

export default SingleReply;