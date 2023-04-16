import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SingleUserCard from "../components/SingleUserCard.jsx";
import SinglePost from "../components/SinglePost.jsx";

const UserPage = () => {
  const {id} = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    console.log(id);
    fetch("http://localhost:3800/getUserById/"+id)
      .then(res => res.json())
      .then(data => {

        //console.log(data);
        setUser(data.user);
      })
    //console.log("-------");
  }, []);
  console.log("---logging user----");
  console.log(user.email);

  // useEffect(() => {
  //   fetch("http://localhost:3800/getPostsByEmail/"+user.email)
  //     .then(res => res.json())
  //     .then( data => {
  //       console.log("---logging data----");
  //       console.log(data)
  //       setPosts(data.post)
  //     })
  //
  // }, [])

  useEffect(() => {
    if (user.email) {
      fetch("http://localhost:3800/getPostsByEmail/"+user.email)
        .then(res => res.json())
        .then(data => {
          console.log("---logging data----");
          console.log(data)
          setPosts(data.post)
        })
    }
  }, [user])


  return (
    <div>
      {user && <SingleUserCard user={user}/>}
      <div className="d-flex flex-wrap">
        {posts.map((x, i) => <SinglePost post={x} key={i}/>)}
      </div>
    </div>
  )
}

export default UserPage;