import React, {useEffect, useState} from 'react';
import SingleUserCard from "../components/SingleUserCard.jsx";
import SinglePost from "../components/SinglePost.jsx";
import {useNavigate, Link} from "react-router-dom";

const IndexPage = ({secret, email}) => {

  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3800/getAllPosts")
      .then(res => res.json())
      .then( data => {
        setPosts(data.posts);

      })
  }, []);


  useEffect(() => {
    fetch("http://localhost:3800/getAllUsers")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
      })
  }, []);



  return (
    <div>
        <div className="text-center margin-auto">
          {secret && <div className="welcome"> Welcome, {email} </div>}
          <div className="mv-1">
            {secret &&<Link to="/createPost" className="button">Create Review</Link>}
          </div>

        </div>

      <div className="d-flex">
        <div className="users-list">
          <span className="font-size">All registered users:</span>
          {users.map((x, i) => <SingleUserCard user={x} key={i}/>)}
        </div>
        <div>
          <span className="font-size">All chocolate reviews:</span>
          <div className="d-flex flex-wrap">
            {posts && posts.map((x, i) =>
              <SinglePost post={x} key={i}/>
            )}
          </div>

        </div>

      </div>


    </div>
  );
};

export default IndexPage;
