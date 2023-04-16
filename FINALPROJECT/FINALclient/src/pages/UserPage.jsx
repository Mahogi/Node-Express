import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SingleUserCard from "../components/SingleUserCard.jsx";

const UserPage = () => {
  const {id} = useParams();
  const [user, setUser] = useState([]);

  useEffect( () => {
    console.log(id);
    fetch("http://localhost:3800/getUserById/"+id)
      .then(res => res.json())
      .then(data => {
        console.log("-------");
        console.log(data);
        setUser(data.user);
      })
    console.log("-------");
  }, []);


  return (
    <div>
      {id}
      {user && <SingleUserCard user={user}/>}
    </div>
  )
}

export default UserPage;