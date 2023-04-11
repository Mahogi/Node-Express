import React, {useRef} from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({image, updatePhoto}) => {
  const inpRef = useRef();

  return (
    <div className="d-flex space-btw">
      <div>
        <Link to="/login" className="m-3">Login</Link>
        <Link to="/register" className="m-3">Register</Link>
        <Link to="/" className="m-3">Gifs Gallery</Link>

      </div>

      {image &&
        <div className="d-flex column">
          <img className="profileImage" src={image} alt=""/>
          <input ref={inpRef} type="text" placeholder="url"/>
          <button onClick={() => updatePhoto(inpRef.current.value)}>Update photo</button>
        </div>
      }
    </div>
  );
};

export default Toolbar;