import React, {useRef} from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({image}) => {

  const inpRef = useRef();

  return (
    <div className="d-flex space-btw">
      <div>
        <Link to="/login" className="m-3">Login</Link>
        <Link to="/register" className="m-3">Register</Link>
        <Link to="/" className="m-3">Home Page</Link>

      </div>

      <div>
        {image &&
          <>
          <div className="d-flex column">
            <img className="profileImage" src={image} alt=""/>
          </div>
          <Link to="/profile" className="m-3">My Profile</Link>
          </>
        }

      </div>

    </div>
  );
};

export default Toolbar;