import React from 'react';
import {useNavigate} from "react-router-dom";

const SingleUserCard = ({user}) => {
  const nav = useNavigate();

  return (
    <div className="user_card d-flex" onClick={() => nav(`/user/${user._id}`)}>
      <img src={user.image} alt=""/>
      <h3>{user.email}</h3>
    </div>
  );
};

export default SingleUserCard;