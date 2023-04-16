import React, {useRef} from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({image, logout}) => {

  const inpRef = useRef();

  return (
    <div className="d-flex space-btw">
      <div>
        <Link to="/login" className="m-3">Login</Link>
        <Link to="/register" className="m-3">Register</Link>
        <Link to="/" className="m-3">Home Page</Link>

      </div>
      <h1>What chocolate did you eat today?</h1>
      <div>
        {image &&
          <>
          <div className="d-flex">
            <img className="profileImage" src={image} alt=""/>
            <div className="d-flex column">
              <Link to="/profile" className="m-3">My Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>

          </div>

          </>
        }

      </div>

    </div>
  );
};

export default Toolbar;