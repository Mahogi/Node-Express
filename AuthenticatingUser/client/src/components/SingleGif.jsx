import React from 'react';
import {useNavigate} from "react-router-dom";

const SingleGif = ({item}) => {

  const nav = useNavigate()

  return (
    <div onClick={() => nav("/gif/"+item._id)} className="p-3">
      <img src={item.url} alt=""/>
    </div>
  );
};

export default SingleGif;